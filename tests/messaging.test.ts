import { SERVICE_ACTIONS } from '../src/generated/catalog';
import { BASE, buildApi, runRouteCases } from './helpers/buildApi';

describe('WhatsApp — todos os métodos', () => {
	runRouteCases([
		{
			name: 'start → POST /whatsapp/start',
			call: api =>
				api.whatsapp.start({ webhook_wh_message: 'https://wh.example.com' }),
			path: '/whatsapp/start',
			body: { webhook_wh_message: 'https://wh.example.com' },
		},
		{
			name: 'qrcode → POST /whatsapp/qrcode',
			call: api => api.whatsapp.qrcode(),
			path: '/whatsapp/qrcode',
		},
		{
			name: 'logout → POST /whatsapp/logout',
			call: api => api.whatsapp.logout(),
			path: '/whatsapp/logout',
		},
		{
			name: 'close → POST /whatsapp/close',
			call: api => api.whatsapp.close(),
			path: '/whatsapp/close',
		},
		{
			name: 'deleteSession → POST /whatsapp/deleteSession',
			call: api => api.whatsapp.deleteSession(),
			path: '/whatsapp/deleteSession',
		},
		{
			name: 'sendText → POST /whatsapp/sendText',
			call: api => api.whatsapp.sendText({ number: '5511999999999', text: 'Olá' }),
			path: '/whatsapp/sendText',
			body: { number: '5511999999999', text: 'Olá' },
		},
		{
			name: 'sendFile → POST /whatsapp/sendFile',
			call: api =>
				api.whatsapp.sendFile({ number: '55', path: 'https://x.com/a.pdf' }),
			path: '/whatsapp/sendFile',
			body: { number: '55', path: 'https://x.com/a.pdf' },
		},
		{
			name: 'sendFile64 → POST /whatsapp/sendFile64',
			call: api => api.whatsapp.sendFile64({ number: '55', path: 'data:...' }),
			path: '/whatsapp/sendFile64',
		},
		{
			name: 'sendAudio → POST /whatsapp/sendAudio',
			call: api =>
				api.whatsapp.sendAudio({ number: '55', path: 'https://x.com/a.mp3' }),
			path: '/whatsapp/sendAudio',
		},
		{
			name: 'sendVideo → POST /whatsapp/sendVideo',
			call: api =>
				api.whatsapp.sendVideo({ number: '55', path: 'https://x.com/a.mp4' }),
			path: '/whatsapp/sendVideo',
		},
		{
			name: 'sendLink → POST /whatsapp/sendLink',
			call: api => api.whatsapp.sendLink({ number: '55', url: 'https://x.com' }),
			path: '/whatsapp/sendLink',
		},
		{
			name: 'sendLocation → POST /whatsapp/sendLocation',
			call: api =>
				api.whatsapp.sendLocation({ number: '55', lat: -23.5, lng: -46.6 }),
			path: '/whatsapp/sendLocation',
			body: { number: '55', lat: -23.5, lng: -46.6 },
		},
		{
			name: 'sendContact → POST /whatsapp/sendContact',
			call: api => api.whatsapp.sendContact({ number: '55', contact: '5511' }),
			path: '/whatsapp/sendContact',
		},
		{
			name: 'request genérico → POST /whatsapp/{action}',
			call: api => api.whatsapp.request('getAllChats', {}),
			path: '/whatsapp/getAllChats',
		},
		{
			name: 'queue → POST /whatsapp/{action}/queue',
			call: api => api.whatsapp.queue('sendText', { number: '55', text: 'fila' }),
			path: '/whatsapp/sendText/queue',
			body: { number: '55', text: 'fila' },
		},
	]);
});

describe('Evolution — todos os métodos', () => {
	runRouteCases([
		{
			name: 'request → POST /evolution/{controller}/{action}',
			call: api =>
				api.evolution.request('instance', 'create', { instanceName: 'b' }),
			path: '/evolution/instance/create',
			body: { instanceName: 'b' },
		},
		{
			name: 'call → POST /evolution/{path}',
			call: api => api.evolution.call('message/sendText', { number: '55' }),
			path: '/evolution/message/sendText',
			body: { number: '55' },
		},
		{
			name: 'queue → POST /evolution/{controller}/{action}/queue',
			call: api => api.evolution.queue('message', 'sendText', {}),
			path: '/evolution/message/sendText/queue',
		},
	]);
});

describe('WhatsMeow — todos os métodos', () => {
	runRouteCases([
		{
			name: 'request → POST /whatsmeow/{action}',
			call: api => api.whatsmeow.request('connect', {}),
			path: '/whatsmeow/connect',
		},
		{
			name: 'queue → POST /whatsmeow/{action}/queue',
			call: api => api.whatsmeow.queue('connect', {}),
			path: '/whatsmeow/connect/queue',
		},
	]);
});

describe('SMS — todos os métodos', () => {
	runRouteCases([
		{
			name: 'send → POST /sms/send',
			call: api => api.sms.send({ number: '5511999999999', message: 'oi' }),
			path: '/sms/send',
			body: { number: '5511999999999', message: 'oi' },
		},
		{
			name: 'sendWithCredits → POST /sms/send/credits',
			call: api => api.sms.sendWithCredits({ number: '55', message: 'oi' }),
			path: '/sms/send/credits',
			body: { number: '55', message: 'oi' },
		},
		{
			name: 'request genérico → POST /sms/{action}',
			call: api => api.sms.request('status', { id: 1 }),
			path: '/sms/status',
		},
	]);
});

describe('varredura do catálogo — mensageria', () => {
	it('cobre TODAS as actions documentadas do WhatsApp', async () => {
		const actions = SERVICE_ACTIONS.whatsapp ?? [];
		expect(actions.length).toBeGreaterThan(100);

		const { transport, api } = buildApi();
		for (const action of actions) {
			await api.whatsapp.request(action);
			expect(transport.last.url).toBe(`${BASE}/whatsapp/${action}`);
			expect(transport.last.method).toBe('POST');
		}
		expect(transport.calls).toHaveLength(actions.length);
	});

	it('cobre TODAS as actions documentadas do WhatsMeow', async () => {
		const actions = SERVICE_ACTIONS.whatsmeow ?? [];
		expect(actions.length).toBeGreaterThan(20);

		const { transport, api } = buildApi();
		for (const action of actions) {
			await api.whatsmeow.request(action);
			expect(transport.last.url).toBe(`${BASE}/whatsmeow/${action}`);
		}
	});

	it('cobre TODOS os caminhos documentados da Evolution', async () => {
		const paths = SERVICE_ACTIONS.evolution ?? [];
		expect(paths.length).toBeGreaterThan(40);

		const { transport, api } = buildApi();
		for (const path of paths) {
			await api.evolution.call(path);
			expect(transport.last.url).toBe(`${BASE}/evolution/${path}`);
		}
	});
});
