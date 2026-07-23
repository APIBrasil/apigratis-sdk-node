import { HttpClient } from '../../core/http';
import { RequestOptions } from '../../core/types';

/** Execução em lote: `/bulk/direct/{action}` e `/bulk/queue/{action}`. */
export class BulkService {
	constructor(private readonly http: HttpClient) {}

	/** Executa um lote de forma síncrona: `POST /bulk/direct/{action}`. */
	direct<T = any>(
		action: string,
		body: Record<string, any>,
		options?: RequestOptions
	): Promise<T> {
		return this.http.post(`/bulk/direct/${action}`, body, options);
	}

	/** Enfileira um lote: `POST /bulk/queue/{action}`. */
	queue<T = any>(
		action: string,
		body: Record<string, any>,
		options?: RequestOptions
	): Promise<T> {
		return this.http.post(`/bulk/queue/${action}`, body, options);
	}
}
