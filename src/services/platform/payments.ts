import { HttpClient } from '../../core/http';
import { RequestOptions } from '../../core/types';

/** Provedores de pagamento suportados pelo gateway. */
export type PaymentProvider = 'santander' | 'inter' | 'mercadopago' | 'sicoob';

export type RechargePayload = {
	/** Valor da recarga (mínimo definido pela plataforma). */
	amount: number | string;
	type?: 'pix' | 'boleto';
	[key: string]: any;
};

export type PixGeneratePayload = {
	amount?: number | string;
	value?: number | string;
	recharg?: boolean | string;
	invoice?: string | number;
	transaction_id?: string | number;
	[key: string]: any;
};

/**
 * Pagamentos e recargas (PIX, boleto e cartão) — `/recharge`,
 * `/{provider}/pix/*`, `/{provider}/boleto/*`, `/mercadopago/card/*`.
 */
export class PaymentsService {
	constructor(private readonly http: HttpClient) {}

	/** Lista as recargas: `GET /recharges`. */
	recharges(options?: RequestOptions): Promise<any> {
		return this.http.get('/recharges', options);
	}

	/** Cria uma recarga (pix|boleto): `POST /recharge`. */
	recharge(body: RechargePayload, options?: RequestOptions): Promise<any> {
		return this.http.post('/recharge', body, options);
	}

	/** Detalha uma recarga: `GET /recharge/{identifier}`. */
	rechargeShow(identifier: string, options?: RequestOptions): Promise<any> {
		return this.http.get(`/recharge/${identifier}`, options);
	}

	/** Gera uma cobrança PIX: `POST /{provider}/pix/generate`. */
	pixGenerate(
		provider: PaymentProvider,
		body: PixGeneratePayload,
		options?: RequestOptions
	): Promise<any> {
		return this.http.post(`/${provider}/pix/generate`, body, options);
	}

	/** Consulta uma cobrança PIX: `GET /{provider}/pix/{txId}`. */
	pixStatus(
		provider: PaymentProvider,
		txId: string,
		options?: RequestOptions
	): Promise<any> {
		return this.http.get(`/${provider}/pix/${txId}`, options);
	}

	/** Gera um boleto: `POST /{provider}/boleto/generate`. */
	boletoGenerate(
		provider: PaymentProvider,
		body: PixGeneratePayload,
		options?: RequestOptions
	): Promise<any> {
		return this.http.post(`/${provider}/boleto/generate`, body, options);
	}

	/** Consulta um boleto: `GET /{provider}/boleto/{id}`. */
	boletoStatus(
		provider: PaymentProvider,
		id: string,
		options?: RequestOptions
	): Promise<any> {
		return this.http.get(`/${provider}/boleto/${id}`, options);
	}

	/** Baixa o PDF de um boleto: `GET /{provider}/boleto/{id}/pdf`. */
	boletoPdf(
		provider: PaymentProvider,
		id: string,
		options?: RequestOptions
	): Promise<any> {
		return this.http.get(`/${provider}/boleto/${id}/pdf`, {
			responseType: 'arraybuffer',
			...options,
		});
	}

	/** Processa pagamento com cartão (Mercado Pago): `POST /mercadopago/card/process`. */
	cardProcess(body: Record<string, any>, options?: RequestOptions): Promise<any> {
		return this.http.post('/mercadopago/card/process', body, options);
	}

	/** Consulta parcelas do cartão: `POST /mercadopago/card/installments`. */
	cardInstallments(
		body: Record<string, any>,
		options?: RequestOptions
	): Promise<any> {
		return this.http.post('/mercadopago/card/installments', body, options);
	}

	/** Consulta um pagamento de cartão: `GET /mercadopago/card/{id}`. */
	cardStatus(id: string, options?: RequestOptions): Promise<any> {
		return this.http.get(`/mercadopago/card/${id}`, options);
	}

	/** Métodos de pagamento do checkout: `GET /checkout/payment-methods`. */
	checkoutPaymentMethods(options?: RequestOptions): Promise<any> {
		return this.http.get('/checkout/payment-methods', options);
	}

	/** Períodos do checkout: `GET /checkout/periods`. */
	checkoutPeriods(options?: RequestOptions): Promise<any> {
		return this.http.get('/checkout/periods', options);
	}

	/** Valida um cupom: `POST /checkout/validate-coupon`. */
	validateCoupon(body: Record<string, any>, options?: RequestOptions): Promise<any> {
		return this.http.post('/checkout/validate-coupon', body, options);
	}

	/** Finaliza o checkout: `POST /checkout/finalize`. */
	checkoutFinalize(
		body: Record<string, any>,
		options?: RequestOptions
	): Promise<any> {
		return this.http.post('/checkout/finalize', body, options);
	}
}
