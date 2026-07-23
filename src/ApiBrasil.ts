import { ApiBrasilError } from './core/errors';
import { HttpClient } from './core/http';
import { ApiBrasilConfig, HttpMethod, RequestOptions } from './core/types';
import { DeviceProxyService } from './services/deviceProxy';
import {
	EvolutionService,
	SmsService,
	WhatsAppService,
	WhatsMeowService,
} from './services/messaging';
import {
	BulkService,
	CepService,
	ChipVirtualService,
	ConsultaService,
	CorreiosService,
	DadosService,
	DatabaseIpService,
	FipeService,
	UraService,
	VehiclesService,
} from './services/data';
import {
	AccountService,
	AuthService,
	BearerRateLimitService,
	CatalogService,
	DevicesService,
	IpWhitelistService,
	PaymentsService,
	ReportsService,
} from './services/platform';
import type { LoginPayload, LoginResponse } from './services/platform/auth';

/**
 * Cliente oficial da plataforma APIBrasil.
 *
 * ```ts
 * import { ApiBrasil } from 'apigratis-sdk-nodejs';
 *
 * const api = new ApiBrasil({
 * 	bearerToken: process.env.APIBRASIL_BEARER_TOKEN,
 * 	deviceToken: process.env.APIBRASIL_DEVICE_TOKEN,
 * });
 *
 * await api.whatsapp.sendText({ number: '5511999999999', text: 'Olá!' });
 * const cnpj = await api.consulta.cnpj({ cnpj: '00000000000000' });
 * ```
 *
 * Credenciais não informadas são lidas das variáveis de ambiente
 * `APIBRASIL_BEARER_TOKEN`, `APIBRASIL_DEVICE_TOKEN`,
 * `APIBRASIL_SECRET_KEY` e `APIBRASIL_BASE_URL`.
 */
export class ApiBrasil {
	/** Cliente HTTP interno (headers, base URL, retry, hooks, erros). */
	readonly http: HttpClient;

	/** Login, 2FA, cadastro, senha e perfil. */
	readonly auth: AuthService;
	/** Gestão de devices (criar, listar, atualizar, remover). */
	readonly devices: DevicesService;

	/** WhatsApp device-based (`/whatsapp/{action}`). */
	readonly whatsapp: WhatsAppService;
	/** Evolution API (`/evolution/{controller}/{action}`). */
	readonly evolution: EvolutionService;
	/** WhatsMeow (`/whatsmeow/{action}`). */
	readonly whatsmeow: WhatsMeowService;
	/** SMS (`/sms/{action}` e `/sms/send/credits`). */
	readonly sms: SmsService;

	/** Dados cadastrais device-based (`/dados/cpf`, `/dados/cnpj`...). */
	readonly dados: DadosService;
	/** Veículos por placa (`/vehicles/dados`, `/vehicles/fipe`). */
	readonly vehicles: VehiclesService;
	/** Tabela FIPE (`/fipe/{action}`). */
	readonly fipe: FipeService;
	/** Correios (`/correios/{action}`). */
	readonly correios: CorreiosService;
	/** CEP + geolocalização (`/cep/{action}`). */
	readonly cep: CepService;
	/** Geolocalização (`/geolocation/{action}`). */
	readonly geolocation: DeviceProxyService;
	/** Matriz de distâncias (`/geomatrix/{action}`). */
	readonly geomatrix: DeviceProxyService;
	/** OCR / Google Vision (`/recognize/{action}`). */
	readonly recognize: DeviceProxyService;
	/** DDD (`/ddd/{action}`). */
	readonly ddd: DeviceProxyService;
	/** Feriados (`/holidays/{action}`). */
	readonly holidays: DeviceProxyService;
	/** Tradução (`/translate/{action}`). */
	readonly translate: DeviceProxyService;
	/** Clima (`/weather/{action}`). */
	readonly weather: DeviceProxyService;
	/** Loterias (`/loterias/{action}`). */
	readonly loterias: DeviceProxyService;
	/** GeoIP (`/database/ip`). */
	readonly databaseIp: DatabaseIpService;

	/** Consultas por crédito (`/consulta/{servico}/credits`). */
	readonly consulta: ConsultaService;
	/** URA reversa / ligações (`/ura/call/*`). */
	readonly ura: UraService;
	/** Chip virtual (`/chip/virtual/*`). */
	readonly chipVirtual: ChipVirtualService;
	/** Execução em lote (`/bulk/*`). */
	readonly bulk: BulkService;

