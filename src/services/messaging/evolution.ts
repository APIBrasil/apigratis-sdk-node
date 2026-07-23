import { HttpClient } from '../../core/http';
import { DeviceServiceResponse, RequestOptions } from '../../core/types';
import { EvolutionPath } from '../../generated/catalog';

/**
 * Evolution API (device-based): `POST /evolution/{controller}/{action}`.
 * Exige `Authorization: Bearer` + `DeviceToken`.
 *
 * Exemplos de controller/action: `instance/create`, `message/sendText`.
 * Os caminhos documentados estão no tipo gerado `EvolutionPath`.
 */
export class EvolutionService {
	constructor(private readonly http: HttpClient) {}

	/** Executa `POST /evolution/{controller}/{action}`. */
	request<T = any>(
		controller: string,
		action: string,
		body?: Record<string, any>,
		options?: RequestOptions
	): Promise<DeviceServiceResponse<T>> {
		return this.http.post(`/evolution/${controller}/${action}`, body, options);
	}

	/** Executa um caminho completo do catálogo: `POST /evolution/{path}`. */
	call<T = any>(
		path: EvolutionPath | (string & {}),
		body?: Record<string, any>,
		options?: RequestOptions
	): Promise<DeviceServiceResponse<T>> {
		return this.http.post(`/evolution/${path.replace(/^\/+/, '')}`, body, options);
	}

	/** Executa a mesma chamada de forma assíncrona via fila. */
	queue<T = any>(
		controller: string,
		action: string,
		body?: Record<string, any>,
		options?: RequestOptions
	): Promise<DeviceServiceResponse<T>> {
		return this.http.post(`/evolution/${controller}/${action}/queue`, body, options);
	}
}
