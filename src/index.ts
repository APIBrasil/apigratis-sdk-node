// Cliente principal
export { ApiBrasil } from './ApiBrasil';

// Núcleo: HTTP, transporte, erros, retry, tipos
export * from './core';

// Serviços por domínio
export * from './services/messaging';
export * from './services/data';
export * from './services/platform';

// Interface legada (v0.1.x) — mantida por compatibilidade
export * from './legacy';
