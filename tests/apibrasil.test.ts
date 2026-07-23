import { ApiBrasil } from '../src/ApiBrasil';
import { ApiBrasilError } from '../src/core/errors';
import { BASE, buildApi } from './helpers/buildApi';
import { FakeTransport, ok } from './helpers/fakeTransport';

describe('ApiBrasil — cliente', () => {
	it('expõe todos os módulos da plataforma', () => {
		const { api } = buildApi();
		const modules = [
			'auth',
			'devices',
			'whatsapp',
			'evolution',
			'whatsmeow',
			'sms',
			'dados',
			'vehicles',
			'fipe',
			'correios',
			'cep',
			'geolocation',
			'geomatrix',
			'recognize',
			'ddd',
			'holidays',
			'translate',
			'weather',
			'loterias',
			'databaseIp',
			'consulta',
			'ura',
			'chipVirtual',
			'bulk',
			'catalog',
			'account',
			'payments',
			'ipWhitelist',
			'bearerRateLimit',
			'reports',
		] as const;

		for (const name of modules) {
			expect(api[name]).toBeDefined();
		}
	});

	it('request genérico repassa método, path, body e query', async () => {
		const { transport, api } = buildApi();
		await api.request('PATCH', '/notifications/9/read');
		expect(transport.last.method).toBe('PATCH');
		expect(transport.last.url).toBe(`${BASE}/notifications/9/read`);

		await api.request('GET', '/reports/quick-stats', undefined, {
			query: { period: '7d' },
		});
		expect(transport.last.url).toBe(`${BASE}/reports/quick-stats?period=7d`);
	});

	it('setBearerToken e setDeviceToken são encadeáveis e afetam chamadas futuras', async () => {
		const { transport, api } = buildApi();
		api.setBearerToken('jwt-2').setDeviceToken('dev-2');
		await api.whatsapp.qrcode();

		expect(transport.last.headers.Authorization).toBe('Bearer jwt-2');
		expect(transport.last.headers.DeviceToken).toBe('dev-2');
	});

	it('withDevice cria cliente com outro DeviceToken e mesmo transporte', async () => {
		const { transport, api } = buildApi();
		const outro = api.withDevice('outro-device');
		await outro.whatsapp.qrcode();

		expect(transport.last.headers.DeviceToken).toBe('outro-device');
		expect(transport.last.headers.Authorization).toBe('Bearer jwt');
	});
});

describe('ApiBrasil — fluxo de autenticação', () => {
	it('login guarda o Bearer Token retornado', async () => {
		const transport = new FakeTransport().respondWith(
			ok({ authorization: { token: 'jwt-novo' }, user: { id: 1 } })
		);
		const api = new ApiBrasil({ transport, retry: false, baseURL: BASE });
		await api.auth.login({ email: 'a@b.c', password: 'x' });

		await api.account.balance();
		expect(transport.last.headers.Authorization).toBe('Bearer jwt-novo');
	});

	it('login com 2FA não guarda token e retorna challenge', async () => {
		const transport = new FakeTransport().respondWith(
			ok({ requires_2fa: true, challenge: 'ch-123', available_methods: ['email'] })
		);
		const api = new ApiBrasil({ transport, retry: false, baseURL: BASE });
		const session = await api.auth.login({ email: 'a@b.c', password: 'x' });

		expect(session.requires_2fa).toBe(true);
		expect(session.challenge).toBe('ch-123');
		await api.account.balance();
		expect(transport.last.headers.Authorization).toBeUndefined();
	});

	it('verify2fa guarda o token após o desafio', async () => {
		const transport = new FakeTransport().respondWith(
			ok({ authorization: { token: 'jwt-2fa' } })
		);
		const api = new ApiBrasil({ transport, retry: false, baseURL: BASE });
		await api.auth.verify2fa({ challenge: 'ch-123', code: '000000' });

		await api.account.balance();
		expect(transport.last.headers.Authorization).toBe('Bearer jwt-2fa');
	});

	it('ApiBrasil.login retorna cliente autenticado', async () => {
		const transport = new FakeTransport().respondWith(
			ok({ authorization: { token: 'jwt-static' } })
		);
		const { client, session } = await ApiBrasil.login(
			{ email: 'a@b.c', password: 'x' },
			{ transport, retry: false, baseURL: BASE }
		);

		expect(session.authorization?.token).toBe('jwt-static');
		await client.account.balance();
		expect(transport.last.headers.Authorization).toBe('Bearer jwt-static');
	});

	it('ApiBrasil.login lança ApiBrasilError quando a conta exige 2FA', async () => {
		const transport = new FakeTransport().respondWith(
			ok({ requires_2fa: true, challenge: 'ch-1' })
		);

		await expect(
			ApiBrasil.login(
				{ email: 'a@b.c', password: 'x' },
				{ transport, retry: false, baseURL: BASE }
			)
		).rejects.toBeInstanceOf(ApiBrasilError);
	});
});
