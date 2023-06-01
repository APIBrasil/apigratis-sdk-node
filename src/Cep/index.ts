import { createApiInstance, Credentials } from '../GeneralAPI';

export const createCepApi = (credentials: Credentials) =>
	createApiInstance('cep', credentials);
