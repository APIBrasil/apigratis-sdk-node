import { ApiBrasilConfig } from './types';

/** Variáveis de ambiente reconhecidas pela SDK. */
export const ENV_VARS = {
	bearerToken: 'APIBRASIL_BEARER_TOKEN',
	deviceToken: 'APIBRASIL_DEVICE_TOKEN',
	secretKey: 'APIBRASIL_SECRET_KEY',
	baseURL: 'APIBRASIL_BASE_URL',
} as const;

/**
 * Lê a configuração das variáveis de ambiente (quando disponíveis).
 * Valores passados explicitamente no construtor sempre têm prioridade.
 */
export const configFromEnv = (): Partial<ApiBrasilConfig> => {
	const env =
		typeof process !== 'undefined' && process.env ? process.env : undefined;
	if (!env) return {};

	const config: Partial<ApiBrasilConfig> = {};
	if (env[ENV_VARS.bearerToken]) config.bearerToken = env[ENV_VARS.bearerToken];
	if (env[ENV_VARS.deviceToken]) config.deviceToken = env[ENV_VARS.deviceToken];
	if (env[ENV_VARS.secretKey]) config.secretKey = env[ENV_VARS.secretKey];
	if (env[ENV_VARS.baseURL]) config.baseURL = env[ENV_VARS.baseURL];
	return config;
};
