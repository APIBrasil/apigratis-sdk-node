import { configFromEnv } from './env';
import {
	ApiBrasilError,
	NetworkError,
	RateLimitError,
	TimeoutError,
	createApiError,
} from './errors';
import { backoffDelayMs, resolveRetry, sleep } from './retry';
import { FetchTransport, Transport, TransportResponse } from './transport';
import {
	ApiBrasilConfig,
	ApiBrasilHooks,
	HttpMethod,
	RequestOptions,
	RetryConfig,
} from './types';

export const DEFAULT_BASE_URL = 'https://gateway.apibrasil.io/api/v2';
export const DEFAULT_TIMEOUT = 30000;
export const SDK_USER_AGENT = 'APIBRASIL/SDK-JS';

const definedOnly = <T extends object>(value: T): Partial<T> => {
	const out: Record<string, any> = {};
	for (const [key, item] of Object.entries(value)) {
		if (item !== undefined) out[key] = item;
	}
	return out as Partial<T>;
};

const buildQueryString = (query?: Record<string, any>): string => {
	if (!query) return '';
	const params = new URLSearchParams();
	for (const [key, value] of Object.entries(query)) {
		if (value === undefined || value === null) continue;
		params.append(key, String(value));
	}
	const encoded = params.toString();
	return encoded ? `?${encoded}` : '';
};

const joinUrl = (baseURL: string, path: string): string => {
	const base = baseURL.replace(/\/+$/, '');
	const suffix = path.replace(/^\/+/, '');
	return suffix ? `${base}/${suffix}` : base;
};

/**
 * Cliente HTTP interno da SDK. Injeta os headers de autenticação da
 * plataforma (`Authorization: Bearer`, `DeviceToken`, `SecretKey`),
 * aplica retry com backoff, dispara hooks de observabilidade e converte
 * falhas em subclasses de `ApiBrasilError`.
 */
export class HttpClient {
	private readonly config: ApiBrasilConfig;
	private readonly transport: Transport;
	private readonly retry?: Required<RetryConfig>;
	private readonly hooks: ApiBrasilHooks;

	constructor(config: ApiBrasilConfig = {}) {
		this.config = { ...configFromEnv(), ...definedOnly(config) };
		this.transport = this.config.transport ?? new FetchTransport();
		this.retry = resolveRetry(this.config.retry);
		this.hooks = this.config.hooks ?? {};
	}

	get baseURL(): string {
		return this.config.baseURL ?? DEFAULT_BASE_URL;
	}

	get bearerToken(): string | undefined {
		return this.config.bearerToken;
	}

	get deviceToken(): string | undefined {
		return this.config.deviceToken;
	}

	get secretKey(): string | undefined {
		return this.config.secretKey;
	}

	setBearerToken(token: string | undefined): void {
		this.config.bearerToken = token;
	}

	setDeviceToken(token: string | undefined): void {
		this.config.deviceToken = token;
	}

	getConfig(): ApiBrasilConfig {
		return { ...this.config };
	}

	async request<T = any>(
		method: HttpMethod,
		path: string,
		body?: any,
		options: RequestOptions = {}
	): Promise<T> {
		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			'User-Agent': SDK_USER_AGENT,
			...this.config.headers,
		};

		const bearerToken = options.bearerToken ?? this.config.bearerToken;
		if (bearerToken) headers.Authorization = `Bearer ${bearerToken}`;

		const deviceToken = options.deviceToken ?? this.config.deviceToken;
		if (deviceToken) headers.DeviceToken = deviceToken;

		if (options.secretKey) headers.SecretKey = options.secretKey;

		Object.assign(headers, options.headers);

		const url = joinUrl(this.baseURL, path) + buildQueryString(options.query);
		const serializedBody = body === undefined ? undefined : JSON.stringify(body);
		const timeoutMs = options.timeout ?? this.config.timeout ?? DEFAULT_TIMEOUT;
		const maxAttempts = 1 + (this.retry?.retries ?? 0);

		let attempt = 0;
		for (;;) {
			await this.hooks.onRequest?.({ method, url, headers, body, attempt });

			const startedAt = Date.now();
			let response: TransportResponse;
			try {
				response = await this.transport.request({
					method,
					url,
					headers,
					body: serializedBody,
					timeoutMs,
					responseType: options.responseType,
				});
			} catch (error) {
				const retryable =
					error instanceof NetworkError && !(error instanceof TimeoutError);
				if (retryable && this.retry && attempt + 1 < maxAttempts) {
					const delayMs = backoffDelayMs(attempt, this.retry);
					attempt += 1;
					await this.hooks.onRetry?.({
						method,
						url,
						attempt,
						delayMs,
						reason: error instanceof Error ? error.message : String(error),
					});
					await sleep(delayMs);
					continue;
				}
				throw error instanceof ApiBrasilError ? error : ApiBrasilError.from(error);
			}

			await this.hooks.onResponse?.({
				method,
				url,
				status: response.status,
				durationMs: Date.now() - startedAt,
				attempt,
			});

			if (response.status >= 400) {
				const error = createApiError(
					response.status,
					response.data,
					response.headers
				);
				const retryableStatus =
					this.retry?.retryOnStatuses.includes(response.status) ?? false;
				if (retryableStatus && this.retry && attempt + 1 < maxAttempts) {
					const delayMs =
						error instanceof RateLimitError && error.retryAfterMs !== undefined
							? error.retryAfterMs
							: backoffDelayMs(attempt, this.retry);
					attempt += 1;
					await this.hooks.onRetry?.({
						method,
						url,
						attempt,
						delayMs,
						reason: `HTTP ${response.status}`,
					});
					await sleep(delayMs);
					continue;
				}
				throw error;
			}

			return response.data as T;
		}
	}

	get<T = any>(path: string, options?: RequestOptions): Promise<T> {
		return this.request<T>('GET', path, undefined, options);
	}

	post<T = any>(path: string, body?: any, options?: RequestOptions): Promise<T> {
		return this.request<T>('POST', path, body, options);
	}

	put<T = any>(path: string, body?: any, options?: RequestOptions): Promise<T> {
		return this.request<T>('PUT', path, body, options);
	}

	patch<T = any>(path: string, body?: any, options?: RequestOptions): Promise<T> {
		return this.request<T>('PATCH', path, body, options);
	}

	delete<T = any>(path: string, body?: any, options?: RequestOptions): Promise<T> {
		return this.request<T>('DELETE', path, body, options);
	}
}
