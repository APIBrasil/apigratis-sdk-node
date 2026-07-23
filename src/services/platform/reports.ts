import { HttpClient } from '../../core/http';
import { RequestOptions } from '../../core/types';

/**
 * Relatórios e dashboard de consumo (`/reports/*`, `/dashboard/stats`).
 */
export class ReportsService {
	constructor(private readonly http: HttpClient) {}

	/** Estatísticas do dashboard: `GET /dashboard/stats`. */
	dashboardStats(options?: RequestOptions): Promise<any> {
		return this.http.get('/dashboard/stats', options);
	}

	/** Consumo: `GET /reports/consumption`. */
	consumption(options?: RequestOptions): Promise<any> {
		return this.http.get('/reports/consumption', options);
	}

	/** Gera relatório de consumo: `POST /reports/generate-consumption-report`. */
	generateConsumptionReport(
		body?: Record<string, any>,
		options?: RequestOptions
	): Promise<any> {
		return this.http.post('/reports/generate-consumption-report', body, options);
	}

	/** Extrato: `GET /reports/extract`. */
	extract(options?: RequestOptions): Promise<any> {
		return this.http.get('/reports/extract', options);
	}

	/** Dashboard de relatórios: `GET /reports/dashboard`. */
	dashboard(options?: RequestOptions): Promise<any> {
		return this.http.get('/reports/dashboard', options);
	}

	/** Resumo: `GET /reports/summary`. */
	summary(options?: RequestOptions): Promise<any> {
		return this.http.get('/reports/summary', options);
	}

	/** Uso diário: `GET /reports/daily-usage`. */
	dailyUsage(options?: RequestOptions): Promise<any> {
		return this.http.get('/reports/daily-usage', options);
	}

	/** Resumo mensal: `GET /reports/monthly-summary`. */
	monthlySummary(options?: RequestOptions): Promise<any> {
		return this.http.get('/reports/monthly-summary', options);
	}

	/** Análise de erros: `GET /reports/error-analysis`. */
	errorAnalysis(options?: RequestOptions): Promise<any> {
		return this.http.get('/reports/error-analysis', options);
	}

	/** Análise por device: `GET /reports/device-analysis`. */
	deviceAnalysis(options?: RequestOptions): Promise<any> {
		return this.http.get('/reports/device-analysis', options);
	}

	/** Requisições recentes: `GET /reports/recent-requests`. */
	recentRequests(options?: RequestOptions): Promise<any> {
		return this.http.get('/reports/recent-requests', options);
	}

	/** Estatísticas rápidas: `GET /reports/quick-stats`. */
	quickStats(options?: RequestOptions): Promise<any> {
		return this.http.get('/reports/quick-stats', options);
	}
}
