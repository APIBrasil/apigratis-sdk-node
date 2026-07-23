/**
 * Testes de contrato contra o gateway real.
 *
 * Desativados por padrão — rode com:
 *   npm run test:contract
 *
 * Variáveis opcionais:
 *   APIBRASIL_BASE_URL      — outra base (ex: homolog)
 *   APIBRASIL_BEARER_TOKEN  — habilita os testes autenticados
 *
 * Somente endpoints públicos/gratuitos são chamados — nenhuma consulta
 * que debita créditos.
 */
import { ApiBrasil } from '../../src/ApiBrasil';

const enabled = process.env.APIBRASIL_CONTRACT === '1';
const bearer = process.env.APIBRASIL_BEARER_TOKEN;

const describeContract = enabled ? describe : describe.skip;

describeContract('contrato: gateway APIBrasil', () => {
	jest.setTimeout(60000);

	const api = new ApiBrasil({ retry: false });

	it('GET /documentations responde com o catálogo', async () => {
		const resp = await api.catalog.documentations();
		const docs = resp.documentations ?? resp;
		expect(Array.isArray(docs)).toBe(true);
		expect(docs.length).toBeGreaterThan(0);
		expect(docs[0]).toHaveProperty('endpoints');
	});

	it('GET /apis responde com a lista de APIs', async () => {
		const resp = await api.catalog.apis();
		expect(resp).toHaveProperty('apis');
		expect(Array.isArray(resp.apis)).toBe(true);
	});

	it('GET /plans responde', async () => {
		const resp = await api.catalog.plans();
		expect(resp).toBeDefined();
	});

	(bearer ? it : it.skip)(
		'GET /profile/me autentica com o Bearer Token',
		async () => {
			const authed = new ApiBrasil({ bearerToken: bearer, retry: false });
			const resp = await authed.auth.me();
			expect(resp).toBeDefined();
		}
	);

	(bearer ? it : it.skip)('GET /balance retorna o saldo', async () => {
		const authed = new ApiBrasil({ bearerToken: bearer, retry: false });
		const resp = await authed.account.balance();
		expect(resp).toBeDefined();
	});
});
