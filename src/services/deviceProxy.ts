import { HttpClient } from '../core/http';
import { DeviceServiceResponse, RequestOptions } from '../core/types';

const trimSlashes = (value: string) => value.replace(/^\/+|\/+$/g, '');

/**
 * Base dos serviços "device-based" do gateway (`/api/v2/{servico}/{action}`).
 * Exigem `Authorization: Bearer` + header `DeviceToken`.
 *
 * Todos expõem `request(action, body)` como porta de saída genérica —
 * as actions são dinâmicas por provedor, consulte a documentação em
 * https://doc.apibrasil.io
 *
 * O parâmetro de tipo `TAction` habilita autocomplete das actions
 * conhecidas (gerado do catálogo) sem impedir strings livres.
 */
export class DeviceProxyService<TAction extends string = string> {
	constructor(
		protected readonly http: HttpClient,
		readonly service: string
	) {}

	/** Executa uma action do serviço: `POST /{servico}/{action}`. */
	request<T = any>(
		action: TAction | (string & {}),
		body?: Record<string, any>,
		options?: RequestOptions
	): Promise<DeviceServiceResponse<T>> {
		return this.http.post(`/${this.service}/${trimSlashes(action)}`, body, options);
	}
}
