import { HttpClient } from '../../core/http';
import { RequestOptions } from '../../core/types';

/**
 * Catálogo público da plataforma: APIs, planos, documentações e servidores.
 * A maioria das rotas é pública (não exige Bearer Token).
 */
export class CatalogService {
	constructor(private readonly http: HttpClient) {}

	/** Lista/busca APIs disponíveis: `GET /apis?search=`. */
	apis(search?: string, options?: RequestOptions): Promise<any> {
		return this.http.get('/apis', {
			...options,
			query: { ...(search ? { search } : {}), ...options?.query },
		});
	}

	/** Detalha uma API por identificador: `GET /apis/{identifier}`. */
	api(identifier: string, options?: RequestOptions): Promise<any> {
		return this.http.get(`/apis/${identifier}`, options);
	}

	/** Detalha uma API pelo nome: `GET /apis/name/{name}`. */
	apiByName(name: string, options?: RequestOptions): Promise<any> {
		return this.http.get(`/apis/name/${encodeURIComponent(name)}`, options);
	}

	/** Categorias de APIs: `GET /apis/categories`. */
	apiCategories(options?: RequestOptions): Promise<any> {
		return this.http.get('/apis/categories', options);
	}

	/** APIs contratadas pelo usuário (autenticado): `GET /apis/list`. */
	myApis(options?: RequestOptions): Promise<any> {
		return this.http.get('/apis/list', options);
	}

	/** APIs vinculadas a um device: `GET /apis/device/{device_token}`. */
	apisByDevice(deviceToken: string, options?: RequestOptions): Promise<any> {
		return this.http.get(`/apis/device/${deviceToken}`, options);
	}

	/** Planos disponíveis: `GET /plans`. */
	plans(options?: RequestOptions): Promise<any> {
		return this.http.get('/plans', options);
	}

	/** Documentações: `GET /documentations`. */
	documentations(options?: RequestOptions): Promise<any> {
		return this.http.get('/documentations', options);
	}

	/** Documentação por servidor: `GET /documentations/server/{server_search}`. */
	documentationsByServer(
		serverSearch: string,
		options?: RequestOptions
	): Promise<any> {
		return this.http.get(`/documentations/server/${serverSearch}`, options);
	}

	/** Servidores disponíveis: `GET /servers`. */
	servers(options?: RequestOptions): Promise<any> {
		return this.http.get('/servers', options);
	}

	/**
	 * Resolve a URL de uma action (descoberta dinâmica de endpoints):
	 * `POST /endpoint/url`.
	 */
	endpointUrl(body: Record<string, any>, options?: RequestOptions): Promise<any> {
		return this.http.post('/endpoint/url', body, options);
	}

	/** Body esperado por uma action: `POST /endpoint/body`. */
	endpointBody(body: Record<string, any>, options?: RequestOptions): Promise<any> {
		return this.http.post('/endpoint/body', body, options);
	}

	/** Status do gateway: `GET /status`. */
	status(options?: RequestOptions): Promise<any> {
		return this.http.get('/status', options);
	}
}
