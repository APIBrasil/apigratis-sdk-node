import {
	Transport,
	TransportRequest,
	TransportResponse,
} from '../../src/core/transport';

/**
 * Transporte fake para testes: grava todas as requisições e responde
 * com uma fila programável (ou um fallback 200).
 */
export class FakeTransport implements Transport {
	readonly calls: TransportRequest[] = [];
	private readonly queue: Array<TransportResponse | Error> = [];
	private fallback: TransportResponse = {
		status: 200,
		headers: {},
		data: { ok: true },
	};

	/** Enfileira respostas (ou erros a lançar), consumidas em ordem. */
	respondWith(...responses: Array<TransportResponse | Error>): this {
		this.queue.push(...responses);
		return this;
	}

	/** Define a resposta padrão quando a fila está vazia. */
	setFallback(response: TransportResponse): this {
		this.fallback = response;
		return this;
	}

	get last(): TransportRequest {
		return this.calls[this.calls.length - 1];
	}

	/** Body JSON decodificado da última requisição. */
	get lastBody(): any {
		return this.last?.body === undefined ? undefined : JSON.parse(this.last.body);
	}

	async request(request: TransportRequest): Promise<TransportResponse> {
		this.calls.push(request);
		const next = this.queue.shift() ?? this.fallback;
		if (next instanceof Error) throw next;
		return next;
	}
}

export const ok = (data: any = { ok: true }): TransportResponse => ({
	status: 200,
	headers: {},
	data,
});

export const httpError = (
	status: number,
	data: any,
	headers: Record<string, string> = {}
): TransportResponse => ({ status, headers, data });
