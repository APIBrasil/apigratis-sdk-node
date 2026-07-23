import { ApiBrasil } from '../src/ApiBrasil';
import { DeviceProxyService } from '../src/services/deviceProxy';
import { CONSULTA_TIPOS, SERVICE_ACTIONS } from '../src/generated/catalog';
import { BASE, buildApi, runRouteCases } from './helpers/buildApi';

describe('Dados cadastrais — todos os métodos', () => {
	runRouteCases([
		{
			name: 'cnpj → POST /dados/cnpj',
			call: api => api.dados.cnpj({ cnpj: '00000000000000' }),
			path: '/dados/cnpj',
			body: { cnpj: '00000000000000' },
		},
		{
			name: 'cpf → POST /dados/cpf',
			call: api => api.dados.cpf({ cpf: '00000000000' }),
			path: '/dados/cpf',
			body: { cpf: '00000000000' },
		},
		{
			name: 'request genérico → POST /dados/{action}',
			call: api => api.dados.request('telefone', { telefone: '11999999999' }),
			path: '/dados/telefone',
		},
	]);
});

describe('Veículos — todos os métodos', () => {
	runRouteCases([
		{
			name: 'dados → POST /vehicles/dados',
			call: api => api.vehicles.dados({ placa: 'ABC1234' }),
			path: '/vehicles/dados',
			body: { placa: 'ABC1234' },
		},
		{
			name: 'fipe → POST /vehicles/fipe',
			call: api => api.vehicles.fipe({ placa: 'ABC1234' }),
			path: '/vehicles/fipe',
			body: { placa: 'ABC1234' },
		},
		{
			name: 'consultaFipe → POST /vehicles/consultafipe/{placa}',
			call: api => api.vehicles.consultaFipe('ABC1234'),
			path: '/vehicles/consultafipe/ABC1234',
		},
		{
			name: 'request genérico → POST /vehicles/{action}',
			call: api => api.vehicles.request('leilao', { placa: 'ABC1234' }),
			path: '/vehicles/leilao',
		},
	]);
});

describe('FIPE, Correios, CEP e GeoIP', () => {
	runRouteCases([
		{
			name: 'fipe.request → POST /fipe/{action}',
			call: api => api.fipe.request('ConsultarMarcas', { tipo: 'carros' }),
			path: '/fipe/ConsultarMarcas',
			body: { tipo: 'carros' },
		},
		{
			name: 'correios.rastreio → POST /correios/rastreio',
			call: api => api.correios.rastreio({ codigo: 'BR123456789BR' }),
			path: '/correios/rastreio',
			body: { codigo: 'BR123456789BR' },
		},
		{
			name: 'correios.request → POST /correios/{action}',
			call: api => api.correios.request('frete', { cepOrigem: '01001000' }),
			path: '/correios/frete',
		},
		{
			name: 'cep.cep → POST /cep/cep',
			call: api => api.cep.cep({ cep: '01001000' }),
			path: '/cep/cep',
			body: { cep: '01001000' },
		},
		{
			name: 'cep.request → POST /cep/{action}',
			call: api => api.cep.request('geolocation', { cep: '01001000' }),
			path: '/cep/geolocation',
		},
		{
			name: 'databaseIp.ip → POST /database/ip',
			call: api => api.databaseIp.ip({ ip: '8.8.8.8' }),
			path: '/database/ip',
			body: { ip: '8.8.8.8' },
		},
	]);
});

describe('Consultas por crédito — todos os métodos', () => {
	runRouteCases([
		{
			name: 'generic → POST /consulta/{service}/credits',
			call: api => api.consulta.generic('serasa-score', { cpf: '000' }),
			path: '/consulta/serasa-score/credits',
			body: { cpf: '000' },
		},
		{
			name: 'cpf → POST /consulta/cpf/credits',
			call: api => api.consulta.cpf({ cpf: '00000000000', homolog: true }),
			path: '/consulta/cpf/credits',
			body: { cpf: '00000000000', homolog: true },
		},
		{
			name: 'cnpj → POST /consulta/cnpj/credits',
			call: api =>
				api.consulta.cnpj({ cnpj: '00000000000000', tipo: 'lista-socios' }),
			path: '/consulta/cnpj/credits',
			body: { cnpj: '00000000000000', tipo: 'lista-socios' },
		},
		{
			name: 'cnh → POST /consulta/cnh/credits',
			call: api => api.consulta.cnh({ cpf: '00000000000' }),
			path: '/consulta/cnh/credits',
		},
		{
			name: 'cep → POST /consulta/cep/credits',
			call: api => api.consulta.cep({ cep: '01001000' }),
			path: '/consulta/cep/credits',
		},
		{
			name: 'veiculos → POST /consulta/veiculos/credits',
			call: api => api.consulta.veiculos({ placa: 'ABC1234' }),
			path: '/consulta/veiculos/credits',
			body: { placa: 'ABC1234' },
		},
		{
			name: 'telefone → POST /consulta/telefone/credits',
			call: api => api.consulta.telefone({ telefone: '11999999999' }),
			path: '/consulta/telefone/credits',
		},
		{
			name: 'veiculosBase dados → POST /vehicles/base/000/dados',
			call: api => api.consulta.veiculosBase('dados', { placa: 'ABC1234' }),
			path: '/vehicles/base/000/dados',
		},
		{
			name: 'veiculosBase fipe → POST /vehicles/base/000/fipe',
			call: api => api.consulta.veiculosBase('fipe', { placa: 'ABC1234' }),
			path: '/vehicles/base/000/fipe',
		},
		{
			name: 'cepDistancia → POST /cep/distancia/calcular',
			call: api => api.consulta.cepDistancia({ cep_origem: '01001000' }),
			path: '/cep/distancia/calcular',
		},
		{
			name: 'proxySeller → POST /proxy/seller/credits',
			call: api => api.consulta.proxySeller({}),
			path: '/proxy/seller/credits',
		},
	]);
});

