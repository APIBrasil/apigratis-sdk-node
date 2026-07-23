# SDK NODEJS - APIGratis by API BRASIL 🚀

SDK oficial Node.js/TypeScript da plataforma [APIBrasil](https://apibrasil.com.br) — WhatsApp, SMS, consultas de CPF/CNPJ, veículos, CEP, correios, pagamentos PIX/boleto e muito mais.

[![npm version](https://img.shields.io/npm/v/apigratis-sdk-nodejs.svg?color=green)](https://www.npmjs.com/package/apigratis-sdk-nodejs)
[![Average time to resolve an issue](https://isitmaintained.com/badge/resolution/APIBrasil/apigratis-sdk-node.svg)](https://isitmaintained.com/project/APIBrasil/apigratis-sdk-node 'Average time to resolve an issue')
[![Percentage of issues still open](https://isitmaintained.com/badge/open/APIBrasil/apigratis-sdk-node.svg)](https://isitmaintained.com/project/APIBrasil/apigratis-sdk-node 'Percentage of issues still open')
<a href="https://github.com/APIBrasil/apigratis-sdk-node/issues" target="_blank"><img alt="GitHub issues" src="https://img.shields.io/github/issues/APIBrasil/apigratis-sdk-node"></a>
<a href="https://github.com/APIBrasil/apigratis-sdk-node/network" target="_blank"><img alt="GitHub forks" src="https://img.shields.io/github/forks/APIBrasil/apigratis-sdk-node"></a>
<a href="https://github.com/APIBrasil/apigratis-sdk-node/stargazers" target="_blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/APIBrasil/apigratis-sdk-node"></a>

## Canais de suporte (Comunidade)

[![WhatsApp Group](https://img.shields.io/badge/WhatsApp-Group-25D366?logo=whatsapp)](https://chat.whatsapp.com/KsxrUGIPWvUBYAjI1ogaGs)
[![Telegram Group](https://img.shields.io/badge/Telegram-Group-32AFED?logo=telegram)](https://t.me/apigratisoficial)

## Instalação

```bash
npm install apigratis-sdk-nodejs --save
```

Requer **Node.js >= 18** (usa fetch nativo). **Zero dependências** de runtime, com builds **ESM + CJS** e tipos TypeScript inclusos. Funciona também em Bun, Deno e Cloudflare Workers.

Obtenha suas credenciais em https://apibrasil.com.br

## Começando

```typescript
import { ApiBrasil } from 'apigratis-sdk-nodejs';

const api = new ApiBrasil({
	bearerToken: process.env.APIBRASIL_BEARER_TOKEN, // JWT do login
	deviceToken: process.env.APIBRASIL_DEVICE_TOKEN, // device dos serviços device-based
});

// WhatsApp
await api.whatsapp.sendText({ number: '5511999999999', text: 'Olá! 👋' });

// Consulta CNPJ (por créditos)
const empresa = await api.consulta.cnpj({ cnpj: '00000000000000' });
console.log(empresa.data);
```

As credenciais também podem vir só do ambiente — `new ApiBrasil()` lê automaticamente `APIBRASIL_BEARER_TOKEN`, `APIBRASIL_DEVICE_TOKEN`, `APIBRASIL_SECRET_KEY` e `APIBRASIL_BASE_URL`.

Também é possível autenticar por email/senha — o token retornado fica guardado no cliente:

```typescript
const api = new ApiBrasil();
await api.auth.login({ email: 'voce@empresa.com.br', password: '******' });

// contas com 2FA:
const session = await api.auth.login({ email, password });
if (session.requires_2fa) {
	await api.auth.send2fa({ challenge: session.challenge!, method: 'email' });
	await api.auth.verify2fa({ challenge: session.challenge!, code: '000000' });
}
```

## Como a plataforma funciona

A API Brasil tem duas famílias de serviços:

| Família          | Autenticação                                   | Exemplos                                                                    |
| ---------------- | ---------------------------------------------- | --------------------------------------------------------------------------- |
| **Device-based** | `Authorization: Bearer` + header `DeviceToken` | WhatsApp, SMS, veículos, CEP, correios, DDD, feriados, tradução, clima, OCR |
| **Por créditos** | apenas `Authorization: Bearer` (debita saldo)  | `consulta.cpf`, `consulta.cnpj`, `consulta.veiculos`, Serasa, CNH, telefone |

Para os serviços device-based, crie um device com a `SecretKey` da API desejada (painel APIBrasil) e use o `device_token` retornado:

```typescript
const device = await api.devices.store(
	{ device_name: 'meu-bot', type: 'server' },
	{ secretKey: 'SUA_SECRET_KEY' }
);

api.setDeviceToken(device.device.device_token);
```

## Serviços disponíveis

| Módulo                                                       | Descrição                                                                                             |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `api.whatsapp`                                               | WhatsApp: `start`, `qrcode`, `sendText`, `sendFile`, `sendAudio`, `sendVideo`, fila (`queue`)...      |
| `api.evolution`                                              | Evolution API: `request(controller, action, body)`                                                    |
| `api.whatsmeow`                                              | WhatsMeow: `request(action, body)`                                                                    |
| `api.sms`                                                    | SMS device-based (`send`) e por créditos (`sendWithCredits`)                                          |
| `api.dados`                                                  | Dados cadastrais device-based (`cpf`, `cnpj`)                                                         |
| `api.vehicles`                                               | Veículos por placa (`dados`, `fipe`, `consultaFipe`)                                                  |
| `api.fipe`                                                   | Tabela FIPE (`request(action, body)`)                                                                 |
| `api.correios`                                               | Correios (`rastreio`, `request`)                                                                      |
| `api.cep`                                                    | CEP + geolocalização (`cep`, `request`)                                                               |
| `api.geolocation` / `api.geomatrix`                          | Geolocalização e matriz de distâncias                                                                 |
| `api.recognize`                                              | OCR / Google Vision                                                                                   |
| `api.ddd` / `api.holidays` / `api.translate` / `api.weather` | DDD, feriados, tradução, clima                                                                        |
| `api.databaseIp`                                             | GeoIP (`ip`)                                                                                          |
| `api.consulta`                                               | Consultas por créditos: `cpf`, `cnpj`, `cnh`, `cep`, `veiculos`, `telefone`, `generic(service, body)` |
| `api.ura` / `api.chipVirtual`                                | URA reversa e chip virtual                                                                            |
| `api.bulk`                                                   | Execução em lote (`direct`, `queue`)                                                                  |
| `api.auth`                                                   | Login, 2FA, cadastro, recuperação de senha, perfil                                                    |
| `api.devices`                                                | CRUD de devices                                                                                       |
| `api.catalog`                                                | Catálogo de APIs, planos, documentações, servidores                                                   |
| `api.account`                                                | Saldo, faturas, notificações, tickets                                                                 |
| `api.payments`                                               | Recargas e pagamentos PIX/boleto/cartão (Santander, Inter, Mercado Pago, Sicoob)                      |
| `api.ipWhitelist` / `api.bearerRateLimit`                    | Segurança da conta                                                                                    |
| `api.reports`                                                | Relatórios e dashboard de consumo                                                                     |

### WhatsApp

```typescript
// iniciar sessão e obter QR Code
await api.whatsapp.start({
	webhook_wh_message: 'https://seu-webhook.com/mensagens',
});
const { response } = await api.whatsapp.qrcode();
console.log(response?.qrcode); // data URI base64

// envios
await api.whatsapp.sendText({ number: '5511999999999', text: 'Olá!' });
await api.whatsapp.sendFile({
	number: '5511999999999',
	path: 'https://exemplo.com/nota.pdf',
});
await api.whatsapp.sendAudio({
	number: '5511999999999',
	path: 'https://exemplo.com/audio.mp3',
});

// qualquer action da documentação, inclusive via fila
await api.whatsapp.request('sendLocation', {
	number: '5511999999999',
	lat: -23.5,
	lng: -46.6,
});
await api.whatsapp.queue('sendText', {
	number: '5511999999999',
	text: 'assíncrono 🚀',
});
```

### Consultas por créditos

```typescript
// CPF / CNPJ
const cpf = await api.consulta.cpf({ cpf: '00000000000' });
const socios = await api.consulta.cnpj({
	cnpj: '00000000000000',
	tipo: 'lista-socios',
});

// veicular
const veiculo = await api.consulta.veiculos({ placa: 'ABC1234' });

// qualquer produto do catálogo
const score = await api.consulta.generic('serasa-score', {
	cpf: '00000000000',
	tipo: 'serasa-score-pf',
});

// homologação (sandbox, sem cobrança)
const teste = await api.consulta.cpf({ cpf: '00000000000', homolog: true });
```

### Veículos e FIPE (device-based)

```typescript
const dados = await api.vehicles.dados({ placa: 'ABC1234' });
const fipe = await api.vehicles.fipe({ placa: 'ABC1234' });
```

### SMS

```typescript
await api.sms.send({ number: '5511999999999', message: 'Seu código: 123456' });
// ou debitando créditos da conta (sem device):
await api.sms.sendWithCredits({ number: '5511999999999', message: 'Olá!' });
```

### Pagamentos e recargas

```typescript
const pix = await api.payments.pixGenerate('inter', { amount: 100 });
const status = await api.payments.pixStatus('inter', pix.txId);

const boleto = await api.payments.boletoGenerate('sicoob', { amount: 150 });
const pdf = await api.payments.boletoPdf('sicoob', boleto.id); // ArrayBuffer
```

### Múltiplos devices

```typescript
const comercial = api.withDevice('DEVICE_TOKEN_COMERCIAL');
const suporte = api.withDevice('DEVICE_TOKEN_SUPORTE');

await comercial.whatsapp.sendText({ number: '55...', text: 'Proposta enviada!' });
await suporte.whatsapp.sendText({ number: '55...', text: 'Como posso ajudar?' });
```

## Tratamento de erros

Cada categoria de falha tem a sua própria classe — todas estendem `ApiBrasilError`:

| Classe                          | Quando                                 |
| ------------------------------- | -------------------------------------- |
| `ValidationError`               | 400/422 — payload inválido             |
| `AuthenticationError`           | 401 — token ausente/expirado           |
| `InsufficientBalanceError`      | 402 — sem saldo/créditos               |
| `PermissionError`               | 403 — sem permissão (ex: exige PJ)     |
| `NotFoundError`                 | 404/410 — sem dados / rota desativada  |
| `RateLimitError`                | 429 — limite atingido (`retryAfterMs`) |
| `ServerError`                   | 5xx — erro do gateway/provedor         |
| `NetworkError` / `TimeoutError` | falha antes da resposta                |

```typescript
import { InsufficientBalanceError, RateLimitError } from 'apigratis-sdk-nodejs';

try {
	await api.consulta.cpf({ cpf: '00000000000' });
} catch (error) {
	if (error instanceof InsufficientBalanceError)
		console.log('Recarregue seus créditos');
	if (error instanceof RateLimitError)
		console.log(`Aguarde ${error.retryAfterMs}ms`);
}
```

## Retry e observabilidade

Por padrão a SDK refaz a chamada em **HTTP 429** e em **falhas de conexão** (2 tentativas extras, backoff exponencial, respeitando `Retry-After`). Timeouts e erros de negócio nunca são refeitos — evita duplicar cobranças e envios.

```typescript
const api = new ApiBrasil({
	retry: { retries: 3, minDelayMs: 500, retryOnStatuses: [429, 503] }, // ou retry: false
	hooks: {
		onRequest: ({ method, url, attempt }) =>
			console.log(`→ ${method} ${url} (#${attempt})`),
		onResponse: ({ status, durationMs }) =>
			console.log(`← ${status} em ${durationMs}ms`),
		onRetry: ({ delayMs, reason }) =>
			console.warn(`retry em ${delayMs}ms: ${reason}`),
	},
});
```

## Transporte plugável

O HTTP é feito pelo fetch nativo, mas a interface `Transport` permite trocar a camada inteira (proxy corporativo, axios, mocks de teste):

```typescript
import { ApiBrasil, Transport } from 'apigratis-sdk-nodejs';

const meuTransporte: Transport = {
	async request({ method, url, headers, body }) {
		// use o cliente HTTP que quiser e retorne { status, headers, data }
		const resp = await fetch(url, { method, headers, body, dispatcher: meuProxy });
		return { status: resp.status, headers: {}, data: await resp.json() };
	},
};

const api = new ApiBrasil({ transport: meuTransporte });
```

## Imports por domínio (tree-shaking)

Além do pacote raiz, cada domínio tem o seu subpath — útil para bundles menores:

```typescript
import { WhatsAppService } from 'apigratis-sdk-nodejs/messaging';
import { ConsultaService, CONSULTA_TIPOS } from 'apigratis-sdk-nodejs/data';
import { PaymentsService } from 'apigratis-sdk-nodejs/platform';
import { HttpClient, FetchTransport } from 'apigratis-sdk-nodejs/core';
import { createCpfApi } from 'apigratis-sdk-nodejs/legacy';
```

## Tipos gerados do catálogo

As actions de WhatsApp/Evolution/WhatsMeow e os 210+ `tipo` de consulta têm **autocomplete** gerado do catálogo real da plataforma (`npm run codegen` atualiza). O mapa `CONSULTA_TIPOS` traz o serviço e os campos de exemplo de cada tipo:

```typescript
import { CONSULTA_TIPOS } from 'apigratis-sdk-nodejs';

console.log(CONSULTA_TIPOS['lista-socios']);
// { service: 'cnpj', fields: ['cnpj'] }
```

## Endpoint sem método dedicado?

Todo o gateway fica acessível pela porta de saída genérica, já com seus headers de autenticação:

```typescript
await api.request('POST', '/consulta/cpf/credits', { cpf: '00000000000' });
await api.request('GET', '/reports/quick-stats');
```

Documentação completa dos endpoints: https://doc.apibrasil.io

## Configuração avançada

```typescript
const api = new ApiBrasil({
	bearerToken: '...', // ou APIBRASIL_BEARER_TOKEN
	deviceToken: '...', // ou APIBRASIL_DEVICE_TOKEN
	secretKey: '...', // usada em devices.store (ou APIBRASIL_SECRET_KEY)
	baseURL: 'https://gateway.apibrasil.io/api/v2', // padrão (ou APIBRASIL_BASE_URL)
	timeout: 30000,
	headers: { 'X-Custom': 'valor' }, // headers extras
	retry: { retries: 2 }, // ou false
	hooks: { onRetry: console.warn },
	transport: undefined, // Transport customizado (padrão: fetch nativo)
});
```

## Interface legada (v0.1.x)

As funções `createWhatsAppApi`, `createCpfApi`, `createCnpjApi`, `createVehiclesApi`, `createCorreiosApi` e `createCepApi` continuam funcionando exatamente como antes, mas estão **deprecadas** — prefira o cliente `ApiBrasil`.

```typescript
import { createCpfApi } from 'apigratis-sdk-nodejs';

const cpfApi = createCpfApi({
	BearerToken: 'bearer_token',
	DeviceToken: 'device_token',
});
cpfApi.request('/', { cpf: '__CPF__' }).then(resp => console.log(resp));
```