import { PaymentProvider } from '../src/services/platform/payments';
import { BASE, buildApi, runRouteCases } from './helpers/buildApi';
import { ok } from './helpers/fakeTransport';

describe('Auth — todos os métodos', () => {
	runRouteCases([
		{
			name: 'login → POST /auth/login',
			call: api => api.auth.login({ email: 'a@b.c', password: 'x' }),
			path: '/auth/login',
			body: { email: 'a@b.c', password: 'x' },
		},
		{
			name: 'send2fa → POST /auth/2fa/send',
			call: api => api.auth.send2fa({ challenge: 'ch', method: 'email' }),
			path: '/auth/2fa/send',
			body: { challenge: 'ch', method: 'email' },
		},
		{
			name: 'verify2fa → POST /auth/login/verify-2fa',
			call: api => api.auth.verify2fa({ challenge: 'ch', code: '000000' }),
			path: '/auth/login/verify-2fa',
		},
		{
			name: 'twoFactorMethods → GET /auth/2fa/methods',
			call: api => api.auth.twoFactorMethods(),
			method: 'GET',
			path: '/auth/2fa/methods',
		},
		{
			name: 'register → POST /auth/register',
			call: api =>
				api.auth.register({
					first_name: 'Fulano',
					email: 'a@b.c',
					cellphone: '11999999999',
					password: 'x',
					terms_accepted: true,
				}),
			path: '/auth/register',
		},
		{
			name: 'registerSimple → POST /auth/register/simple',
			call: api =>
				api.auth.registerSimple({
					email: 'a@b.c',
					password: 'x',
					password_confirmation: 'x',
				}),
			path: '/auth/register/simple',
		},
		{
			name: 'verificationSend → POST /auth/verification/send',
			call: api => api.auth.verificationSend({ type: 'email' }),
			path: '/auth/verification/send',
			body: { type: 'email' },
		},
		{
			name: 'verificationVerify → POST /auth/verification/verify',
			call: api => api.auth.verificationVerify({ code: '123456', type: 'email' }),
			path: '/auth/verification/verify',
		},
		{
			name: 'passwordForgot → POST /auth/password/forgot',
			call: api => api.auth.passwordForgot({ identifier: 'a@b.c', method: 'email' }),
			path: '/auth/password/forgot',
		},
		{
			name: 'passwordVerifyCode → POST /auth/password/verify-code',
			call: api =>
				api.auth.passwordVerifyCode({ identifier: 'a@b.c', code: '123456' }),
			path: '/auth/password/verify-code',
		},
		{
			name: 'passwordReset → POST /auth/password/reset',
			call: api =>
				api.auth.passwordReset({
					reset_token: 't',
					password: 'x',
					password_confirmation: 'x',
				}),
			path: '/auth/password/reset',
		},
		{
			name: 'passwordResend → POST /auth/password/resend',
			call: api => api.auth.passwordResend({ identifier: 'a@b.c', method: 'sms' }),
			path: '/auth/password/resend',
		},
		{
			name: 'changePassword → POST /password/change',
			call: api =>
				api.auth.changePassword({
					current_password: 'a',
					password: 'b',
					password_confirmation: 'b',
				}),
			path: '/password/change',
		},
		{
			name: 'profile → POST /profile',
			call: api => api.auth.profile(),
			path: '/profile',
		},
		{
			name: 'me → GET /profile/me',
			call: api => api.auth.me(),
			method: 'GET',
			path: '/profile/me',
		},
		{
			name: 'updateMe → PUT /profile/me',
			call: api => api.auth.updateMe({ first_name: 'Novo' }),
			method: 'PUT',
			path: '/profile/me',
			body: { first_name: 'Novo' },
		},
		{
			name: 'verify → GET /auth/verify',
			call: api => api.auth.verify(),
			method: 'GET',
			path: '/auth/verify',
		},
		{
			name: 'refresh → POST /refresh',
			call: api => api.auth.refresh(),
			path: '/refresh',
		},
		{
			name: 'tokenRotate → POST /auth/token/rotate',
			call: api => api.auth.tokenRotate(),
			path: '/auth/token/rotate',
		},
		{
			name: 'tokenRevoke → POST /auth/token/revoke',
			call: api => api.auth.tokenRevoke(),
			path: '/auth/token/revoke',
		},
		{
			name: 'logout → POST /auth/logout',
			call: api => api.auth.logout(),
			path: '/auth/logout',
		},
	]);

	it('refresh guarda o novo token retornado', async () => {
		const { transport, api } = buildApi();
		transport.respondWith(ok({ authorization: { token: 'jwt-refresh' } }));

		await api.auth.refresh();
		await api.account.balance();
		expect(transport.last.headers.Authorization).toBe('Bearer jwt-refresh');
	});

	it('logout limpa o Bearer Token do cliente', async () => {
		const { transport, api } = buildApi();
		await api.auth.logout();
		await api.catalog.plans();
		expect(transport.last.headers.Authorization).toBeUndefined();
	});
});