describe('URA, Chip Virtual e Bulk — todos os métodos', () => {
	runRouteCases([
		{
			name: 'ura.dialler → POST /ura/call/dialler',
			call: api => api.ura.dialler({ number: '11999999999' }),
			path: '/ura/call/dialler',
		},
		{
			name: 'ura.status → POST /ura/call/status',
			call: api => api.ura.status({ id: 'call-1' }),
			path: '/ura/call/status',
		},
		{
			name: 'chipVirtual.operators → POST /chip/virtual/operators',
			call: api => api.chipVirtual.operators(),
			path: '/chip/virtual/operators',
		},
		{
			name: 'chipVirtual.buy → POST /chip/virtual/buy',
			call: api => api.chipVirtual.buy({ operator: 'claro' }),
			path: '/chip/virtual/buy',
		},
		{
			name: 'chipVirtual.activation → POST /chip/virtual/activation',
			call: api => api.chipVirtual.activation({ id: 1 }),
			path: '/chip/virtual/activation',
		},
		{
			name: 'chipVirtual.services → POST /chip/virtual/services',
			call: api => api.chipVirtual.services(),
			path: '/chip/virtual/services',
		},
		{
			name: 'bulk.direct → POST /bulk/direct/{action}',
			call: api => api.bulk.direct('sms', { items: [] }),
			path: '/bulk/direct/sms',
			body: { items: [] },
		},
		{
			name: 'bulk.queue → POST /bulk/queue/{action}',
			call: api => api.bulk.queue('whatsapp', { items: [] }),
			path: '/bulk/queue/whatsapp',
		},
	]);
});

describe('proxies genéricos device-based', () => {
	runRouteCases([
		{
			name: 'geolocation → POST /geolocation/{action}',
			call: api => api.geolocation.request('geocode', { address: 'Av. Paulista' }),
			path: '/geolocation/geocode',
		},
		{
			name: 'geomatrix → POST /geomatrix/{action}',
			call: api => api.geomatrix.request('distance', {}),
			path: '/geomatrix/distance',
		},
		{
			name: 'recognize → POST /recognize/{action}',
			call: api => api.recognize.request('identify', { base64: 'x' }),
			path: '/recognize/identify',
		},
		{
			name: 'ddd → POST /ddd/{action}',
			call: api => api.ddd.request('cidades', { ddd: '11' }),
			path: '/ddd/cidades',
		},
		{
			name: 'holidays → POST /holidays/{action}',
			call: api => api.holidays.request('feriados', { ano: '2026' }),
			path: '/holidays/feriados',
		},
		{
			name: 'translate → POST /translate/{action}',
			call: api => api.translate.request('translate', { text: 'hello' }),
			path: '/translate/translate',
		},
		{
			name: 'weather → POST /weather/{action}',
			call: api => api.weather.request('previsao', { cidade: 'São Paulo' }),
			path: '/weather/previsao',
		},
		{
			name: 'loterias → POST /loterias/{action}',
			call: api => api.loterias.request('megasena', {}),
			path: '/loterias/megasena',
		},
	]);
});

describe('varredura do catálogo — dados e serviços', () => {
	const proxyPick: Record<string, (api: ApiBrasil) => DeviceProxyService> = {
		sms: api => api.sms,
		dados: api => api.dados,
		vehicles: api => api.vehicles,
		fipe: api => api.fipe,
		correios: api => api.correios,
		cep: api => api.cep,
		ddd: api => api.ddd,
		holidays: api => api.holidays,
		translate: api => api.translate,
		weather: api => api.weather,
		loterias: api => api.loterias,
		geolocation: api => api.geolocation,
		geomatrix: api => api.geomatrix,
		recognize: api => api.recognize,
	};

	it.each(Object.keys(proxyPick))(
		'cobre todas as actions documentadas de %s',
		async service => {
			const actions = SERVICE_ACTIONS[service] ?? [];
			const { transport, api } = buildApi();

			for (const action of actions) {
				await proxyPick[service](api).request(action);
				expect(transport.last.url).toBe(`${BASE}/${service}/${action}`);
				expect(transport.last.method).toBe('POST');
			}
			expect(transport.calls).toHaveLength(actions.length);
		}
	);

	it('cobre TODOS os 210+ tipos de consulta do catálogo', async () => {
		const entries = Object.entries(CONSULTA_TIPOS);
		expect(entries.length).toBeGreaterThan(200);

		const { transport, api } = buildApi();
		for (const [tipo, meta] of entries) {
			await api.consulta.generic(meta.service, { tipo, homolog: true });
			expect(transport.last.url).toBe(`${BASE}/consulta/${meta.service}/credits`);
			expect(transport.lastBody).toEqual({ tipo, homolog: true });
		}
		expect(transport.calls).toHaveLength(entries.length);
	});
});
