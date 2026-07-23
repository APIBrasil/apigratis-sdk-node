import { HttpClient } from '../../core/http';
import { RequestOptions } from '../../core/types';
import { DeviceProxyService } from '../deviceProxy';

/** Veículos por placa (device-based): `/vehicles/{action}`. */
export class VehiclesService extends DeviceProxyService {
	constructor(http: HttpClient) {
		super(http, 'vehicles');
	}

	/** Dados do veículo pela placa: `POST /vehicles/dados` body `{ placa }`. */
	dados<T = any>(
		body: { placa: string; [key: string]: any },
		options?: RequestOptions
	) {
		return this.request<T>('dados', body, options);
	}

	/** FIPE pela placa: `POST /vehicles/fipe` body `{ placa }`. */
	fipe<T = any>(
		body: { placa: string; [key: string]: any },
		options?: RequestOptions
	) {
		return this.request<T>('fipe', body, options);
	}

	/** Consulta FIPE: `POST /vehicles/consultafipe/{placa}`. */
	consultaFipe<T = any>(placa: string, options?: RequestOptions) {
		return this.request<T>(
			`consultafipe/${encodeURIComponent(placa)}`,
			undefined,
			options
		);
	}
}