describe('Devices — todos os métodos', () => {
	runRouteCases([
		{
			name: 'list → GET /devices',
			call: api => api.devices.list(),
			method: 'GET',
			path: '/devices',
		},
		{
			name: 'list paginado → GET /devices?paginate=true',
			call: api => api.devices.list({ paginate: true }),
			method: 'GET',
			path: '/devices?paginate=true',
		},
		{
			name: 'store → POST /devices/store',
			call: api => api.devices.store({ device_name: 'bot', type: 'server' }),
			path: '/devices/store',
			body: { device_name: 'bot', type: 'server' },
		},
		{
			name: 'show → GET /devices/show?search={device}',
			call: api => api.devices.show(),
			method: 'GET',
			path: '/devices/show?search=dev',
		},
		{
			name: 'show explícito → GET /devices/show?search=outro',
			call: api => api.devices.show('outro'),
			method: 'GET',
			path: '/devices/show?search=outro',
		},
		{
			name: 'update → POST /devices/update',
			call: api => api.devices.update({ device_token: 'dev', device_name: 'novo' }),
			path: '/devices/update',
		},
		{
			name: 'destroy → DELETE /devices/destroy',
			call: api => api.devices.destroy(),
			method: 'DELETE',
			path: '/devices/destroy',
			body: { search: 'dev' },
		},
		{
			name: 'requests → POST /devices/requests',
			call: api => api.devices.requests({ page: 1 }),
			path: '/devices/requests',
		},
	]);

	it('store envia o header SecretKey (explícito e da config)', async () => {
		const explicit = buildApi();
		await explicit.api.devices.store({ device_name: 'bot' }, { secretKey: 'sk-1' });
		expect(explicit.transport.last.headers.SecretKey).toBe('sk-1');

		const fromConfig = buildApi({ secretKey: 'sk-config' });
		await fromConfig.api.devices.store({ device_name: 'bot' });
		expect(fromConfig.transport.last.headers.SecretKey).toBe('sk-config');
	});
});

