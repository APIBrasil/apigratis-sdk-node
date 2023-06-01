import { createApiInstance, Credentials } from '../GeneralAPI';

export const createVehiclesApi = (credentials: Credentials) =>
	createApiInstance('vehicles', credentials);
