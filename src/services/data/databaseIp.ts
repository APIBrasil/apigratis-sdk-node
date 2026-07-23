import { HttpClient } from '../../core/http';
import { DeviceServiceResponse, RequestOptions } from '../../core/types';

/** GeoIP (device-based): `POST /database/ip`. */
export class DatabaseIpService {
	constructor(private readonly http: HttpClient) {}

	/** Consulta a base de IPs: `POST /database/ip`. */
	ip<T = any>(body?: { ip?: string; [key: string]: any }, options?: RequestOptions) {
		return this.http.post<DeviceServiceResponse<T>>('/database/ip', body, options);
	}
}
