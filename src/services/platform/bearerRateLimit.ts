import { HttpClient } from '../../core/http';
import { RequestOptions } from '../../core/types';

/**
 * Rate limit por Bearer Token (`/bearer-rate-limit`).
 */
export class BearerRateLimitService {
	constructor(private readonly http: HttpClient) {}

	/** Limite atual: `GET /bearer-rate-limit`. */
	get(options?: RequestOptions): Promise<any> {
		return this.http.get('/bearer-rate-limit', options);
	}

	/** Define o limite por minuto: `PUT /bearer-rate-limit`. */
	set(body: Record<string, any>, options?: RequestOptions): Promise<any> {
		return this.http.put('/bearer-rate-limit', body, options);
	}
}
