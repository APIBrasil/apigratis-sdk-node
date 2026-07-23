import { HttpClient } from '../../core/http';
import { RequestOptions } from '../../core/types';

export type LoginPayload = {
	email: string;
	password: string;
	turnstile_token?: string;
	[key: string]: any;
};

export type LoginResponse = {
	/** Presente quando o login exige segundo fator. */
	requires_2fa?: boolean;
	challenge?: string;
	available_methods?: string[];
	authorization?: { token: string; type?: string; [key: string]: any };
	user?: Record<string, any>;
	[key: string]: any;
};

export type RegisterPayload = {
	first_name: string;
	email: string;
	cellphone: string;
	password: string;
	terms_accepted: boolean | number;
	ref?: string;
	origin?: string;
	[key: string]: any;
};

export type TwoFactorMethod = 'email' | 'sms' | 'whatsapp' | 'call';

/**
 * Autenticação e conta (`/auth/*`, `/profile*`, `/password/*`).
 *
 * `login()` e `verify2fa()` guardam automaticamente o Bearer Token
 * retornado no cliente, deixando as próximas chamadas autenticadas.
 */
export class AuthService {
	constructor(private readonly http: HttpClient) {}

	/**
	 * Autentica com email/senha: `POST /auth/login`.
	 * Se a conta tiver 2FA, retorna `{ requires_2fa, challenge }` —
	 * use `send2fa()` + `verify2fa()` para concluir.
	 */
	async login(body: LoginPayload, options?: RequestOptions): Promise<LoginResponse> {
		const response = await this.http.post<LoginResponse>(
			'/auth/login',
			body,
			options
		);
		if (response?.authorization?.token) {
			this.http.setBearerToken(response.authorization.token);
		}
		return response;
	}

	/** Envia o código 2FA pelo método escolhido: `POST /auth/2fa/send`. */
	send2fa(
		body: { challenge: string; method: TwoFactorMethod },
		options?: RequestOptions
	): Promise<any> {
		return this.http.post('/auth/2fa/send', body, options);
	}

	/** Conclui o login com o código 2FA: `POST /auth/login/verify-2fa`. */
	async verify2fa(
		body: { challenge: string; code: string },
		options?: RequestOptions
	): Promise<LoginResponse> {
		const response = await this.http.post<LoginResponse>(
			'/auth/login/verify-2fa',
			body,
			options
		);
		if (response?.authorization?.token) {
			this.http.setBearerToken(response.authorization.token);
		}
		return response;
	}

	/** Lista os métodos 2FA ativos da conta: `GET /auth/2fa/methods`. */
	twoFactorMethods(options?: RequestOptions): Promise<any> {
		return this.http.get('/auth/2fa/methods', options);
	}

	/** Cria uma conta: `POST /auth/register`. */
	register(body: RegisterPayload, options?: RequestOptions): Promise<any> {
		return this.http.post('/auth/register', body, options);
	}

	/** Cadastro simplificado: `POST /auth/register/simple`. */
	registerSimple(
		body: {
			email: string;
			password: string;
			password_confirmation: string;
			ref?: string;
		},
		options?: RequestOptions
	): Promise<any> {
		return this.http.post('/auth/register/simple', body, options);
	}

	/** Dispara verificação de email/celular: `POST /auth/verification/send`. */
	verificationSend(
		body: { type: 'email' | 'cellphone' },
		options?: RequestOptions
	): Promise<any> {
		return this.http.post('/auth/verification/send', body, options);
	}

	/** Confirma o código de verificação: `POST /auth/verification/verify`. */
	verificationVerify(
		body: { code: string; type: 'email' | 'cellphone' },
		options?: RequestOptions
	): Promise<any> {
		return this.http.post('/auth/verification/verify', body, options);
	}

	/** Esqueci a senha: `POST /auth/password/forgot`. */
	passwordForgot(
		body: { identifier: string; method: 'email' | 'sms' | 'whatsapp' },
		options?: RequestOptions
	): Promise<any> {
		return this.http.post('/auth/password/forgot', body, options);
	}

	/** Valida o código de recuperação: `POST /auth/password/verify-code`. */
	passwordVerifyCode(
		body: { identifier: string; code: string },
		options?: RequestOptions
	): Promise<any> {
		return this.http.post('/auth/password/verify-code', body, options);
	}

	/** Redefine a senha: `POST /auth/password/reset`. */
	passwordReset(
		body: { reset_token: string; password: string; password_confirmation: string },
		options?: RequestOptions
	): Promise<any> {
		return this.http.post('/auth/password/reset', body, options);
	}

	/** Reenvia o código de recuperação: `POST /auth/password/resend`. */
	passwordResend(
		body: { identifier: string; method: 'email' | 'sms' | 'whatsapp' },
		options?: RequestOptions
	): Promise<any> {
		return this.http.post('/auth/password/resend', body, options);
	}

	/** Troca a senha logado: `POST /password/change`. */
	changePassword(
		body: {
			current_password: string;
			password: string;
			password_confirmation: string;
		},
		options?: RequestOptions
	): Promise<any> {
		return this.http.post('/password/change', body, options);
	}

	/** Perfil completo (com estatísticas): `POST /profile`. */
	profile(options?: RequestOptions): Promise<any> {
		return this.http.post('/profile', undefined, options);
	}

	/** Perfil atual: `GET /profile/me`. */
	me(options?: RequestOptions): Promise<any> {
		return this.http.get('/profile/me', options);
	}

	/** Atualiza o perfil: `PUT /profile/me`. */
	updateMe(body: Record<string, any>, options?: RequestOptions): Promise<any> {
		return this.http.put('/profile/me', body, options);
	}

	/** Valida o token atual: `GET /auth/verify`. */
	verify(options?: RequestOptions): Promise<any> {
		return this.http.get('/auth/verify', options);
	}

	/** Renova o JWT: `POST /refresh`. */
	async refresh(options?: RequestOptions): Promise<any> {
		const response = await this.http.post<any>('/refresh', undefined, options);
		const token = response?.authorization?.token ?? response?.token;
		if (typeof token === 'string' && token) {
			this.http.setBearerToken(token);
		}
		return response;
	}

	/** Rotaciona o token: `POST /auth/token/rotate`. */
	tokenRotate(options?: RequestOptions): Promise<any> {
		return this.http.post('/auth/token/rotate', undefined, options);
	}

	/** Revoga o token atual: `POST /auth/token/revoke`. */
	tokenRevoke(options?: RequestOptions): Promise<any> {
		return this.http.post('/auth/token/revoke', undefined, options);
	}

	/** Encerra a sessão: `POST /auth/logout`. */
	async logout(options?: RequestOptions): Promise<any> {
		const response = await this.http.post('/auth/logout', undefined, options);
		this.http.setBearerToken(undefined);
		return response;
	}
}
