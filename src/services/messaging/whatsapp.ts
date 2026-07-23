import { HttpClient } from '../../core/http';
import { DeviceServiceResponse, RequestOptions } from '../../core/types';
import { WhatsAppAction } from '../../generated/catalog';
import { DeviceProxyService } from '../deviceProxy';

export type WhatsAppStartPayload = {
	/** Webhook chamado quando o status da sessão muda. */
	webhook_wh_status?: string;
	/** Webhook chamado a cada mensagem recebida. */
	webhook_wh_message?: string;
	/** Webhook chamado quando a conexão muda. */
	webhook_wh_connect?: string;
	/** Webhook chamado quando um novo QR Code é gerado. */
	webhook_wh_qrcode?: string;
	[key: string]: any;
};

export type WhatsAppSendTextPayload = {
	/** Telefone destino (formato brasileiro, ex: `5511999999999`). */
	number: string;
	/** Texto da mensagem (máx. 5000 caracteres). */
	text: string;
	/** Tempo simulando "digitando..." em ms. */
	time_typing?: number;
	delay?: number;
	[key: string]: any;
};

export type WhatsAppSendMediaPayload = {
	number: string;
	/** URL pública do arquivo (ou base64 no caso do `sendFile64`). */
	path: string;
	caption?: string;
	time_typing?: number;
	delay?: number;
	[key: string]: any;
};

/**
 * API de WhatsApp (device-based): `POST /whatsapp/{action}`.
 * Exige `Authorization: Bearer` + `DeviceToken`.
 *
 * Além dos métodos nomeados, `request(action, body)` aceita qualquer
 * action do catálogo (autocomplete gerado) ou uma string livre.
 */
export class WhatsAppService extends DeviceProxyService<WhatsAppAction> {
	constructor(http: HttpClient) {
		super(http, 'whatsapp');
	}

	/** Inicia a sessão do device (aceita webhooks opcionais). */
	start<T = any>(body?: WhatsAppStartPayload, options?: RequestOptions) {
		return this.request<T>('start', body, options);
	}

	/** Retorna o QR Code de pareamento (`response.qrcode` em base64). */
	qrcode<T = any>(body?: Record<string, any>, options?: RequestOptions) {
		return this.request<T>('qrcode', body, options);
	}

	/** Encerra a sessão. */
	logout<T = any>(body?: Record<string, any>, options?: RequestOptions) {
		return this.request<T>('logout', body, options);
	}

	/** Fecha o navegador/sessão no servidor. */
	close<T = any>(body?: Record<string, any>, options?: RequestOptions) {
		return this.request<T>('close', body, options);
	}

	/** Apaga a sessão no servidor. */
	deleteSession<T = any>(body?: Record<string, any>, options?: RequestOptions) {
		return this.request<T>('deleteSession', body, options);
	}

	/** Envia mensagem de texto. */
	sendText<T = any>(body: WhatsAppSendTextPayload, options?: RequestOptions) {
		return this.request<T>('sendText', body, options);
	}

	/** Envia arquivo a partir de uma URL. */
	sendFile<T = any>(body: WhatsAppSendMediaPayload, options?: RequestOptions) {
		return this.request<T>('sendFile', body, options);
	}

	/** Envia arquivo em base64. */
	sendFile64<T = any>(body: WhatsAppSendMediaPayload, options?: RequestOptions) {
		return this.request<T>('sendFile64', body, options);
	}

	/** Envia áudio (URL; convertido para mp3 pelo gateway, máx. 6 min). */
	sendAudio<T = any>(body: WhatsAppSendMediaPayload, options?: RequestOptions) {
		return this.request<T>('sendAudio', body, options);
	}

	/** Envia vídeo a partir de uma URL. */
	sendVideo<T = any>(body: WhatsAppSendMediaPayload, options?: RequestOptions) {
		return this.request<T>('sendVideo', body, options);
	}

	/** Envia um link com preview. */
	sendLink<T = any>(
		body: { number: string; url?: string; text?: string; [key: string]: any },
		options?: RequestOptions
	) {
		return this.request<T>('sendLink', body, options);
	}

	/** Envia uma localização. */
	sendLocation<T = any>(
		body: {
			number: string;
			lat?: number | string;
			lng?: number | string;
			[key: string]: any;
		},
		options?: RequestOptions
	) {
		return this.request<T>('sendLocation', body, options);
	}

	/** Envia um contato. */
	sendContact<T = any>(
		body: { number: string; contact?: string; [key: string]: any },
		options?: RequestOptions
	) {
		return this.request<T>('sendContact', body, options);
	}

	/**
	 * Executa qualquer action de forma assíncrona via fila:
	 * `POST /whatsapp/{action}/queue`.
	 */
	queue<T = any>(
		action: WhatsAppAction | (string & {}),
		body?: Record<string, any>,
		options?: RequestOptions
	): Promise<DeviceServiceResponse<T>> {
		return this.http.post(`/whatsapp/${action}/queue`, body, options);
	}
}
