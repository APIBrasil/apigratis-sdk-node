import { HttpClient } from '../../core/http';
import { RequestOptions } from '../../core/types';
import { DeviceProxyService } from '../deviceProxy';

/** Correios (device-based): `/correios/{action}`. */
export class CorreiosService extends DeviceProxyService {
	constructor(http: HttpClient) {
		super(http, 'correios');
	}

	/** Rastreio de encomendas: `POST /correios/rastreio`. */
	rastreio<T = any>(
		body: { code?: string; codigo?: string; [key: string]: any },
		options?: RequestOptions
	) {
		return this.request<T>('rastreio', body, options);
	}
}
