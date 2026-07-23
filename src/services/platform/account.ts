import { HttpClient } from '../../core/http';
import { RequestOptions } from '../../core/types';

/**
 * Conta, saldo, faturas, notificações e tickets.
 */
export class AccountService {
	constructor(private readonly http: HttpClient) {}

	/** Saldo/créditos da conta: `GET /balance`. */
	balance(options?: RequestOptions): Promise<any> {
		return this.http.get('/balance', options);
	}

	/** Plano atual: `GET /plan`. */
	plan(options?: RequestOptions): Promise<any> {
		return this.http.get('/plan', options);
	}

	/** Faturas: `GET /invoices`. */
	invoices(options?: RequestOptions): Promise<any> {
		return this.http.get('/invoices', options);
	}

	/** Notas fiscais das faturas: `GET /invoices/notes`. */
	invoiceNotes(options?: RequestOptions): Promise<any> {
		return this.http.get('/invoices/notes', options);
	}

	/** Paga uma fatura: `POST /invoices/pay`. */
	payInvoice(body: Record<string, any>, options?: RequestOptions): Promise<any> {
		return this.http.post('/invoices/pay', body, options);
	}

	/** Histórico de requisições da conta: `POST /requests`. */
	requests(body?: Record<string, any>, options?: RequestOptions): Promise<any> {
		return this.http.post('/requests', body, options);
	}

	/** Histórico de requisições por API: `POST /api/requests`. */
	apiRequests(body?: Record<string, any>, options?: RequestOptions): Promise<any> {
		return this.http.post('/api/requests', body, options);
	}

	/** Jobs em fila do usuário: `GET /jobs`. */
	jobs(options?: RequestOptions): Promise<any> {
		return this.http.get('/jobs', options);
	}

	/** Credenciais do usuário: `GET /credentials`. */
	credentials(options?: RequestOptions): Promise<any> {
		return this.http.get('/credentials', options);
	}

	/** Indicações do usuário: `GET /indications`. */
	indications(options?: RequestOptions): Promise<any> {
		return this.http.get('/indications', options);
	}

	/** Notificações: `GET /notifications`. */
	notifications(options?: RequestOptions): Promise<any> {
		return this.http.get('/notifications', options);
	}

	/** Marca uma notificação como lida: `PATCH /notifications/{id}/read`. */
	markNotificationRead(id: string | number, options?: RequestOptions): Promise<any> {
		return this.http.patch(`/notifications/${id}/read`, undefined, options);
	}

	/** Marca todas as notificações como lidas: `POST /notifications/mark-all-read`. */
	markAllNotificationsRead(options?: RequestOptions): Promise<any> {
		return this.http.post('/notifications/mark-all-read', undefined, options);
	}

	/** Tickets de suporte: `GET /tickets`. */
	tickets(options?: RequestOptions): Promise<any> {
		return this.http.get('/tickets', options);
	}

	/** Abre um ticket: `POST /ticket`. */
	createTicket(body: Record<string, any>, options?: RequestOptions): Promise<any> {
		return this.http.post('/ticket', body, options);
	}

	/** Atualiza um ticket: `PUT /ticket/{id}`. */
	updateTicket(
		id: string | number,
		body: Record<string, any>,
		options?: RequestOptions
	): Promise<any> {
		return this.http.put(`/ticket/${id}`, body, options);
	}

	/** Mensagens de um ticket: `GET /ticket/{id}/messages`. */
	ticketMessages(id: string | number, options?: RequestOptions): Promise<any> {
		return this.http.get(`/ticket/${id}/messages`, options);
	}

	/** Responde um ticket: `POST /ticket/{id}/messages`. */
	addTicketMessage(
		id: string | number,
		body: Record<string, any>,
		options?: RequestOptions
	): Promise<any> {
		return this.http.post(`/ticket/${id}/messages`, body, options);
	}
}