	/** Catálogo de APIs, planos, docs e servidores. */
	readonly catalog: CatalogService;
	/** Saldo, faturas, notificações, tickets. */
	readonly account: AccountService;
	/** Recargas e pagamentos (PIX, boleto, cartão). */
	readonly payments: PaymentsService;
	/** IP whitelist da conta. */
	readonly ipWhitelist: IpWhitelistService;
	/** Rate limit por Bearer Token. */
	readonly bearerRateLimit: BearerRateLimitService;
	/** Relatórios e dashboard de consumo. */
	readonly reports: ReportsService;

	constructor(config: ApiBrasilConfig = {}) {
		this.http = new HttpClient(config);

		this.auth = new AuthService(this.http);
		this.devices = new DevicesService(this.http);

		this.whatsapp = new WhatsAppService(this.http);
		this.evolution = new EvolutionService(this.http);
		this.whatsmeow = new WhatsMeowService(this.http);
		this.sms = new SmsService(this.http);

		this.dados = new DadosService(this.http);
		this.vehicles = new VehiclesService(this.http);
		this.fipe = new FipeService(this.http);
		this.correios = new CorreiosService(this.http);
		this.cep = new CepService(this.http);
		this.geolocation = new DeviceProxyService(this.http, 'geolocation');
		this.geomatrix = new DeviceProxyService(this.http, 'geomatrix');
		this.recognize = new DeviceProxyService(this.http, 'recognize');
		this.ddd = new DeviceProxyService(this.http, 'ddd');
		this.holidays = new DeviceProxyService(this.http, 'holidays');
		this.translate = new DeviceProxyService(this.http, 'translate');
		this.weather = new DeviceProxyService(this.http, 'weather');
		this.loterias = new DeviceProxyService(this.http, 'loterias');
		this.databaseIp = new DatabaseIpService(this.http);

		this.consulta = new ConsultaService(this.http);
		this.ura = new UraService(this.http);
		this.chipVirtual = new ChipVirtualService(this.http);
		this.bulk = new BulkService(this.http);

		this.catalog = new CatalogService(this.http);
		this.account = new AccountService(this.http);
		this.payments = new PaymentsService(this.http);
		this.ipWhitelist = new IpWhitelistService(this.http);
		this.bearerRateLimit = new BearerRateLimitService(this.http);
		this.reports = new ReportsService(this.http);
	}

	/**
	 * Faz login e retorna um cliente já autenticado.
	 * Lança `ApiBrasilError` se a conta exigir 2FA — nesse caso crie o
	 * cliente manualmente e use `auth.login()` + `auth.verify2fa()`.
	 */
	static async login(
		credentials: LoginPayload,
		config: ApiBrasilConfig = {}
	): Promise<{ client: ApiBrasil; session: LoginResponse }> {
		const client = new ApiBrasil(config);
		const session = await client.auth.login(credentials);
		if (session?.requires_2fa) {
			throw new ApiBrasilError(
				'Esta conta exige autenticação em dois fatores. Use auth.login() + auth.verify2fa().',
				{ response: session }
			);
		}
		return { client, session };
	}

	/** Define/atualiza o Bearer Token do cliente. */
	setBearerToken(token: string): this {
		this.http.setBearerToken(token);
		return this;
	}

	/** Define/atualiza o DeviceToken do cliente. */
	setDeviceToken(token: string): this {
		this.http.setDeviceToken(token);
		return this;
	}

	/**
	 * Retorna um novo cliente com as mesmas credenciais, mas apontando
	 * para outro device — útil para gerenciar vários números/instâncias.
	 */
	withDevice(deviceToken: string): ApiBrasil {
		return new ApiBrasil({ ...this.http.getConfig(), deviceToken });
	}

	/**
	 * Porta de saída genérica: chama qualquer endpoint do gateway com os
	 * headers de autenticação já configurados. Use para rotas que ainda
	 * não têm método dedicado na SDK.
	 *
	 * ```ts
	 * await api.request('POST', '/consulta/cpf/credits', { cpf: '...' });
	 * ```
	 */
	request<T = any>(
		method: HttpMethod,
		path: string,
		body?: any,
		options?: RequestOptions
	): Promise<T> {
		return this.http.request<T>(method, path, body, options);
	}
}
