import { HttpClient } from '../../core/http';
import { RequestOptions } from '../../core/types';
import { DeviceProxyService } from '../deviceProxy';

/** Dados cadastrais (device-based): `/dados/{action}`. */
export class DadosService extends DeviceProxyService {
	constructor(http: HttpClient) {
		super(http, 'dados');
	}

	/** Consulta CNPJ: `POST /dados/cnpj` body `{ cnpj }`. */
	cnpj<T = any>(
		body: { cnpj: string; [key: string]: any },
		options?: RequestOptions
	) {
		return this.request<T>('cnpj', body, options);
	}

	/** Consulta CPF: `POST /dados/cpf` body `{ cpf }`. */
	cpf<T = any>(body: { cpf: string; [key: string]: any }, options?: RequestOptions) {
		return this.request<T>('cpf', body, options);
	}
}
