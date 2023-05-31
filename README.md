# SDK JavaScript - APIGratis by API BRASIL 🚀

Conjunto de API, para desenvolvedores.

_Transforme seus projetos em soluções inteligentes com nossa API. Com recursos como  API do WhatsApp, geolocalização, rastreamento de encomendas, verificação de CPF/CNPJ e mais, você pode criar soluções eficientes e funcionais. Comece agora._

[![npm version](https://img.shields.io/npm/v/apigratis.svg?color=green)](https://www.npmjs.com/package/apigratis)
[![Average time to resolve an issue](https://isitmaintained.com/badge/resolution/jhowbhz/package-apigratis-npm.svg)](https://isitmaintained.com/project/jhowbhz/apigratis 'Average time to resolve an issue')
[![Percentage of issues still open](https://isitmaintained.com/badge/open/jhowbhz/package-apigratis-npm.svg)](https://isitmaintained.com/project/jhowbhz/package-apigratis-npm  'Percentage of issues still open')
[![release-it](https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80-release--it-e10079.svg)](https://github.com/release-it/release-it)
<a href="https://github.com/APIBrasil/apigratis-sdk-node/issues" target="_blank"><img alt="GitHub issues" src="https://img.shields.io/github/issues/jhowbhz/package-apigratis-npm"></a>
<img alt="GitHub all releases" src="https://img.shields.io/github/downloads/jhowbhz/package-apigratis-npm/total">
<a href="https://github.com/APIBrasil/apigratis-sdk-node/network" target="_blank"><img alt="GitHub forks" src="https://img.shields.io/github/forks/jhowbhz/package-apigratis-npm"></a>
<a href="https://github.com/APIBrasil/apigratis-sdk-node/stargazers" target="_blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/jhowbhz/package-apigratis-npm"></a>

## Canais de suporte (Comunidade)
[![WhatsApp Group](https://img.shields.io/badge/WhatsApp-Group-25D366?logo=whatsapp)](https://chat.whatsapp.com/KsxrUGIPWvUBYAjI1ogaGs)
[![Telegram Group](https://img.shields.io/badge/Telegram-Group-32AFED?logo=telegram)](https://t.me/apigratisoficial)

## Obtenha suas credenciais
https://apigratis.com.br

## Instalando pacote com o composer
```npm install apigratis```

## Mais informações
https://packagist.org/packages/jhowbhz/apigratis-sdk-php

## Serviços de API disponíveis

| Up  | Services available            | Description       | Free    | Beta        | Stable   |
------|-------------------------------|-------------------|---------| ------------------------- | ------------------------- |
| ✅ | WhatsAppService                | API do WhatsApp Gratuita.               |   ⌛   | ⌛                   | ⌛                   |
| ⌛ | Receita Data CNPJ              | API Dados CNPJ Receita.                 |   ⌛   | ⌛                   | ⌛                   |
| ⌛ | Receita Data CPF               | API Dados de CPF Serasa.                |   ⌛   | ⌛                   | ⌛                   |
| ⌛ | CorreiosService                | API Busca encomendas Correios Brazil.   |   ⌛   | ⌛                   | ⌛                   |
| ⌛ | CEPLocation                    | API CEP Geolocation + IBGE Brazil.      |   ⌛   | ⌛                   | ⌛                   |
| ⌛ | VehiclesService                | API Placa Dados.                        |   ⌛   | ⌛                   | ⌛                   |
| ⌛ | FipeService                    | API Placa FIPE.                         |   ⌛   | ⌛                   | ⌛                   |


## WhatsAppService - Examples usage
in developing

```javascript
// isso é apenas um rascunho, ainda nao está funcional

const APIGratis = require('apigratis');

function teste() {
    return APIGratis.WhatsApp({
        "action": "sendText",
        "credentials": {
            "SecretKey": "SEU_SECRET_KEY",
            "PublicToken": "SEU_PUBLIC_TOKEN",
            "DeviceToken": "SEU_DEVICE_TOKEN",
            "BearerToken": "SEU_BEARER_TOKEN",
        },
        "body": {
            "message": "Hello World por Python",
            "phone": "5531994359434",
            "time_typing": 1
        }
    });
}

console.log(teste);
```
