import { createApiInstance, Credentials } from '../GeneralAPI';

export const createCnpjApi = (credentials: Credentials) =>
	createApiInstance('dados/cnpj', credentials);
