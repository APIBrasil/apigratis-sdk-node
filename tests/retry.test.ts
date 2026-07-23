import { HttpClient } from '../src/core/http';
import {
	NetworkError,
	RateLimitError,
	TimeoutError,
	ValidationError,
} from '../src/core/errors';
import { HookRetryInfo } from '../src/core/types';
import { FakeTransport, httpError, ok } from './helpers/fakeTransport';

const fastRetry = { retries: 2, minDelayMs: 1, maxDelayMs: 5 };

describe('retry e hooks', () => {
	it('tenta novamente em 429 e retorna a resposta seguinte', async () => {
		const transport = new FakeTransport().respondWith(
			httpError(429, { message: 'Rate limit' }),
			ok({ done: true })
		);
		const http = new HttpClient({ transport, retry: fastRetry });

		const result = await http.post('/whatsapp/sendText', {});
		expect(result).toEqual({ done: true });
		expect(transport.calls).toHaveLength(2);
	});

	it('respeita o header Retry-After', async () => {
		const transport = new FakeTransport().respondWith(
			httpError(429, { message: 'Rate limit' }, { 'retry-after': '0' }),
			ok()
		);
		const http = new HttpClient({ transport, retry: fastRetry });

		await http.post('/x', {});
		expect(transport.calls).toHaveLength(2);
	});

	it('esgota as tentativas e lança RateLimitError', async () => {
		const transport = new FakeTransport().setFallback(
			httpError(429, { message: 'Rate limit' })
		);
		const http = new HttpClient({ transport, retry: fastRetry });

		await expect(http.post('/x', {})).rejects.toBeInstanceOf(RateLimitError);
		expect(transport.calls).toHaveLength(3); // original + 2 retries
	});

	it('não tenta novamente em erros de negócio (4xx)', async () => {
		const transport = new FakeTransport().setFallback(
			httpError(422, { message: 'Inválido' })
		);
		const http = new HttpClient({ transport, retry: fastRetry });

		await expect(http.post('/x', {})).rejects.toBeInstanceOf(ValidationError);
		expect(transport.calls).toHaveLength(1);
	});

	it('tenta novamente em falhas de rede, mas não em timeout', async () => {
		const network = new FakeTransport().respondWith(
			new NetworkError('conexão recusada'),
			ok()
		);
		const httpNetwork = new HttpClient({ transport: network, retry: fastRetry });
		await expect(httpNetwork.post('/x', {})).resolves.toEqual({ ok: true });
		expect(network.calls).toHaveLength(2);

		const timeout = new FakeTransport().respondWith(
			new TimeoutError('estourou'),
			ok()
		);
		const httpTimeout = new HttpClient({ transport: timeout, retry: fastRetry });
		await expect(httpTimeout.post('/x', {})).rejects.toBeInstanceOf(TimeoutError);
		expect(timeout.calls).toHaveLength(1);
	});

	it('retry: false desativa completamente', async () => {
		const transport = new FakeTransport().setFallback(
			httpError(429, { message: 'Rate limit' })
		);
		const http = new HttpClient({ transport, retry: false });

		await expect(http.post('/x', {})).rejects.toBeInstanceOf(RateLimitError);
		expect(transport.calls).toHaveLength(1);
	});

	it('dispara hooks onRequest, onResponse e onRetry', async () => {
		const transport = new FakeTransport().respondWith(
			httpError(429, { message: 'Rate limit' }),
			ok()
		);
		const onRequest = jest.fn();
		const onResponse = jest.fn();
		const retries: HookRetryInfo[] = [];

		const http = new HttpClient({
			transport,
			retry: fastRetry,
			hooks: { onRequest, onResponse, onRetry: info => void retries.push(info) },
		});
		await http.post('/whatsapp/sendText', { number: '55' });

		expect(onRequest).toHaveBeenCalledTimes(2);
		expect(onRequest.mock.calls[0][0]).toMatchObject({ method: 'POST', attempt: 0 });
		expect(onResponse).toHaveBeenCalledTimes(2);
		expect(onResponse.mock.calls[0][0]).toMatchObject({ status: 429, attempt: 0 });
		expect(onResponse.mock.calls[1][0]).toMatchObject({ status: 200, attempt: 1 });
		expect(retries).toHaveLength(1);
		expect(retries[0]).toMatchObject({ attempt: 1, reason: 'HTTP 429' });
	});
});
