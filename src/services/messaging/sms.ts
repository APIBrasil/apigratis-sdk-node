import { HttpClient } from '../../core/http';
import { CreditServiceResponse, RequestOptions } from '../../core/types';
import { DeviceProxyService } from '../deviceProxy';

export type SmsSendPayload = {
	/** Telefone destino (formato brasileiro). */
	number: string;
	/** Texto da mensagem. */
	message: string;
	/** Operadora (padrão do gateway: `claro`). */
	operator?: string;
	/** Permite resposta do destinatário. */
	user_reply?: boolean;
	/** Webhook para eventos de entrega/resposta. */
	webhook_url?: string;
	[key: string]: any;
};

/**
 * API de SMS (device-based): `POST /sms/{action}`.
 * Exige `Authorization: Bearer` + `DeviceToken`.
 */
export class SmsService extends DeviceProxyService {
	constructor(http: HttpClient) {
		super(http, 'sms');
	}

	/** Envia um SMS pelo device: `POST /sms/send`. */
	send<T = any>(body: SmsSendPayload, options?: RequestOptions) {
		return this.request<T>('send', body, options);
	}

	/**
	 * Envia um SMS debitando créditos da conta (sem DeviceToken):
	 * `POST /sms/send/credits`.
	 */
	sendWithCredits<T = any>(
		body: SmsSendPayload,
		options?: RequestOptions
	): Promise<CreditServiceResponse<T>> {
		return this.http.post('/sms/send/credits', body, options);
	}
}
