import { NetworkError, TimeoutError } from '../src/core/errors';
import { FetchTransport } from '../src/core/transport';
import { HttpClient } from '../src/core/http';

const baseRequest = {
	method: 'POST' as const,
	url: 'https://example.com/api/v2/x',
	headers: { 'Content-Type': 'application/json' },
};

describe('FetchTransport', () => {
	it('faz o parse de respostas JSON e repassa status/headers', async () => {
		const fetchFn = jest.fn().mockResolvedValue(
			new Response(JSON.stringify({ ok: true }), {
				status: 201,
				headers: { 'Content-Type': 'application/json', 'X-Custom': 'v' },
			})
		);
		const transport = new FetchTransport(fetchFn as any);

		const resp = await transport.request({ ...baseRequest, body: '{"a":1}' });

		expect(resp.status).toBe(201);
		expect(resp.data).toEqual({ ok: true });
		expect(resp.headers['x-custom']).toBe('v');
		expect(fetchFn).toHaveBeenCalledWith(
			baseRequest.url,
			expect.objectContaining({ method: 'POST', body: '{"a":1}' })
		);
	});

	it('retorna texto puro quando o corpo não é JSON', async () => {
		const fetchFn = jest.fn().mockResolvedValue(new Response('<html>oops</html>'));
		const transport = new FetchTransport(fetchFn as any);

		const resp = await transport.request(baseRequest);
		expect(resp.data).toBe('<html>oops</html>');
	});

	it('retorna undefined para corpo vazio', async () => {
		const fetchFn = jest.fn().mockResolvedValue(new Response(null, { status: 204 }));
		const transport = new FetchTransport(fetchFn as any);

		const resp = await transport.request(baseRequest);
		expect(resp.status).toBe(204);
		expect(resp.data).toBeUndefined();
	});

	it('responseType arraybuffer devolve ArrayBuffer', async () => {
		const fetchFn = jest.fn().mockResolvedValue(new Response('binário'));
		const transport = new FetchTransport(fetchFn as any);

		const resp = await transport.request({
			...baseRequest,
			responseType: 'arraybuffer',
		});
		expect(resp.data).toBeInstanceOf(ArrayBuffer);
	});

	it('responseType stream devolve o body da resposta', async () => {
		const fetchFn = jest.fn().mockResolvedValue(new Response('fluxo'));
		const transport = new FetchTransport(fetchFn as any);

		const resp = await transport.request({ ...baseRequest, responseType: 'stream' });
		expect(resp.data).not.toBeNull();
		expect(typeof resp.data.getReader).toBe('function');
	});

	it('lança NetworkError quando o fetch falha', async () => {
		const fetchFn = jest.fn().mockRejectedValue(new TypeError('fetch failed'));
		const transport = new FetchTransport(fetchFn as any);

		await expect(transport.request(baseRequest)).rejects.toBeInstanceOf(
			NetworkError
		);
	});

	it('lança TimeoutError quando o timeout aborta a requisição', async () => {
		const fetchFn = jest.fn(
			(_url: string, init: RequestInit) =>
				new Promise((_resolve, reject) => {
					init.signal?.addEventListener('abort', () =>
						reject(new Error('The operation was aborted'))
					);
				})
		);
		const transport = new FetchTransport(fetchFn as any);

		await expect(
			transport.request({ ...baseRequest, timeoutMs: 5 })
		).rejects.toBeInstanceOf(TimeoutError);
	});
});

describe('HttpClient — getters de configuração', () => {
	it('expõe baseURL, tokens e secretKey configurados', () => {
		const http = new HttpClient({
			baseURL: 'https://example.com/api/v2',
			bearerToken: 'jwt',
			deviceToken: 'dev',
			secretKey: 'sk',
			retry: false,
		});

		expect(http.baseURL).toBe('https://example.com/api/v2');
		expect(http.bearerToken).toBe('jwt');
		expect(http.deviceToken).toBe('dev');
		expect(http.secretKey).toBe('sk');
		expect(http.getConfig()).toMatchObject({ bearerToken: 'jwt', secretKey: 'sk' });
	});
});
