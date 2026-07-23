import { RetryConfig } from './types';

export const DEFAULT_RETRY: Required<RetryConfig> = {
	retries: 2,
	minDelayMs: 300,
	maxDelayMs: 5000,
	retryOnStatuses: [429],
};

export const resolveRetry = (
	config: RetryConfig | false | undefined
): Required<RetryConfig> | undefined => {
	if (config === false) return undefined;
	return { ...DEFAULT_RETRY, ...config };
};

/** Backoff exponencial com jitter: min * 2^attempt, limitado a max. */
export const backoffDelayMs = (
	attempt: number,
	retry: Required<RetryConfig>
): number => {
	const exponential = retry.minDelayMs * 2 ** attempt;
	const jitter = 0.5 + Math.random() * 0.5;
	return Math.min(retry.maxDelayMs, Math.round(exponential * jitter));
};

export const sleep = (ms: number): Promise<void> =>
	new Promise(resolve => setTimeout(resolve, ms));
