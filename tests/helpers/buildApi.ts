import { ApiBrasil } from '../../src/ApiBrasil';
import { ApiBrasilConfig } from '../../src/core/types';
import { FakeTransport } from './fakeTransport';

export const BASE = 'https://gateway.apibrasil.io/api/v2';

/**
 * Cria um cliente ApiBrasil com transporte fake, retry desligado e
 * credenciais fixas — base de todos os testes de rota.
 */
export const buildApi = (config: Partial<ApiBrasilConfig> = {}) => {
	const transport = new FakeTransport();
	const api = new ApiBrasil({
		transport,
		retry: false,
		baseURL: BASE,
		bearerToken: 'jwt',
		deviceToken: 'dev',
		...config,
	});
	return { transport, api };
};

/** Caso de teste de rota: uma chamada da SDK e a requisição esperada. */
export type RouteCase = {
	name: string;
	call: (api: ApiBrasil) => Promise<any>;
	method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	path: string;
	body?: any;
};

/** Executa uma tabela de casos de rota dentro de um describe. */
export const runRouteCases = (cases: RouteCase[]) => {
	it.each(cases)('$name', async ({ call, method, path, body }) => {
		const { transport, api } = buildApi();
		await call(api);

		expect(transport.last.method).toBe(method ?? 'POST');
		expect(transport.last.url).toBe(`${BASE}${path}`);
		if (body !== undefined) {
			expect(transport.lastBody).toEqual(body);
		}
	});
};
