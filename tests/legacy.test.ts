import {
	createCepApi,
	createCnpjApi,
	createCorreiosApi,
	createCpfApi,
	createVehiclesApi,
	createWhatsAppApi,
	LEGACY_BASE_URL,
} from '../src';

const credentials = {
	BearerToken: 'jwt',
	DeviceToken: 'dev',
	SecretKey: 'sk',
	PublicToken: 'pk',
};

const jsonResponse = (status: number, body: any) =>
	new Response(JSON.stringify(body), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});

describe('interface legada (v0.1.x) — todos os factories', () => {
	let fetchSpy: jest.SpyInstance;

	beforeEach(() => {
		fetchSpy = jest
			.spyOn(globalThis, 'fetch')
			.mockResolvedValue(jsonResponse(200, { ok: true }) as any);
	});

	afterEach(() => {
		fetchSpy.mockRestore();
	});

	it.each([
		['createWhatsAppApi', createWhatsAppApi, 'whatsapp'],
		['createVehiclesApi', createVehiclesApi, 'vehicles'],
		['createCorreiosApi', createCorreiosApi, 'correios'],
		['createCpfApi', createCpfApi, 'dados/cpf'],
		['createCnpjApi', createCnpjApi, 'dados/cnpj'],
		['createCepApi', createCepApi, 'cep'],
	] as const)('%s aponta para %s', async (_name, factory, base) => {
		const api = factory(credentials);
		const resp = await api.request('/acao', { chave: 'valor' });

		expect(resp).toEqual({ ok: true });
		const [url, init] = fetchSpy.mock.calls[0];
		expect(url).toBe(`${LEGACY_BASE_URL}/${base}/acao`);
		expect(init.method).toBe('POST');
		expect(JSON.parse(init.body)).toEqual({ chave: 'valor' });
	});

	it('envia todos os headers antigos (Bearer, DeviceToken, SecretKey, PublicToken)', async () => {
		await createCpfApi(credentials).request('/', { cpf: '000' });

		const [url, init] = fetchSpy.mock.calls[0];
		expect(url).toBe(`${LEGACY_BASE_URL}/dados/cpf`);
		expect(init.headers.Authorization).toBe('Bearer jwt');
		expect(init.headers.DeviceToken).toBe('dev');
		expect(init.headers.SecretKey).toBe('sk');
		expect(init.headers.PublicToken).toBe('pk');
	});

	it('erros continuam retornando { status: "error" } em vez de lançar', async () => {
		fetchSpy.mockResolvedValue(
			jsonResponse(400, { error: 'Requisição inválida' }) as any
		);

		const resp = await createCpfApi(credentials).request('/', { cpf: '000' });
		expect(resp).toEqual({ status: 'error', error: 'Requisição inválida' });
	});

	it('falha de rede também vira { status: "error" }', async () => {
		fetchSpy.mockRejectedValue(new TypeError('fetch failed'));

		const resp = await createCpfApi(credentials).request('/', { cpf: '000' });
		expect(resp).toMatchObject({ status: 'error' });
	});
});
