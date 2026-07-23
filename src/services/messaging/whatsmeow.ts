import { HttpClient } from '../../core/http';
import { DeviceServiceResponse, RequestOptions } from '../../core/types';
import { WhatsMeowAction } from '../../generated/catalog';

/**
 * WhatsMeow API (device-based): `POST /whatsmeow/{action}`.
 * Exige `Authorization: Bearer` + `DeviceToken`.
 */
export class WhatsMeowService {
	constructor(private readonly http: HttpClient) {}

	/** Executa `POST /whatsmeow/{action}`. */
	request<T = any>(
		action: WhatsMeowAction | (string & {}),
		body?: Record<string, any>,
		options?: RequestOptions
	): Promise<DeviceServiceResponse<T>> {
		return this.http.post(`/whatsmeow/${action}`, body, options);
	}

	/** Executa a mesma chamada de forma assíncrona via fila. */
	queue<T = any>(
		action: WhatsMeowAction | (string & {}),
		body?: Record<string, any>,
		options?: RequestOptions
	): Promise<DeviceServiceResponse<T>> {
		return this.http.post(`/whatsmeow/${action}/queue`, body, options);
	}
}