describe('Account — todos os métodos', () => {
	runRouteCases([
		{
			name: 'balance → GET /balance',
			call: api => api.account.balance(),
			method: 'GET',
			path: '/balance',
		},
		{
			name: 'plan → GET /plan',
			call: api => api.account.plan(),
			method: 'GET',
			path: '/plan',
		},
		{
			name: 'invoices → GET /invoices',
			call: api => api.account.invoices(),
			method: 'GET',
			path: '/invoices',
		},
		{
			name: 'invoiceNotes → GET /invoices/notes',
			call: api => api.account.invoiceNotes(),
			method: 'GET',
			path: '/invoices/notes',
		},
		{
			name: 'payInvoice → POST /invoices/pay',
			call: api => api.account.payInvoice({ invoice: 9 }),
			path: '/invoices/pay',
			body: { invoice: 9 },
		},
		{
			name: 'requests → POST /requests',
			call: api => api.account.requests({ page: 1 }),
			path: '/requests',
		},
		{
			name: 'apiRequests → POST /api/requests',
			call: api => api.account.apiRequests(),
			path: '/api/requests',
		},
		{
			name: 'jobs → GET /jobs',
			call: api => api.account.jobs(),
			method: 'GET',
			path: '/jobs',
		},
		{
			name: 'credentials → GET /credentials',
			call: api => api.account.credentials(),
			method: 'GET',
			path: '/credentials',
		},
		{
			name: 'indications → GET /indications',
			call: api => api.account.indications(),
			method: 'GET',
			path: '/indications',
		},
		{
			name: 'notifications → GET /notifications',
			call: api => api.account.notifications(),
			method: 'GET',
			path: '/notifications',
		},
		{
			name: 'markNotificationRead → PATCH /notifications/{id}/read',
			call: api => api.account.markNotificationRead(9),
			method: 'PATCH',
			path: '/notifications/9/read',
		},
		{
			name: 'markAllNotificationsRead → POST /notifications/mark-all-read',
			call: api => api.account.markAllNotificationsRead(),
			path: '/notifications/mark-all-read',
		},
		{
			name: 'tickets → GET /tickets',
			call: api => api.account.tickets(),
			method: 'GET',
			path: '/tickets',
		},
		{
			name: 'createTicket → POST /ticket',
			call: api => api.account.createTicket({ subject: 'Ajuda' }),
			path: '/ticket',
		},
		{
			name: 'updateTicket → PUT /ticket/{id}',
			call: api => api.account.updateTicket(7, { status: 'closed' }),
			method: 'PUT',
			path: '/ticket/7',
		},
		{
			name: 'ticketMessages → GET /ticket/{id}/messages',
			call: api => api.account.ticketMessages(7),
			method: 'GET',
			path: '/ticket/7/messages',
		},
		{
			name: 'addTicketMessage → POST /ticket/{id}/messages',
			call: api => api.account.addTicketMessage(7, { message: 'oi' }),
			path: '/ticket/7/messages',
		},
	]);
});

describe('Payments — todos os métodos', () => {
	runRouteCases([
		{
			name: 'recharges → GET /recharges',
			call: api => api.payments.recharges(),
			method: 'GET',
			path: '/recharges',
		},
		{
			name: 'recharge → POST /recharge',
			call: api => api.payments.recharge({ amount: 100, type: 'pix' }),
			path: '/recharge',
			body: { amount: 100, type: 'pix' },
		},
		{
			name: 'rechargeShow → GET /recharge/{id}',
			call: api => api.payments.rechargeShow('rec-1'),
			method: 'GET',
			path: '/recharge/rec-1',
		},
		{
			name: 'cardProcess → POST /mercadopago/card/process',
			call: api => api.payments.cardProcess({ token: 'tok' }),
			path: '/mercadopago/card/process',
		},
		{
			name: 'cardInstallments → POST /mercadopago/card/installments',
			call: api => api.payments.cardInstallments({ amount: 100 }),
			path: '/mercadopago/card/installments',
		},
		{
			name: 'cardStatus → GET /mercadopago/card/{id}',
			call: api => api.payments.cardStatus('pay-1'),
			method: 'GET',
			path: '/mercadopago/card/pay-1',
		},
		{
			name: 'checkoutPaymentMethods → GET /checkout/payment-methods',
			call: api => api.payments.checkoutPaymentMethods(),
			method: 'GET',
			path: '/checkout/payment-methods',
		},
		{
			name: 'checkoutPeriods → GET /checkout/periods',
			call: api => api.payments.checkoutPeriods(),
			method: 'GET',
			path: '/checkout/periods',
		},
		{
			name: 'validateCoupon → POST /checkout/validate-coupon',
			call: api => api.payments.validateCoupon({ coupon: 'DEV10' }),
			path: '/checkout/validate-coupon',
		},
		{
			name: 'checkoutFinalize → POST /checkout/finalize',
			call: api => api.payments.checkoutFinalize({ plan: 1 }),
			path: '/checkout/finalize',
		},
	]);

	const providers: PaymentProvider[] = [
		'santander',
		'inter',
		'mercadopago',
		'sicoob',
	];

	describe.each(providers)('provedor %s', provider => {
		it(`pixGenerate → POST /${provider}/pix/generate`, async () => {
			const { transport, api } = buildApi();
			await api.payments.pixGenerate(provider, { amount: 100 });
			expect(transport.last.url).toBe(`${BASE}/${provider}/pix/generate`);
			expect(transport.lastBody).toEqual({ amount: 100 });
		});

		it(`pixStatus → GET /${provider}/pix/{txId}`, async () => {
			const { transport, api } = buildApi();
			await api.payments.pixStatus(provider, 'tx-1');
			expect(transport.last.method).toBe('GET');
			expect(transport.last.url).toBe(`${BASE}/${provider}/pix/tx-1`);
		});

		it(`boletoGenerate → POST /${provider}/boleto/generate`, async () => {
			const { transport, api } = buildApi();
			await api.payments.boletoGenerate(provider, { amount: 150 });
			expect(transport.last.url).toBe(`${BASE}/${provider}/boleto/generate`);
		});

		it(`boletoStatus → GET /${provider}/boleto/{id}`, async () => {
			const { transport, api } = buildApi();
			await api.payments.boletoStatus(provider, 'b-1');
			expect(transport.last.method).toBe('GET');
			expect(transport.last.url).toBe(`${BASE}/${provider}/boleto/b-1`);
		});

		it(`boletoPdf → GET /${provider}/boleto/{id}/pdf (arraybuffer)`, async () => {
			const { transport, api } = buildApi();
			await api.payments.boletoPdf(provider, 'b-1');
			expect(transport.last.url).toBe(`${BASE}/${provider}/boleto/b-1/pdf`);
			expect(transport.last.responseType).toBe('arraybuffer');
		});
	});
});

