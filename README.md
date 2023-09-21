# SDK NODEJS - APIGratis by API BRASIL 🚀

Conjunto de API, para desenvolvedores.

_Transforme seus projetos em soluções inteligentes com nossa API. Com recursos como API do WhatsApp, geolocalização, rastreamento de encomendas, verificação de CPF/CNPJ e mais, você pode criar soluções eficientes e funcionais. Comece agora._

[![npm version](https://img.shields.io/npm/v/apigratis-sdk-nodejs.svg?color=green)](https://www.npmjs.com/package/apigratis-sdk-nodejs)
[![Average time to resolve an issue](https://isitmaintained.com/badge/resolution/APIBrasil/apigratis-sdk-node.svg)](https://isitmaintained.com/project/APIBrasil/apigratis-sdk-node 'Average time to resolve an issue')
[![Percentage of issues still open](https://isitmaintained.com/badge/open/APIBrasil/apigratis-sdk-node.svg)](https://isitmaintained.com/project/APIBrasil/apigratis-sdk-node 'Percentage of issues still open')
<a href="https://github.com/APIBrasil/apigratis-sdk-node/issues" target="_blank"><img alt="GitHub issues" src="https://img.shields.io/github/issues/APIBrasil/apigratis-sdk-node"></a>
<img alt="GitHub all releases" src="https://img.shields.io/github/downloads/APIBrasil/apigratis-sdk-node/total">
<a href="https://github.com/APIBrasil/apigratis-sdk-node/network" target="_blank"><img alt="GitHub forks" src="https://img.shields.io/github/forks/APIBrasil/apigratis-sdk-node"></a>
<a href="https://github.com/APIBrasil/apigratis-sdk-node/stargazers" target="_blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/APIBrasil/apigratis-sdk-node"></a>

## Canais de suporte (Comunidade)

[![WhatsApp Group](https://img.shields.io/badge/WhatsApp-Group-25D366?logo=whatsapp)](https://chat.whatsapp.com/KsxrUGIPWvUBYAjI1ogaGs)
[![Telegram Group](https://img.shields.io/badge/Telegram-Group-32AFED?logo=telegram)](https://t.me/apigratisoficial)

## Obtenha suas credenciais

https://apigratis.com.br

## Instalando pacote com o composer

`npm i apigratis-sdk-nodejs --save`

## Mais informações

https://www.npmjs.com/package/apigratis-sdk-nodejs

## Serviços de API disponíveis

| Up  | Services available | Description                           | Free | Beta | Stable |
| --- | ------------------ | ------------------------------------- | ---- | ---- | ------ |
| ✅  | WhatsAppService    | API do WhatsApp Gratuita.             | ✅   | ✅   | ✅     |
| ✅  | Receita Data CNPJ  | API Dados CNPJ Receita.               | ✅   | ✅   | ✅     |
| ✅  | Receita Data CPF   | API Dados de CPF Serasa.              | ✅   | ✅   | ✅     |
| ✅  | CorreiosService    | API Busca encomendas Correios Brazil. | ✅   | ✅   | ✅     |
| ✅  | CEPLocation        | API CEP Geolocation + IBGE Brazil.    | ✅   | ✅   | ✅     |
| ✅  | VehiclesService    | API Placa Dados.                      | ✅   | ✅   | ✅     |
| ✅  | FipeService        | API Placa FIPE.                       | ✅   | ✅   | ✅     |

## WhatsApp Service

Você pode encontrar todos os endpoints e bodys a serem utilizados na documentação disponível no nosso site

https://apibrasil.com.br/documentacoes

```javascript
import { createCpfApi } from 'apigratis-sdk-nodejs';

const cpfApi = createCpfApi({
	BearerToken: 'bearer_token',
	DeviceToken: 'device_token',
});

cpfApi
	.request('/', {
		cpf: '__CPF__',
	})
	.then(resp => console.log(JSON.stringify(resp, undefined, '  ')));
```

## Vehicles Service

Você pode encontrar todos os endpoints e bodys a serem utilizados na documentação disponível no nosso site

https://apibrasil.com.br/documentacoes

```javascript
import { createVehiclesApi } from 'apigratis-sdk-nodejs';

//Obtenha dados de um veículo pela placa

const vehiclesApi = createVehiclesApi({
	BearerToken: 'bearer_token',
	DeviceToken: 'device_token',
});

vehiclesApi
	.request('/dados', {
		placa: '__Placa__',
	})
	.then(resp => console.log(JSON.stringify(resp, undefined, '  ')));
```

```javascript
import { createVehiclesApi } from 'apigratis-sdk-nodejs';

//Obtenha dados de um veículo pela placa

const vehiclesApi = createVehiclesApi({
	BearerToken: 'bearer_token',
	DeviceToken: 'device_token',
});

vehiclesApi
	.request('/fipe', {
		placa: '__Placa__',
	})
	.then(resp => console.log(JSON.stringify(resp, undefined, '  ')));
```

...Em breve mais exemplos
