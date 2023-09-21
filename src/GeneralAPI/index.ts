import axios, { isAxiosError } from 'axios';

export type Credentials = {
	SecretKey: string;
	PublicToken: string;
	DeviceToken: string;
	BearerToken: string;
};

export type Action =
	| `whatsapp`
	| 'vehicles'
	| 'correios'
	| 'dados/cpf'
	| 'dados/cnpj'
	| 'cep';

export const createApiInstance = (action: Action, credentials: Credentials) => {
	const axiosInstance = axios.create({
		baseURL: `https://cluster.apigratis.com/api/v2/${action}`,
		headers: {
			...credentials,
			Authorization: `Bearer ${credentials.BearerToken}`,
			'User-Agent': 'APIBRASIL/SDK-JS',
		},
	});

	axios.interceptors.request.use(config => {
		console.log(config.url);
		return config;
	});

	const request = async (endpoint: string, data: Record<string, any>) => {
		try {
			const resp = await axiosInstance.post(endpoint, data).then(resp => resp.data);
			return resp;
		} catch (e) {
			console.log(e);
			if (!isAxiosError(e)) {
				return {
					status: 'error',
					error: e,
				};
			}
			return {
				status: 'error',
				error: e?.response?.data?.error || e.message,
			};
		}
	};

	return {
		request,
	};
};