describe('Catalog — todos os métodos', () => {
	runRouteCases([
		{
			name: 'apis → GET /apis',
			call: api => api.catalog.apis(),
			method: 'GET',
			path: '/apis',
		},
		{
			name: 'apis com busca → GET /apis?search=x',
			call: api => api.catalog.apis('whatsapp'),
			method: 'GET',
			path: '/apis?search=whatsapp',
		},
		{
			name: 'api → GET /apis/{identifier}',
			call: api => api.catalog.api('42'),
			method: 'GET',
			path: '/apis/42',
		},
		{
			name: 'apiByName → GET /apis/name/{name}',
			call: api => api.catalog.apiByName('whatsapp-wpp'),
			method: 'GET',
			path: '/apis/name/whatsapp-wpp',
		},
		{
			name: 'apiCategories → GET /apis/categories',
			call: api => api.catalog.apiCategories(),
			method: 'GET',
			path: '/apis/categories',
		},
		{
			name: 'myApis → GET /apis/list',
			call: api => api.catalog.myApis(),
			method: 'GET',
			path: '/apis/list',
		},
		{
			name: 'apisByDevice → GET /apis/device/{token}',
			call: api => api.catalog.apisByDevice('dev-1'),
			method: 'GET',
			path: '/apis/device/dev-1',
		},
		{
			name: 'plans → GET /plans',
			call: api => api.catalog.plans(),
			method: 'GET',
			path: '/plans',
		},
		{
			name: 'documentations → GET /documentations',
			call: api => api.catalog.documentations(),
			method: 'GET',
			path: '/documentations',
		},
		{
			name: 'documentationsByServer → GET /documentations/server/{s}',
			call: api => api.catalog.documentationsByServer('srv-1'),
			method: 'GET',
			path: '/documentations/server/srv-1',
		},
		{
			name: 'servers → GET /servers',
			call: api => api.catalog.servers(),
			method: 'GET',
			path: '/servers',
		},
		{
			name: 'endpointUrl → POST /endpoint/url',
			call: api => api.catalog.endpointUrl({ action: 'sendText' }),
			path: '/endpoint/url',
		},
		{
			name: 'endpointBody → POST /endpoint/body',
			call: api => api.catalog.endpointBody({ action: 'sendText' }),
			path: '/endpoint/body',
		},
		{
			name: 'status → GET /status',
			call: api => api.catalog.status(),
			method: 'GET',
			path: '/status',
		},
	]);
});

