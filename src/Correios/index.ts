import { createApiInstance, Credentials } from '../GeneralAPI';

export const createCorreiosApi = (credentials: Credentials) =>
	createApiInstance('correios', credentials);
