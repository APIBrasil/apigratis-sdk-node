#!/usr/bin/env node
/**
 * Gera src/generated/catalog.ts a partir do catálogo público do gateway
 * APIBrasil (`GET /api/v2/documentations`).
 *
 * Uso:
 *   npm run codegen                         # produção (gateway.apibrasil.io)
 *   APIBRASIL_BASE_URL=... npm run codegen  # outra base (ex: homolog)
 */
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE_URL =
	process.env.APIBRASIL_BASE_URL ?? 'https://gateway.apibrasil.io/api/v2';
const OUTPUT = path.join(
	path.dirname(fileURLToPath(import.meta.url)),
	'..',
	'src',
	'generated',
	'catalog.ts'
);

const quote = value =>
	`'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

const toUnion = (name, values, fallback = 'string') => {
	const sorted = [...values].sort();
	if (!sorted.length) return `export type ${name} = ${fallback};\n`;
	return `export type ${name} =\n${sorted.map(value => `\t| ${quote(value)}`).join('\n')};\n`;
};

const main = async () => {
	console.log(`Baixando catálogo de ${BASE_URL}/documentations ...`);
	const response = await fetch(`${BASE_URL}/documentations`, {
		headers: {
			Accept: 'application/json',
			'User-Agent': 'APIBRASIL/SDK-JS codegen',
		},
	});
	if (!response.ok) {
		throw new Error(`Falha ao baixar o catálogo: HTTP ${response.status}`);
	}
	const payload = await response.json();
	const documentations = payload.documentations ?? payload;
	if (!Array.isArray(documentations)) {
		throw new Error('Resposta inesperada: "documentations" não é uma lista.');
	}

	/** service → Set<actionPath> (caminho após /api/v2/{service}/) */
	const serviceActions = new Map();
	/** tipo → { service, fields } das consultas por crédito */
	const consultaTipos = new Map();
	const consultaServices = new Set();
	let endpointCount = 0;

	for (const doc of documentations) {
		for (const endpoint of doc.endpoints ?? []) {
			const url = endpoint.url ?? '';
			const match = url.match(/\/api\/v2\/(.+)$/);
			if (!match) continue;
			endpointCount += 1;

			const fullPath = match[1].replace(/^\/+|\/+$/g, '');
			const [service, ...rest] = fullPath.split('/');
			const action = rest.join('/');
			if (!service) continue;

			if (!serviceActions.has(service)) serviceActions.set(service, new Set());
			if (action) serviceActions.get(service).add(action);

			const consulta = fullPath.match(/^consulta\/([^/]+)\/credits$/);
			if (consulta) {
				consultaServices.add(consulta[1]);
				const body = endpoint.body;
				if (
					body &&
					typeof body === 'object' &&
					typeof body.tipo === 'string' &&
					body.tipo
				) {
					const fields = Object.keys(body)
						.filter(key => key !== 'tipo' && key !== 'homolog')
						.sort();
					consultaTipos.set(body.tipo, { service: consulta[1], fields });
				}
			}
		}
	}

	const whatsappActions = [...(serviceActions.get('whatsapp') ?? [])];
	const evolutionPaths = [...(serviceActions.get('evolution') ?? [])];
	const whatsmeowActions = [...(serviceActions.get('whatsmeow') ?? [])];

	const serviceActionsLiteral = [...serviceActions.entries()]
		.sort(([a], [b]) => a.localeCompare(b))
		.map(
			([service, actions]) =>
				`\t${quote(service)}: [${[...actions].sort().map(quote).join(', ')}],`
		)
		.join('\n');

	const consultaTiposLiteral = [...consultaTipos.entries()]
		.sort(([a], [b]) => a.localeCompare(b))
		.map(
			([tipo, meta]) =>
				`\t${quote(tipo)}: { service: ${quote(meta.service)}, fields: [${meta.fields
					.map(quote)
					.join(', ')}] },`
		)
		.join('\n');

	const content = `/* eslint-disable */
/**
 * ARQUIVO GERADO AUTOMATICAMENTE — não edite manualmente.
 *
 * Fonte: ${BASE_URL}/documentations
 * Regenerar: npm run codegen
 *
 * ${documentations.length} documentações, ${endpointCount} endpoints,
 * ${consultaTipos.size} tipos de consulta conhecidos.
 */

/** Actions conhecidas da API de WhatsApp (POST /whatsapp/{action}). */
${toUnion('WhatsAppAction', whatsappActions)}
/** Caminhos conhecidos da Evolution API (POST /evolution/{controller}/{action}). */
${toUnion('EvolutionPath', evolutionPaths)}
/** Actions conhecidas do WhatsMeow (POST /whatsmeow/{action}). */
${toUnion('WhatsMeowAction', whatsmeowActions)}
/** Serviços de consulta por crédito (POST /consulta/{service}/credits). */
${toUnion('ConsultaServico', consultaServices)}
/** Tipos de consulta conhecidos (campo \`tipo\` do body). */
${toUnion('ConsultaTipo', consultaTipos.keys())}
/** Metadados por tipo de consulta: serviço da rota e campos do body de exemplo. */
export const CONSULTA_TIPOS: Record<ConsultaTipo, { service: string; fields: string[] }> = {
${consultaTiposLiteral}
};

/** Actions documentadas por serviço do gateway. */
export const SERVICE_ACTIONS: Record<string, string[]> = {
${serviceActionsLiteral}
};
`;

	await mkdir(path.dirname(OUTPUT), { recursive: true });
	await writeFile(OUTPUT, content, 'utf8');
	console.log(
		`OK: ${path.relative(process.cwd(), OUTPUT)} (${documentations.length} docs, ${endpointCount} endpoints, ${consultaTipos.size} tipos)`
	);
};

main().catch(error => {
	console.error('codegen falhou:', error.message ?? error);
	process.exitCode = 1;
});
