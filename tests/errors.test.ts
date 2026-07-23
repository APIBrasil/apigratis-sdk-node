import {
	ApiBrasilError,
	AuthenticationError,
	InsufficientBalanceError,
	NotFoundError,
	PermissionError,
	RateLimitError,
	ServerError,
	ValidationError,
	createApiError,
} from '../src/core/errors';

describe('createApiError', () => {
	const data = { message: 'mensagem da api', code: 'X' };

	it.each([
		[400, ValidationError],
		[422, ValidationError],
		[401, AuthenticationError],
		[402, InsufficientBalanceError],
		[403, PermissionError],
		[404, NotFoundError],
		[410, NotFoundError],
		[429, RateLimitError],
		[500, ServerError],
		[503, ServerError],
		[418, ApiBrasilError],
	])('mapeia HTTP %i para %p', (status, expected) => {
		const error = createApiError(status as number, data);
		expect(error).toBeInstanceOf(expected as any);
		expect(error.message).toBe('mensagem da api');
		expect(error.status).toBe(status);
		expect(error.code).toBe('X');
		expect(error.response).toBe(data);
	});

	it('extrai retryAfterMs do header Retry-After em segundos', () => {
		const error = createApiError(429, {}, { 'retry-after': '3' });
		expect(error).toBeInstanceOf(RateLimitError);
		expect((error as RateLimitError).retryAfterMs).toBe(3000);
	});

	it('usa mensagem padrão quando o corpo não tem message', () => {
		const error = createApiError(500, 'Internal Server Error');
		expect(error.message).toBe('A API respondeu com HTTP 500.');
	});

	it('getters de conveniência funcionam', () => {
		expect(createApiError(402, {}).isInsufficientBalance).toBe(true);
		expect(createApiError(401, {}).isUnauthorized).toBe(true);
	});
});

describe('ApiBrasilError.from', () => {
	it('mantém instâncias de ApiBrasilError', () => {
		const original = new ValidationError('inválido', { status: 422 });
		expect(ApiBrasilError.from(original)).toBe(original);
	});

	it('converte erros estilo axios usando o status', () => {
		const axiosLike = Object.assign(new Error('Request failed'), {
			isAxiosError: true,
			response: { status: 402, data: { message: 'Sem saldo' } },
		});
		const error = ApiBrasilError.from(axiosLike);
		expect(error).toBeInstanceOf(InsufficientBalanceError);
		expect(error.message).toBe('Sem saldo');
	});

	it('embrulha erros desconhecidos', () => {
		const error = ApiBrasilError.from(new Error('boom'));
		expect(error).toBeInstanceOf(ApiBrasilError);
		expect(error.message).toBe('boom');
	});
});
