import { HttpClient } from '../../core/http';
import { RequestOptions } from '../../core/types';

/** URA reversa / ligações: `/ura/call/*`. */
export class UraService {
	constructor(private readonly http: HttpClient) {}

	/** Disca uma ligação: `POST /ura/call/dialler`. */
	dialler<T = any>(body: Record<string, any>, options?: RequestOptions): Promise<T> {
		return this.http.post('/ura/call/dialler', body, options);
	}

	/** Consulta status da ligação: `POST /ura/call/status`. */
	status<T = any>(body: Record<string, any>, options?: RequestOptions): Promise<T> {
		return this.http.post('/ura/call/status', body, options);
	}
}
