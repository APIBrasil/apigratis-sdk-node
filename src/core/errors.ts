type ErrorOptions = {
	status?: number;
	code?: string;
	response?: any;
	cause?: unknown;
};

/**
 * Erro base lançado pelo cliente `ApiBrasil`. Subclasses específicas
 * permitem tratar cada categoria com `instanceof`:
 *
 * - `ValidationError` (400/422), `AuthenticationError` (401),
 *   `InsufficientBalanceError` (402), `PermissionError` (403),
 *   `NotFoundError` (404/410), `RateLimitError` (429), `ServerError` (5xx)
 * - `NetworkError` / `TimeoutError` para falhas antes da resposta.
 */
export class ApiBrasilError extends Error {
	/** Status HTTP retornado pela API (ex: 401, 402, 404). */
	readonly status?: number;
	/** Código de erro retornado pela API (ex: `NOT_FOUND`). */
	readonly code?: string;
	/** Corpo completo da resposta de erro, quando existir. */
	readonly response?: any;

	constructor(message: string, options: ErrorOptions = {}) {
		super(message);
		this.name = new.target.name;
		this.status = options.status;
		this.code = options.code;
		this.response = options.response;
		if (options.cause !== undefined) {
			(this as any).cause = options.cause;
		}
	}

	/** `true` quando a falha foi por saldo/créditos insuficientes (HTTP 402). */
	get isInsufficientBalance(): boolean {
		return this.status === 402;
	}

	/** `true` quando a falha foi de autenticação (HTTP 401). */
	get isUnauthorized(): boolean {
		return this.status === 401;
	}

	static from(error: unknown): ApiBrasilError {
		if (error instanceof ApiBrasilError) return error;
		if (isAxiosLikeError(error)) {
			const data = error.response?.data;
			return createApiError(error.response?.status ?? 0, data, undefined, error);
		}
		return new ApiBrasilError(
			error instanceof Error ? error.message : String(error),
			{
				cause: error,
			}
		);
	}
}

/** Falha de rede — a requisição pode não ter chegado ao servidor. */
export class NetworkError extends ApiBrasilError {}

/** Timeout — a requisição pode ter sido processada; a SDK não faz retry automático. */
export class TimeoutError extends NetworkError {}

/** HTTP 400/422 — payload inválido. */
export class ValidationError extends ApiBrasilError {}

/** HTTP 401 — Bearer Token ausente, inválido ou expirado. */
export class AuthenticationError extends ApiBrasilError {}

/** HTTP 402 — saldo/créditos insuficientes. */
export class InsufficientBalanceError extends ApiBrasilError {}

/** HTTP 403 — sem permissão (ex: API exige conta PJ). */
export class PermissionError extends ApiBrasilError {}

/** HTTP 404/410 — recurso não encontrado ou desativado. */
export class NotFoundError extends ApiBrasilError {}

/** HTTP 429 — rate limit atingido. */
export class RateLimitError extends ApiBrasilError {
	/** Espera sugerida pelo servidor (header `Retry-After`), em ms. */
	readonly retryAfterMs?: number;

	constructor(
		message: string,
		options: ErrorOptions & { retryAfterMs?: number } = {}
	) {
		super(message, options);
		this.retryAfterMs = options.retryAfterMs;
	}
}

/** HTTP 5xx — erro interno do gateway/provedor. */
export class ServerError extends ApiBrasilError {}

const extractMessage = (status: number, data: any): string => {
	if (typeof data?.message === 'string' && data.message) return data.message;
	if (typeof data?.error === 'string' && data.error) return data.error;
	return `A API respondeu com HTTP ${status}.`;
};

const parseRetryAfterHeader = (
	headers?: Record<string, string>
): number | undefined => {
	const raw = headers?.['retry-after'] ?? headers?.['Retry-After'];
	if (!raw) return undefined;
	const seconds = Number(raw);
	if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000);
	const at = Date.parse(raw);
	return Number.isNaN(at) ? undefined : Math.max(0, at - Date.now());
};

/** Mapeia um status HTTP + corpo de erro para a subclasse adequada. */
export const createApiError = (
	status: number,
	data: any,
	headers?: Record<string, string>,
	cause?: unknown
): ApiBrasilError => {
	const message = extractMessage(status, data);
	const options: ErrorOptions = {
		status,
		code: typeof data?.code === 'string' ? data.code : undefined,
		response: data,
		cause,
	};

	if (status === 400 || status === 422) return new ValidationError(message, options);
	if (status === 401) return new AuthenticationError(message, options);
	if (status === 402) return new InsufficientBalanceError(message, options);
	if (status === 403) return new PermissionError(message, options);
	if (status === 404 || status === 410) return new NotFoundError(message, options);
	if (status === 429) {
		return new RateLimitError(message, {
			...options,
			retryAfterMs: parseRetryAfterHeader(headers),
		});
	}
	if (status >= 500) return new ServerError(message, options);
	return new ApiBrasilError(message, options);
};

type AxiosLikeError = {
	message: string;
	response?: { status?: number; data?: any };
};

const isAxiosLikeError = (error: any): error is AxiosLikeError =>
	!!error &&
	typeof error === 'object' &&
	(error.isAxiosError === true || !!error.response);
