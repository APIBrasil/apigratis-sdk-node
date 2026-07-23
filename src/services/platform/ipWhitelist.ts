import { HttpClient } from '../../core/http';
import { RequestOptions } from '../../core/types';

/**
 * IP Whitelist da conta (`/ip-whitelist/*`).
 * Restringe de quais IPs o Bearer Token pode ser usado.
 */
export class IpWhitelistService {
	constructor(private readonly http: HttpClient) {}

	/** Configuração atual: `GET /ip-whitelist`. */
	get(options?: RequestOptions): Promise<any> {
		return this.http.get('/ip-whitelist', options);
	}

	/** Substitui a lista inteira: `PUT /ip-whitelist`. */
	set(ipWhitelist: string | string[], options?: RequestOptions): Promise<any> {
		return this.http.put('/ip-whitelist', { ip_whitelist: ipWhitelist }, options);
	}

	/** Adiciona uma entrada: `POST /ip-whitelist/add`. */
	add(entry: string, options?: RequestOptions): Promise<any> {
		return this.http.post('/ip-whitelist/add', { entry }, options);
	}

	/** Remove uma entrada: `DELETE /ip-whitelist/remove`. */
	remove(entry: string, options?: RequestOptions): Promise<any> {
		return this.http.delete('/ip-whitelist/remove', { entry }, options);
	}

	/** Adiciona o IP atual: `POST /ip-whitelist/add-current`. */
	addCurrent(options?: RequestOptions): Promise<any> {
		return this.http.post('/ip-whitelist/add-current', undefined, options);
	}

	/** Libera todos os IPs (wildcard): `POST /ip-whitelist/reset`. */
	reset(options?: RequestOptions): Promise<any> {
		return this.http.post('/ip-whitelist/reset', undefined, options);
	}

	/** Valida uma entrada: `POST /ip-whitelist/validate`. */
	validate(entry: string, options?: RequestOptions): Promise<any> {
		return this.http.post('/ip-whitelist/validate', { entry }, options);
	}

	/** IP atual visto pelo gateway: `GET /ip-whitelist/current-ip`. */
	currentIp(options?: RequestOptions): Promise<any> {
		return this.http.get('/ip-whitelist/current-ip', options);
	}
}
