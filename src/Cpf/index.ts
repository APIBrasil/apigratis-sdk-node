import { createApiInstance, Credentials } from '../GeneralAPI';

export const createCpfApi = (credentials: Credentials) =>
	createApiInstance('dados/cpf', credentials);
