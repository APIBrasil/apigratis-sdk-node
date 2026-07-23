import { HttpClient } from '../../core/http';
import { RequestOptions } from '../../core/types';

/** Chip virtual: `/chip/virtual/*`. */
export class ChipVirtualService {
	constructor(private readonly http: HttpClient) {}

	/** Lista operadoras: `POST /chip/virtual/operators`. */
	operators<T = any>(
		body?: Record<string, any>,
		options?: RequestOptions
	): Promise<T> {
		return this.http.post('/chip/virtual/operators', body, options);
	}

	/** Compra um número: `POST /chip/virtual/buy`. */
	buy<T = any>(body: Record<string, any>, options?: RequestOptions): Promise<T> {
		return this.http.post('/chip/virtual/buy', body, options);
	}

	/** Consulta ativação: `POST /chip/virtual/activation`. */
	activation<T = any>(
		body: Record<string, any>,
		options?: RequestOptions
	): Promise<T> {
		return this.http.post('/chip/virtual/activation', body, options);
	}

	/** Lista serviços: `POST /chip/virtual/services`. */
	services<T = any>(
		body?: Record<string, any>,
		options?: RequestOptions
	): Promise<T> {
		return this.http.post('/chip/virtual/services', body, options);
	}
}
