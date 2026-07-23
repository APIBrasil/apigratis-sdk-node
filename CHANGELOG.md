# Changelog

## 1.0.0 — 2026-07-23

Reescrita completa da SDK, agora cobrindo toda a plataforma APIBrasil.

### Novidades

- **Cliente central `ApiBrasil`** com módulos por produto: `whatsapp`, `evolution`, `whatsmeow`, `sms`, `dados`, `vehicles`, `fipe`, `correios`, `cep`, `geolocation`, `geomatrix`, `recognize`, `ddd`, `holidays`, `translate`, `weather`, `loterias`, `databaseIp`, `consulta` (créditos), `ura`, `chipVirtual`, `bulk`, `auth` (login/2FA), `devices`, `catalog`, `account`, `payments` (PIX/boleto/cartão), `ipWhitelist`, `bearerRateLimit`, `reports`.
- **Zero dependências**: transporte padrão com fetch nativo; interface `Transport` plugável para axios/proxies/mocks.
- **Retry com backoff exponencial** (padrão: HTTP 429 e falhas de conexão; nunca timeouts nem erros de negócio) com suporte a `Retry-After`.
- **Hooks de observabilidade**: `onRequest`, `onResponse`, `onRetry`.
- **Hierarquia de erros**: `ValidationError`, `AuthenticationError`, `InsufficientBalanceError`, `PermissionError`, `NotFoundError`, `RateLimitError`, `ServerError`, `NetworkError`, `TimeoutError` — todas estendendo `ApiBrasilError`.
- **Variáveis de ambiente**: `APIBRASIL_BEARER_TOKEN`, `APIBRASIL_DEVICE_TOKEN`, `APIBRASIL_SECRET_KEY`, `APIBRASIL_BASE_URL` lidas automaticamente.
- **Tipos gerados do catálogo** (`npm run codegen`): autocomplete das actions de WhatsApp/Evolution/WhatsMeow e dos 210+ `tipo` de consulta.
- **Dual build ESM + CJS** com subpath exports: `apigratis-sdk-nodejs/core`, `/messaging`, `/data`, `/platform`, `/legacy`.
- **Testes** unitários (transporte fake) e de contrato opcionais (`npm run test:contract`).
- CI no GitHub Actions (Node 18/20/22), publicação com provenance e docs TypeDoc.

### Breaking changes

- Node.js **>= 18** (fetch nativo).
- `axios` não é mais dependência; o `Transport` customizado substitui interceptors.
- Imports profundos de `dist/` (ex: `apigratis-sdk-nodejs/dist/Cpf`) deixam de funcionar — use os subpath exports.
- Interface legada `createWhatsAppApi`/`createCpfApi`/etc. segue funcionando com o mesmo contrato (`{ status: 'error' }` em erros, base `cluster.apigratis.com`), agora implementada sobre o novo núcleo e marcada como deprecated.

## 0.1.7

Última versão da interface antiga (wrappers `createXxxApi` sobre axios).

## 0.1.8

Ajustes gerais
