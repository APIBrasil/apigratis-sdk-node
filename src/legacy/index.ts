import { ApiBrasilError } from '../core/errors';
import { HttpClient } from '../core/http';

/**
 * @deprecated Interface legada (v0.1.x). Prefira o cliente `ApiBrasil`,
 * que cobre toda a plataforma com métodos tipados e tratamento de erros.
 */
export type Credentials = {
	SecretKey?: string;
	PublicToken?: string;
	DeviceToken: string;
	BearerToken: string;
};

export type Action =
	`whatsapp` | 'vehicles' | 'correios' | 'dados/cpf' | 'dados/cnpj' | 'cep';

export const LEGACY_BASE_URL = 'https://cluster.apigratis.com/api/v2';

/**
 * @deprecated Interface legada (v0.1.x), mantida por compatibilidade.
 * Prefira `new ApiBrasil({...})`.
 *
 * Comportamento preservado: sempre `POST`, erros retornam
 * `{ status: 'error', error }` em vez de lançar exceção.
 */
export const createApiInstance = (action: Action, credentials: Credentials) => {
	const headers: Record<string, string> = {};
	for (const [key, value] of Object.entries(credentials)) {
		if (typeof value === 'string') headers[key] = value;
	}

	const http = new HttpClient({
		baseURL: `${LEGACY_BASE_URL}/${action}`,
		bearerToken: credentials.BearerToken,
		deviceToken: credentials.DeviceToken,
		headers,
		retry: false,
	});

	const request = async (endpoint: string, data: Record<string, any>) => {
		try {
			return await http.post(endpoint, data);
		} catch (error) {
			const apiError = ApiBrasilError.from(error);
			return {
				status: 'error',
				error: (apiError.response as any)?.error || apiError.message,
			};
		}
	};

	return {
		request,
	};
};

/** @deprecated Prefira `new ApiBrasil({...}).whatsapp`. */
export const createWhatsAppApi = (credentials: Credentials) =>
	createApiInstance('whatsapp', credentials);

/** @deprecated Prefira `new ApiBrasil({...}).vehicles`. */
export const createVehiclesApi = (credentials: Credentials) =>
	createApiInstance('vehicles', credentials);

/** @deprecated Prefira `new ApiBrasil({...}).correios`. */
export const createCorreiosApi = (credentials: Credentials) =>
	createApiInstance('correios', credentials);

/** @deprecated Prefira `new ApiBrasil({...}).dados.cpf(...)` ou `consulta.cpf(...)`. */
export const createCpfApi = (credentials: Credentials) =>
	createApiInstance('dados/cpf', credentials);

/** @deprecated Prefira `new ApiBrasil({...}).dados.cnpj(...)` ou `consulta.cnpj(...)`. */
export const createCnpjApi = (credentials: Credentials) =>
	createApiInstance('dados/cnpj', credentials);

/** @deprecated Prefira `new ApiBrasil({...}).cep`. */
export const createCepApi = (credentials: Credentials) =>
	createApiInstance('cep', credentials);
