import type { Transport } from './transport';
import type { ConsultaTipo } from '../generated/catalog';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Política de retry do cliente. Por padrão a SDK tenta novamente apenas
 * em HTTP 429 (rate limit) e em falhas de conexão — nunca em timeouts ou
 * erros de negócio, para não duplicar cobranças/envios.
 */
export type RetryConfig = {
	/** Número de novas tentativas além da original. Padrão: 2. */
	retries?: number;
	/** Atraso base do backoff exponencial em ms. Padrão: 300. */
	minDelayMs?: number;
	/** Teto do atraso entre tentativas em ms. Padrão: 5000. */
	maxDelayMs?: number;
	/** Status HTTP que disparam retry. Padrão: `[429]`. */
	retryOnStatuses?: number[];
};

export type HookRequestInfo = {
	method: HttpMethod;
	url: string;
	headers: Record<string, string>;
	body?: any;
	/** Tentativa atual (0 = primeira). */
	attempt: number;
};

export type HookResponseInfo = {
	method: HttpMethod;
	url: string;
	status: number;
	durationMs: number;
	attempt: number;
};

export type HookRetryInfo = {
	method: HttpMethod;
	url: string;
	/** Número da próxima tentativa. */
	attempt: number;
	delayMs: number;
	reason: string;
};

/** Hooks de observabilidade — logging, métricas, tracing. */
export type ApiBrasilHooks = {
	onRequest?: (info: HookRequestInfo) => void | Promise<void>;
	onResponse?: (info: HookResponseInfo) => void | Promise<void>;
	onRetry?: (info: HookRetryInfo) => void | Promise<void>;
};

/**
 * Configuração do cliente ApiBrasil.
 *
 * Campos não informados são lidos das variáveis de ambiente
 * `APIBRASIL_BEARER_TOKEN`, `APIBRASIL_DEVICE_TOKEN`,
 * `APIBRASIL_SECRET_KEY` e `APIBRASIL_BASE_URL`.
 */
export type ApiBrasilConfig = {
	/** Token JWT obtido no login (`Authorization: Bearer <token>`). */
	bearerToken?: string;
	/** Token do dispositivo, exigido pelos serviços device-based (WhatsApp, SMS, veículos...). */
	deviceToken?: string;
	/** SecretKey da API (usada apenas na criação de devices). */
	secretKey?: string;
	/** Base da API. Padrão: `https://gateway.apibrasil.io/api/v2`. */
	baseURL?: string;
	/** Timeout das requisições em ms. Padrão: 30000. */
	timeout?: number;
	/** Headers adicionais enviados em todas as requisições. */
	headers?: Record<string, string>;
	/** Transporte HTTP customizado. Padrão: fetch nativo (`FetchTransport`). */
	transport?: Transport;
	/** Política de retry, ou `false` para desativar. */
	retry?: RetryConfig | false;
	/** Hooks de observabilidade. */
	hooks?: ApiBrasilHooks;
};

/**
 * Opções por requisição — sobrescrevem a configuração do cliente.
 */
export type RequestOptions = {
	query?: Record<string, any>;
	headers?: Record<string, string>;
	bearerToken?: string;
	deviceToken?: string;
	secretKey?: string;
	timeout?: number;
	responseType?: 'json' | 'arraybuffer' | 'stream';
};

/**
 * Envelope de resposta dos serviços device-based
 * (`{ error, message, response, api_limit... }`).
 */
export type DeviceServiceResponse<T = any> = {
	error?: boolean;
	message?: string;
	response?: T;
	api_limit?: number | string;
	api_limit_for?: string;
	api_limit_used?: number | string;
	[key: string]: any;
};

/**
 * Envelope de resposta das consultas por crédito
 * (`{ error, message, balance, tax, valor_consulta, data... }`).
 */
export type CreditServiceResponse<T = any> = {
	error?: boolean;
	message?: string;
	balance?: number | string;
	tax?: number | string;
	valor_consulta?: number | string;
	api_limit_for?: string;
	homolog?: boolean;
	data?: T;
	[key: string]: any;
};

/**
 * Campos comuns aceitos pelas consultas por crédito (`/consulta/{service}/credits`).
 */
export type ConsultaPayload = {
	/** Tipo/serviço da consulta (ex: `lista-socios`, `serasa-score-pf`). Autocomplete gerado do catálogo. */
	tipo?: ConsultaTipo | (string & {});
	/** `true` ativa o modo homologação (sandbox, sem cobrança) quando suportado. */
	homolog?: boolean;
	/** Versão reduzida da consulta, quando suportada. */
	lite?: boolean;
	/** Consultas agrupadas. */
	agrupados?: string[];
	/** Serviços extras. */
	extra?: string[];
	[key: string]: any;
};
