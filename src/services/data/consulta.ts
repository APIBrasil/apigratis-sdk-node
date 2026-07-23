import { HttpClient } from '../../core/http';
import {
	ConsultaPayload,
	CreditServiceResponse,
	RequestOptions,
} from '../../core/types';
import { ConsultaServico } from '../../generated/catalog';

/**
 * Consultas por crédito (`/consulta/{servico}/credits` e afins).
 *
 * Não usam `DeviceToken` — debitam o saldo/créditos da conta.
 * O campo `tipo` do body define o produto consultado (ex: `lista-socios`,
 * `serasa-score-pf`, `spc-serasa`) — o tipo gerado `ConsultaTipo` traz o
 * autocomplete do catálogo. Use `homolog: true` para sandbox.
 */
export class ConsultaService {
	constructor(private readonly http: HttpClient) {}

	/** Consulta genérica: `POST /consulta/{service}/credits`. */
	generic<T = any>(
		service: ConsultaServico | (string & {}),
		body: ConsultaPayload = {},
		options?: RequestOptions
	): Promise<CreditServiceResponse<T>> {
		return this.http.post(`/consulta/${service}/credits`, body, options);
	}

	/** Consulta CPF: `POST /consulta/cpf/credits`. */
	cpf<T = any>(body: ConsultaPayload & { cpf: string }, options?: RequestOptions) {
		return this.generic<T>('cpf', body, options);
	}

	/** Consulta CNPJ: `POST /consulta/cnpj/credits` (ex: `tipo: 'lista-socios'`). */
	cnpj<T = any>(body: ConsultaPayload & { cnpj: string }, options?: RequestOptions) {
		return this.generic<T>('cnpj', body, options);
	}

	/** Consulta CNH: `POST /consulta/cnh/credits`. */
	cnh<T = any>(body: ConsultaPayload, options?: RequestOptions) {
		return this.generic<T>('cnh', body, options);
	}

	/** Consulta CEP: `POST /consulta/cep/credits`. */
	cep<T = any>(body: ConsultaPayload & { cep?: string }, options?: RequestOptions) {
		return this.generic<T>('cep', body, options);
	}

	/** Consulta veicular: `POST /consulta/veiculos/credits`. */
	veiculos<T = any>(
		body: ConsultaPayload & { placa?: string },
		options?: RequestOptions
	) {
		return this.generic<T>('veiculos', body, options);
	}

	/** Consulta operadora de telefone: `POST /consulta/telefone/credits`. */
	telefone<T = any>(
		body: ConsultaPayload & { telefone?: string },
		options?: RequestOptions
	) {
		return this.generic<T>('telefone', body, options);
	}

	/**
	 * Consulta veicular nas bases dedicadas:
	 * `POST /vehicles/base/000/dados` | `POST /vehicles/base/000/fipe`.
	 */
	veiculosBase<T = any>(
		base: 'dados' | 'fipe',
		body: ConsultaPayload & { placa: string },
		options?: RequestOptions
	): Promise<CreditServiceResponse<T>> {
		return this.http.post(`/vehicles/base/000/${base}`, body, options);
	}

	/** Distância entre CEPs: `POST /cep/distancia/calcular`. */
	cepDistancia<T = any>(
		body: ConsultaPayload,
		options?: RequestOptions
	): Promise<CreditServiceResponse<T>> {
		return this.http.post('/cep/distancia/calcular', body, options);
	}

	/** Proxy seller: `POST /proxy/seller/credits`. */
	proxySeller<T = any>(
		body: ConsultaPayload = {},
		options?: RequestOptions
	): Promise<CreditServiceResponse<T>> {
		return this.http.post('/proxy/seller/credits', body, options);
	}
}
