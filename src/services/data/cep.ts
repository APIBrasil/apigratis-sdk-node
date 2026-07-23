import { HttpClient } from '../../core/http';
import { RequestOptions } from '../../core/types';
import { DeviceProxyService } from '../deviceProxy';

/** CEP + geolocalização (device-based): `/cep/{action}`. */
export class CepService extends DeviceProxyService {
	constructor(http: HttpClient) {
		super(http, 'cep');
	}

	/** Consulta um CEP: `POST /cep/cep` body `{ cep }`. */
	cep<T = any>(body: { cep: string; [key: string]: any }, options?: RequestOptions) {
		return this.request<T>('cep', body, options);
	}
}