describe('IP Whitelist e Bearer Rate Limit — todos os métodos', () => {
	runRouteCases([
		{
			name: 'ipWhitelist.get → GET /ip-whitelist',
			call: api => api.ipWhitelist.get(),
			method: 'GET',
			path: '/ip-whitelist',
		},
		{
			name: 'ipWhitelist.set → PUT /ip-whitelist',
			call: api => api.ipWhitelist.set(['1.2.3.4']),
			method: 'PUT',
			path: '/ip-whitelist',
			body: { ip_whitelist: ['1.2.3.4'] },
		},
		{
			name: 'ipWhitelist.add → POST /ip-whitelist/add',
			call: api => api.ipWhitelist.add('1.2.3.4'),
			path: '/ip-whitelist/add',
			body: { entry: '1.2.3.4' },
		},
		{
			name: 'ipWhitelist.remove → DELETE /ip-whitelist/remove',
			call: api => api.ipWhitelist.remove('1.2.3.4'),
			method: 'DELETE',
			path: '/ip-whitelist/remove',
			body: { entry: '1.2.3.4' },
		},
		{
			name: 'ipWhitelist.addCurrent → POST /ip-whitelist/add-current',
			call: api => api.ipWhitelist.addCurrent(),
			path: '/ip-whitelist/add-current',
		},
		{
			name: 'ipWhitelist.reset → POST /ip-whitelist/reset',
			call: api => api.ipWhitelist.reset(),
			path: '/ip-whitelist/reset',
		},
		{
			name: 'ipWhitelist.validate → POST /ip-whitelist/validate',
			call: api => api.ipWhitelist.validate('10.0.0.0/8'),
			path: '/ip-whitelist/validate',
			body: { entry: '10.0.0.0/8' },
		},
		{
			name: 'ipWhitelist.currentIp → GET /ip-whitelist/current-ip',
			call: api => api.ipWhitelist.currentIp(),
			method: 'GET',
			path: '/ip-whitelist/current-ip',
		},
		{
			name: 'bearerRateLimit.get → GET /bearer-rate-limit',
			call: api => api.bearerRateLimit.get(),
			method: 'GET',
			path: '/bearer-rate-limit',
		},
		{
			name: 'bearerRateLimit.set → PUT /bearer-rate-limit',
			call: api => api.bearerRateLimit.set({ limit: 120 }),
			method: 'PUT',
			path: '/bearer-rate-limit',
			body: { limit: 120 },
		},
	]);
});

describe('Reports — todos os métodos', () => {
	runRouteCases([
		{
			name: 'dashboardStats → GET /dashboard/stats',
			call: api => api.reports.dashboardStats(),
			method: 'GET',
			path: '/dashboard/stats',
		},
		{
			name: 'consumption → GET /reports/consumption',
			call: api => api.reports.consumption(),
			method: 'GET',
			path: '/reports/consumption',
		},
		{
			name: 'generateConsumptionReport → POST /reports/generate-consumption-report',
			call: api => api.reports.generateConsumptionReport({ month: '2026-07' }),
			path: '/reports/generate-consumption-report',
		},
		{
			name: 'extract → GET /reports/extract',
			call: api => api.reports.extract(),
			method: 'GET',
			path: '/reports/extract',
		},
		{
			name: 'dashboard → GET /reports/dashboard',
			call: api => api.reports.dashboard(),
			method: 'GET',
			path: '/reports/dashboard',
		},
		{
			name: 'summary → GET /reports/summary',
			call: api => api.reports.summary(),
			method: 'GET',
			path: '/reports/summary',
		},
		{
			name: 'dailyUsage → GET /reports/daily-usage',
			call: api => api.reports.dailyUsage(),
			method: 'GET',
			path: '/reports/daily-usage',
		},
		{
			name: 'monthlySummary → GET /reports/monthly-summary',
			call: api => api.reports.monthlySummary(),
			method: 'GET',
			path: '/reports/monthly-summary',
		},
		{
			name: 'errorAnalysis → GET /reports/error-analysis',
			call: api => api.reports.errorAnalysis(),
			method: 'GET',
			path: '/reports/error-analysis',
		},
		{
			name: 'deviceAnalysis → GET /reports/device-analysis',
			call: api => api.reports.deviceAnalysis(),
			method: 'GET',
			path: '/reports/device-analysis',
		},
		{
			name: 'recentRequests → GET /reports/recent-requests',
			call: api => api.reports.recentRequests(),
			method: 'GET',
			path: '/reports/recent-requests',
		},
		{
			name: 'quickStats → GET /reports/quick-stats',
			call: api => api.reports.quickStats(),
			method: 'GET',
			path: '/reports/quick-stats',
		},
	]);
});
