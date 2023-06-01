import { createApiInstance, Credentials } from '../GeneralAPI';

export const createWhatsAppApi = (credentials: Credentials) =>
	createApiInstance('whatsapp', credentials);
