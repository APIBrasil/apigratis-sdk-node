import { DEFAULT_BASE_URL, HttpClient, SDK_USER_AGENT } from '../src/core/http';
import {
	AuthenticationError,
	InsufficientBalanceError,
	NotFoundError,
	ValidationError,
} from '../src/core/errors';
import { FakeTransport, httpError } from './helpers/fakeTransport';

const client = (transport: FakeTransport, config = {}) =>
	new HttpClient({ transport, retry: false, ...config });

describe('HttpClient', () => {
	it('monta a URL com a base padrão e envia os headers da plataforma', async () => {
		const transport = new FakeTransport();
		await client(transport).post('/whatsapp/sendText', { number: '55' });

		expect(transport.last.url).toBe(`${DEFAULT_BASE_URL}/whatsapp/sendText`);
		expect(transport.last.method).toBe('POST');
		expect(transport.last.headers['Content-Type']).toBe('application/json');
		expect(transport.last.headers.Accept).toBe('application/json');
		expect(transport.last.headers['User-Agent']).toBe(SDK_USER_AGENT);
		expect(transport.lastBody).toEqual({ number: '55' });
	});

	it('respeita baseURL customizada e monta query string', async () => {
		const transport = new FakeTransport();
		const http = client(transport, {
			baseURL: 'https://homolog.example.com/api/v2/',
		});
		await http.get('/apis', {
			query: { search: 'whatsapp', page: 2, skip: undefined },
		});

		expect(transport.last.url).toBe(
			'https://homolog.example.com/api/v2/apis?search=whatsapp&page=2'
		);
	});

	it('injeta Authorization, DeviceToken e SecretKey quando configurados', async () => {
		const transport = new FakeTransport();
		const http = client(transport, {
			bearerToken: 'jwt-123',
			deviceToken: 'dev-456',
		});
		await http.post('/devices/store', {}, { secretKey: 'sk-789' });

		expect(transport.last.headers.Authorization).toBe('Bearer jwt-123');
		expect(transport.last.headers.DeviceToken).toBe('dev-456');
		expect(transport.last.headers.SecretKey).toBe('sk-789');
	});

	it('não injeta headers de auth quando não configurados', async () => {
		const transport = new FakeTransport();
		await client(transport).get('/apis');

		expect(transport.last.headers.Authorization).toBeUndefined();
		expect(transport.last.headers.DeviceToken).toBeUndefined();
		expect(transport.last.headers.SecretKey).toBeUndefined();
	});

	it('permite sobrescrever tokens por requisição', async () => {
		const transport = new FakeTransport();
		const http = client(transport, {
			bearerToken: 'global',
			deviceToken: 'global-dev',
		});
		await http.post(
			'/sms/send',
			{},
			{ bearerToken: 'local', deviceToken: 'local-dev' }
		);

		expect(transport.last.headers.Authorization).toBe('Bearer local');
		expect(transport.last.headers.DeviceToken).toBe('local-dev');
	});

	it('GET não envia body', async () => {
		const transport = new FakeTransport();
		await client(transport).get('/balance');
		expect(transport.last.body).toBeUndefined();
	});

	it('setBearerToken/setDeviceToken atualizam requisições futuras', async () => {
		const transport = new FakeTransport();
		const http = client(transport);
		http.setBearerToken('novo-jwt');
		http.setDeviceToken('novo-dev');
		await http.get('/profile/me');

		expect(transport.last.headers.Authorization).toBe('Bearer novo-jwt');
		expect(transport.last.headers.DeviceToken).toBe('novo-dev');
	});

	it('mapeia erros para as subclasses corretas', async () => {
		const transport = new FakeTransport().respondWith(
			httpError(402, {
				error: true,
				message: 'Saldo insuficiente',
				code: 'NO_BALANCE',
			}),
			httpError(401, { message: 'Token inválido' }),
			httpError(422, { message: 'Placa inválida' }),
			httpError(404, { message: 'Sem dados' })
		);
		const http = client(transport, { bearerToken: 'jwt' });

		const balanceError = await http.post('/consulta/cpf/credits', {}).catch(e => e);
		expect(balanceError).toBeInstanceOf(InsufficientBalanceError);
		expect(balanceError.message).toBe('Saldo insuficiente');
		expect(balanceError.status).toBe(402);
		expect(balanceError.code).toBe('NO_BALANCE');
		expect(balanceError.isInsufficientBalance).toBe(true);

		await expect(http.get('/profile/me')).rejects.toBeInstanceOf(
			AuthenticationError
		);
		await expect(http.post('/x', {})).rejects.toBeInstanceOf(ValidationError);
		await expect(http.post('/y', {})).rejects.toBeInstanceOf(NotFoundError);
	});

	it('lê credenciais das variáveis de ambiente quando não configuradas', async () => {
		process.env.APIBRASIL_BEARER_TOKEN = 'env-jwt';
		process.env.APIBRASIL_DEVICE_TOKEN = 'env-dev';
		process.env.APIBRASIL_BASE_URL = 'https://env.example.com/api/v2';
		try {
			const transport = new FakeTransport();
			await client(transport).post('/sms/send', {});

			expect(transport.last.url).toBe('https://env.example.com/api/v2/sms/send');
			expect(transport.last.headers.Authorization).toBe('Bearer env-jwt');
			expect(transport.last.headers.DeviceToken).toBe('env-dev');
		} finally {
			delete process.env.APIBRASIL_BEARER_TOKEN;
			delete process.env.APIBRASIL_DEVICE_TOKEN;
			delete process.env.APIBRASIL_BASE_URL;
		}
	});

	it('configuração explícita tem prioridade sobre o ambiente', async () => {
		process.env.APIBRASIL_BEARER_TOKEN = 'env-jwt';
		try {
			const transport = new FakeTransport();
			await client(transport, { bearerToken: 'explicito' }).get('/balance');
			expect(transport.last.headers.Authorization).toBe('Bearer explicito');
		} finally {
			delete process.env.APIBRASIL_BEARER_TOKEN;
		}
	});
});
