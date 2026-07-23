import { HttpClient } from '../../core/http';
import { RequestOptions } from '../../core/types';

export type DeviceStorePayload = {
	/** Tipo do dispositivo. */
	type?: 'cellphone' | 'tablet' | 'computer' | 'server';
	/** Nome do device (alfanumérico). */
	device_name: string;
	/** Chave do device (alfanumérica). */
	device_key?: string;
	device_ip?: string;
	server_search?: string;
	webhook_wh_message?: string;
	webhook_wh_status?: string;
	webhook_wh_connect?: string;
	webhook_wh_qr_code?: string;
	receive_alerts?: boolean | string;
	status_situation?: string;
	[key: string]: any;
};

/**
 * Gestão de devices (`/devices/*`).
 *
 * Devices são a credencial de consumo dos serviços device-based:
 * crie um device com a `SecretKey` da API desejada e use o
 * `device_token` retornado como header `DeviceToken`.
 */
export class DevicesService {
	constructor(private readonly http: HttpClient) {}

	/** Lista os devices do usuário: `GET /devices`. */
	list(
		query?: { paginate?: boolean | string; [key: string]: any },
		options?: RequestOptions
	) {
		return this.http.get('/devices', {
			...options,
			query: { ...query, ...options?.query },
		});
	}

	/**
	 * Cria um device: `POST /devices/store`.
	 * A `SecretKey` da API (painel APIBrasil) vai no header — passe em
	 * `options.secretKey` ou configure `secretKey` no cliente.
	 */
	store(payload: DeviceStorePayload, options?: RequestOptions): Promise<any> {
		const secretKey = options?.secretKey ?? this.http.secretKey;
		return this.http.post('/devices/store', payload, { ...options, secretKey });
	}

	/** Detalha um device: `GET /devices/show?search={device_token}`. */
	show(deviceToken?: string, options?: RequestOptions): Promise<any> {
		const search = deviceToken ?? this.http.deviceToken;
		return this.http.get('/devices/show', {
			...options,
			query: { search, ...options?.query },
		});
	}

	/** Atualiza um device: `POST /devices/update` (body com `device_token` + campos). */
	update(payload: Record<string, any>, options?: RequestOptions): Promise<any> {
		return this.http.post('/devices/update', payload, options);
	}

	/** Remove um device: `DELETE /devices/destroy`. */
	destroy(deviceToken?: string, options?: RequestOptions): Promise<any> {
		const search = deviceToken ?? this.http.deviceToken;
		return this.http.delete('/devices/destroy', { search }, options);
	}

	/** Histórico de requisições do device: `POST /devices/requests`. */
	requests(payload?: Record<string, any>, options?: RequestOptions): Promise<any> {
		return this.http.post('/devices/requests', payload, options);
	}
}
