import { NetworkError, TimeoutError } from './errors';
import { HttpMethod } from './types';

export type TransportRequest = {
	method: HttpMethod;
	/** URL absoluta, já com query string. */
	url: string;
	headers: Record<string, string>;
	/** Corpo já serializado (JSON). */
	body?: string;
	timeoutMs?: number;
	responseType?: 'json' | 'arraybuffer' | 'stream';
};

export type TransportResponse = {
	status: number;
	headers: Record<string, string>;
	/** Corpo já decodificado (JSON → objeto; texto; ArrayBuffer; stream). */
	data: any;
};

/**
 * Camada de transporte HTTP da SDK. A implementação padrão usa o fetch
 * nativo (`FetchTransport`); injete a sua para usar axios, proxies,
 * mocks de teste etc.
 *
 * Contrato: resolve com a resposta para QUALQUER status HTTP; lança
 * `NetworkError`/`TimeoutError` apenas quando não houve resposta.
 */
export interface Transport {
	request(request: TransportRequest): Promise<TransportResponse>;
}

/**
 * Transporte padrão baseado no fetch nativo (Node.js >= 18, browsers,
 * Bun, Deno, Cloudflare Workers).
 */
export class FetchTransport implements Transport {
	private readonly fetchFn: typeof fetch;

	constructor(fetchFn?: typeof fetch) {
		this.fetchFn =
			fetchFn ?? ((...args: Parameters<typeof fetch>) => globalThis.fetch(...args));
	}

	async request(request: TransportRequest): Promise<TransportResponse> {
		const controller = new AbortController();
		const timer =
			request.timeoutMs && request.timeoutMs > 0
				? setTimeout(() => controller.abort(), request.timeoutMs)
				: undefined;

		let response: Response;
		try {
			response = await this.fetchFn(request.url, {
				method: request.method,
				headers: request.headers,
				body: request.body,
				signal: controller.signal,
			});
		} catch (error) {
			if (controller.signal.aborted) {
				throw new TimeoutError(
					`Tempo limite de ${request.timeoutMs}ms excedido em ${request.method} ${request.url}.`,
					{ cause: error }
				);
			}
			throw new NetworkError(
				`Falha de rede em ${request.method} ${request.url}: ${
					error instanceof Error ? error.message : String(error)
				}`,
				{ cause: error }
			);
		} finally {
			if (timer) clearTimeout(timer);
		}

		const headers: Record<string, string> = {};
		response.headers.forEach((value, key) => {
			headers[key] = value;
		});

		let data: any;
		if (request.responseType === 'arraybuffer') {
			data = await response.arrayBuffer();
		} else if (request.responseType === 'stream') {
			data = response.body;
		} else {
			const text = await response.text();
			if (!text) {
				data = undefined;
			} else {
				try {
					data = JSON.parse(text);
				} catch {
					data = text;
				}
			}
		}

		return { status: response.status, headers, data };
	}
}
