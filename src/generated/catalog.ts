/* eslint-disable */
/**
 * ARQUIVO GERADO AUTOMATICAMENTE — não edite manualmente.
 *
 * Fonte: https://gateway.apibrasil.io/api/v2/documentations
 * Regenerar: npm run codegen
 *
 * 242 documentações, 549 endpoints,
 * 210 tipos de consulta conhecidos.
 */

/** Actions conhecidas da API de WhatsApp (POST /whatsapp/{action}). */
export type WhatsAppAction =
	| 'addParticipant'
	| 'addSubgroupsCommunity'
	| 'approveGroupMembershipRequest'
	| 'archiveChat'
	| 'blockContact'
	| 'checkNumberStatus'
	| 'clearChat'
	| 'close'
	| 'closeChat'
	| 'createCommunity'
	| 'createGroup'
	| 'deactivateCommunity'
	| 'deleteChat'
	| 'deleteMessage'
	| 'deleteSession'
	| 'demoteCommunityParticipant'
	| 'demoteParticipant'
	| 'downloadMediaByMessage'
	| 'fila'
	| 'forwardMessages'
	| 'getAllBroadcastList'
	| 'getAllChats'
	| 'getAllChatsWithMessages'
	| 'getAllContacts'
	| 'getAllGroups'
	| 'getAllGroupsFull'
	| 'getAllLabels'
	| 'getAllNewMessages'
	| 'getAutoDownloadSettings'
	| 'getBatteryLevel'
	| 'getBlockList'
	| 'getChat'
	| 'getCommonGroups'
	| 'getCommunityParticipants'
	| 'getConnectionState'
	| 'getConnectionStatus'
	| 'getGroupAdmins'
	| 'getGroupInfoFromInviteLink'
	| 'getGroupInviteLink'
	| 'getGroupMembers'
	| 'getGroupMembersIds'
	| 'getGroupMembershipRequests'
	| 'getGroupSizeLimit'
	| 'getMessagesChat'
	| 'getMessagesFromRowId'
	| 'getNumberProfile'
	| 'getPhoneNumberByLid'
	| 'getPlatformFromMessage'
	| 'getProducts'
	| 'getProfilePic'
	| 'getReactions'
	| 'getStatus'
	| 'getUnreadMessages'
	| 'getWid'
	| 'isAuthenticated'
	| 'isConnected'
	| 'isLoggedIn'
	| 'isMultiDevice'
	| 'joinGroup'
	| 'joinWebBeta'
	| 'leaveGroup'
	| 'loadEarlierMessages'
	| 'logout'
	| 'markPlayed'
	| 'openChat'
	| 'promoteCommunityParticipant'
	| 'promoteParticipant'
	| 'qrcode'
	| 'removeGroupIcon'
	| 'removeParticipant'
	| 'removeSubgroupsCommunity'
	| 'reply'
	| 'restartSession'
	| 'sendAudio'
	| 'sendAudio64'
	| 'sendButtons'
	| 'sendContact'
	| 'sendContactVcardList'
	| 'sendFile'
	| 'sendFile/queue'
	| 'sendFile64'
	| 'sendGif'
	| 'sendImageToStorie'
	| 'sendLink'
	| 'sendList'
	| 'sendLocation'
	| 'sendMentioned'
	| 'sendMessageWithThumb'
	| 'sendOrderMessage'
	| 'sendOrderMessage/queue'
	| 'sendPixKey'
	| 'sendPollMessage'
	| 'sendReadStatus'
	| 'sendSticker'
	| 'sendText'
	| 'sendText/queue'
	| 'sendTextToStorie'
	| 'sendVideo'
	| 'sendVideo/queue'
	| 'sendVideoAsGif'
	| 'sendVideoToStorie'
	| 'setAutoDownloadSettings'
	| 'setGroupDescription'
	| 'setGroupPic'
	| 'setGroupProperty'
	| 'setGroupSubject'
	| 'setMessagesAdminsOnly'
	| 'setProfileName'
	| 'setProfilePic'
	| 'setTemporaryMessages'
	| 'setTheme'
	| 'start'
	| 'startPhoneWatchdog'
	| 'startRecording'
	| 'startTyping'
	| 'stopPhoneWatchdog'
	| 'stopRecording'
	| 'stopTyping'
	| 'unblockContact'
	| 'verifyNumber'
	| 'whatsapp-versions';

/** Caminhos conhecidos da Evolution API (POST /evolution/{controller}/{action}). */
export type EvolutionPath =
	| 'call/offer'
	| 'chat/deleteMessageForEveryone'
	| 'chat/fetchPrivacySettings'
	| 'chat/fetchProfile'
	| 'chat/fetchProfilePictureUrl'
	| 'chat/findChats'
	| 'chat/findContacts'
	| 'chat/findMessages'
	| 'chat/getBase64FromMediaMessage'
	| 'chat/removeProfilePicture'
	| 'chat/updatePrivacySettings'
	| 'chat/updateProfileName'
	| 'chat/updateProfilePicture'
	| 'chat/updateProfileStatus'
	| 'chat/whatsappNumbers'
	| 'group/create'
	| 'group/fetchAllGroups?getParticipants=true'
	| 'group/findGroupInfos?groupJid=120363314888103300'
	| 'group/inviteCode?groupJid=120363314888103300'
	| 'group/inviteInfo?groupJid=120363314888103300'
	| 'group/participants?groupJid=120363314888103300'
	| 'group/revokeInviteCode?groupJid=120363314888103300'
	| 'group/sendInvite'
	| 'group/updateGroupDescription?groupJid=120363314888103300'
	| 'group/updateGroupPicture?groupJid=120363314888103300'
	| 'group/updateGroupSubject?groupJid=120363314888103300'
	| 'group/updateParticipant?groupJid=120363314888103300'
	| 'group/updateSetting?groupJid=120363314888103300'
	| 'instance/connect'
	| 'instance/connectionState'
	| 'instance/create'
	| 'instance/delete'
	| 'instance/logout'
	| 'instance/restart'
	| 'label/findLabels'
	| 'label/handleLabel'
	| 'message/sendButtons'
	| 'message/sendContact'
	| 'message/sendLocation'
	| 'message/sendMedia'
	| 'message/sendPoll'
	| 'message/sendReaction'
	| 'message/sendStatus'
	| 'message/sendSticker'
	| 'message/sendText'
	| 'message/sendText/queue'
	| 'message/sendWhatsAppAudio'
	| 'settings/find'
	| 'settings/set';

/** Actions conhecidas do WhatsMeow (POST /whatsmeow/{action}). */
export type WhatsMeowAction =
	| 'chat/archive'
	| 'chat/mute'
	| 'chat/pin'
	| 'chat/unpin'
	| 'group/create'
	| 'group/info'
	| 'group/invitelink'
	| 'group/join'
	| 'group/list'
	| 'group/myall'
	| 'group/name'
	| 'group/participant'
	| 'group/photo'
	| 'instance/connect'
	| 'instance/create'
	| 'instance/delete/<devicekey>'
	| 'instance/disconnect'
	| 'instance/info/<devicekey>'
	| 'instance/logout'
	| 'instance/qr'
	| 'send/contact'
	| 'send/link'
	| 'send/location'
	| 'send/media'
	| 'send/poll'
	| 'send/sticker'
	| 'send/text'
	| 'user/avatar'
	| 'user/block'
	| 'user/blocklist'
	| 'user/check'
	| 'user/contacts'
	| 'user/info'
	| 'user/privacy'
	| 'user/profile'
	| 'user/unblock';

/** Serviços de consulta por crédito (POST /consulta/{service}/credits). */
export type ConsultaServico =
	| 'api-rntrc'
	| 'cep'
	| 'cnpj'
	| 'cpf'
	| 'crbm'
	| 'crm'
	| 'cro'
	| 'ddd-anatel'
	| 'emissao-notas'
	| 'frete-antt'
	| 'geoip'
	| 'rastreio'
	| 'telefone'
	| 'vehicles'
	| 'veiculos'
	| 'weather-api';

/** Tipos de consulta conhecidos (campo `tipo` do body). */
export type ConsultaTipo =
	| 'acerta-completo-positivo-pf'
	| 'acerta-essencial'
	| 'acerta-essencial-positivo'
	| 'acoes-processos-judiciais'
	| 'agregados-basica'
	| 'agregados-chassi'
	| 'agregados-indicio-sinistro'
	| 'agregados-propria'
	| 'agregados-renavam'
	| 'agregados-renavam-v2'
	| 'agregados-simples'
	| 'agregados-v2'
	| 'aml-vinculos-societarios'
	| 'analise-credito-basic-pf'
	| 'analise-credito-basic-pj'
	| 'analise-credito-business'
	| 'analise-credito-complete-pf'
	| 'analise-credito-essencial-pf'
	| 'analise-credito-plus-pf'
	| 'analitico-veicular'
	| 'antecedentes-criminais'
	| 'antifraude-chave-pix'
	| 'bairros'
	| 'banco-central-inabilitados'
	| 'base-estadual-v3'
	| 'base-estadual-v3-async'
	| 'base-nacional-online'
	| 'base-nacional-v2'
	| 'beneficios-sociais-pf'
	| 'bet-safe-compliance'
	| 'boa-vista-acerta-pf'
	| 'boa-vista-define-score'
	| 'cadastral-premium-pj'
	| 'caf-pf'
	| 'calcula-frete'
	| 'ccf-bacen'
	| 'cep'
	| 'certidao-conjunta-de-debitos-pessoa-fisica'
	| 'certidao-conjunta-de-debitos-pessoa-juridica'
	| 'certidao-negativa-de-debitos'
	| 'certidao-negativa-de-licitante-inidoneo'
	| 'certificado-upload'
	| 'check-list'
	| 'cidades'
	| 'cidadesPorDDD'
	| 'city'
	| 'cnh-criminals'
	| 'cnh-criminals-async'
	| 'cnh-por-cpf'
	| 'cnpj-cadastral'
	| 'cnpj-search'
	| 'compliance-basic'
	| 'compliance-basic-pj'
	| 'compliance-complete'
	| 'compliance-complete-pj'
	| 'consulta-ano-modelo'
	| 'consulta-cgu'
	| 'consulta-chave'
	| 'consulta-consolidada-de-pessoa-juridica'
	| 'consulta-marca'
	| 'consulta-modelo'
	| 'consulta-modelos-atraves-do-ano'
	| 'consulta-tabela-referencia'
	| 'consulta-valor-com-todos-parametros'
	| 'consultar-chave-base-estadual-v3'
	| 'consultar-chave-cnh-criminals'
	| 'consultar-chave-csv-renainf-renajud-bin-proprietario'
	| 'consultar-chave-leilao-v2'
	| 'consultar-chave-veiculos-total'
	| 'coordinates'
	| 'cpf-dados'
	| 'cpf-hotline'
	| 'cpf-impedidos'
	| 'cpf-lite'
	| 'cpf-obito-grupo-cadastral'
	| 'cpf-relatorio'
	| 'cpf-search'
	| 'cpf-search-mae'
	| 'cpf-sociodemograficos'
	| 'crbm'
	| 'creditos-simples-pf'
	| 'creditos-simples-pj'
	| 'crlve'
	| 'crm'
	| 'cro'
	| 'csv-renainf-renajud-bin-proprietario'
	| 'csv-renainf-renajud-bin-proprietario-async'
	| 'dados-cadastrais'
	| 'dados-processos'
	| 'ddd-cidade'
	| 'debitos-restricoes'
	| 'debitos-v4'
	| 'debitos-v4-async'
	| 'decodificador-agregados'
	| 'decodificador-precificador'
	| 'define-risco-pj'
	| 'detalhamento-negativo'
	| 'divida-ativa'
	| 'documento-crlv-ac'
	| 'documento-crlv-ap'
	| 'documento-crlv-ba'
	| 'documento-crlv-go'
	| 'documento-crlv-ma'
	| 'documento-crlv-mg'
	| 'documento-crlv-ms'
	| 'documento-crlv-mt'
	| 'documento-crlv-pi'
	| 'documento-crlv-ro'
	| 'documento-crlv-rr'
	| 'documento-crlv-to'
	| 'documento-frota'
	| 'emitentes-atualiza'
	| 'emitentes-cadastro'
	| 'emitentes-lista'
	| 'endereco-telefone-por-placa'
	| 'enriquecimento-de-lead'
	| 'estadual'
	| 'farol'
	| 'fgts-regularidade-do-empregador'
	| 'ficha-tecnica'
	| 'fipe'
	| 'fipe-chassi'
	| 'geoip'
	| 'gravame'
	| 'gravame-v2'
	| 'historico-alteracoes-empresa'
	| 'historico-km'
	| 'historico-proprietario'
	| 'historico-veiculos-pf-pj'
	| 'leilao'
	| 'leilao-completo-score'
	| 'leilao-conjugado'
	| 'leilao-sintetico'
	| 'leilao-v2'
	| 'leilao-v2-async'
	| 'limite-pj'
	| 'limite-positivo-pj'
	| 'localiza-cnpj'
	| 'modelos-carga'
	| 'multas'
	| 'multas-prf'
	| 'nacional'
	| 'nfse-consulta'
	| 'nfse-envio'
	| 'normativa-atual'
	| 'obito'
	| 'opcoes-calculo'
	| 'pep-lista-restritiva'
	| 'pessoa-exposta-politicamente'
	| 'pessoa-exposta-politicamente-parentesco'
	| 'pessoa-juridica-protesto'
	| 'proprietario-atual'
	| 'proprietario-atual-v2'
	| 'protesto-nacional-v2'
	| 'protestos-nacional-base'
	| 'protestos-sp'
	| 'quod-pj'
	| 'quod-restricao-pf'
	| 'rastreio'
	| 'rating-avancado-pj'
	| 'recall'
	| 'recall-v2'
	| 'receita-federal'
	| 'receita-federal-pf'
	| 'receita-federal-pf-v3'
	| 'receita-federal-pj'
	| 'receita-federal-pj-v3'
	| 'regularidade-transportadora'
	| 'relatorio-positivo'
	| 'relatorio-positivo-pj'
	| 'relatorio-veicular'
	| 'relatorio-veicular-completo'
	| 'renainf'
	| 'renajud'
	| 'risco-positivo-pj'
	| 'roubo-furto'
	| 'roubo-furto-v2'
	| 'score-credito-quod'
	| 'scpc-net-pf'
	| 'scpc-net-pj'
	| 'scr-analitico-resumo-bacen'
	| 'scr-bacen'
	| 'scr-bacen-score'
	| 'search'
	| 'secretaria-da-fazenda-sao-paulo'
	| 'serasa-real-time'
	| 'serasa-score-pf'
	| 'serasa-score-pj'
	| 'simples-nacional'
	| 'sincroniza-normativas'
	| 'sintegra-cadastros-estaduais'
	| 'sintegra-ccc'
	| 'situacao-eleitoral'
	| 'spc-boa-vista'
	| 'spc-serasa'
	| 'spc-terceiros-pf'
	| 'spc-terceiros-pj'
	| 'telefone-operadora'
	| 'transacional-pf'
	| 'transacional-pj'
	| 'var'
	| 'veicular-agrupados'
	| 'veiculos-dados-v1'
	| 'veiculos-documento-pf'
	| 'veiculos-documento-pj'
	| 'veiculos-total'
	| 'veiculos-total-async'
	| 'versoes-normativas'
	| 'vinculo-empregaticio'
	| 'vip-car';

/** Metadados por tipo de consulta: serviço da rota e campos do body de exemplo. */
export const CONSULTA_TIPOS: Record<ConsultaTipo, { service: string; fields: string[] }> = {
	'acerta-completo-positivo-pf': { service: 'cpf', fields: ['cpf'] },
	'acerta-essencial': { service: 'cpf', fields: ['cpf'] },
	'acerta-essencial-positivo': { service: 'cpf', fields: ['cpf'] },
	'acoes-processos-judiciais': { service: 'cpf', fields: ['//cnpj', 'cpf'] },
	'agregados-basica': { service: 'veiculos', fields: ['placa'] },
	'agregados-chassi': { service: 'veiculos', fields: ['chassi'] },
	'agregados-indicio-sinistro': { service: 'veiculos', fields: ['placa'] },
	'agregados-propria': { service: 'veiculos', fields: ['placa'] },
	'agregados-renavam': { service: 'veiculos', fields: ['placa'] },
	'agregados-renavam-v2': { service: 'veiculos', fields: ['placa'] },
	'agregados-simples': { service: 'veiculos', fields: ['placa'] },
	'agregados-v2': { service: 'veiculos', fields: ['placa'] },
	'aml-vinculos-societarios': { service: 'cpf', fields: ['cpf'] },
	'analise-credito-basic-pf': { service: 'cpf', fields: ['cpf'] },
	'analise-credito-basic-pj': { service: 'cnpj', fields: ['cnpj'] },
	'analise-credito-business': { service: 'cnpj', fields: ['cnpj'] },
	'analise-credito-complete-pf': { service: 'cpf', fields: ['cpf'] },
	'analise-credito-essencial-pf': { service: 'cpf', fields: ['cpf'] },
	'analise-credito-plus-pf': { service: 'cpf', fields: ['cpf'] },
	'analitico-veicular': { service: 'veiculos', fields: ['extra', 'placa', 'whitelabel'] },
	'antecedentes-criminais': { service: 'cpf', fields: ['cpf', 'rg', 'uf'] },
	'antifraude-chave-pix': { service: 'cpf', fields: ['chave-pix', 'documento', 'tipo-chave'] },
	'bairros': { service: 'cep', fields: ['cidade'] },
	'banco-central-inabilitados': { service: 'cpf', fields: ['cpf'] },
	'base-estadual-v3': { service: 'veiculos', fields: ['placa'] },
	'base-estadual-v3-async': { service: 'vehicles', fields: ['placa', 'webhook_url'] },
	'base-nacional-online': { service: 'veiculos', fields: ['placa'] },
	'base-nacional-v2': { service: 'veiculos', fields: ['placa'] },
	'beneficios-sociais-pf': { service: 'cpf', fields: ['cpf'] },
	'bet-safe-compliance': { service: 'cpf', fields: ['cpf'] },
	'boa-vista-acerta-pf': { service: 'cpf', fields: ['cpf'] },
	'boa-vista-define-score': { service: 'cnpj', fields: ['cnpj'] },
	'cadastral-premium-pj': { service: 'cnpj', fields: ['cnpj'] },
	'caf-pf': { service: 'cpf', fields: ['cpf'] },
	'calcula-frete': { service: 'frete-antt', fields: ['altoDesempenho', 'composicaoVeicular', 'dataReferencia', 'distanciaKm', 'eixos', 'retornoVazio', 'tipoCarga'] },
	'ccf-bacen': { service: 'cpf', fields: ['cpf'] },
	'cep': { service: 'cep', fields: ['cep'] },
	'certidao-conjunta-de-debitos-pessoa-fisica': { service: 'cpf', fields: ['cpf'] },
	'certidao-conjunta-de-debitos-pessoa-juridica': { service: 'cnpj', fields: ['cnpj'] },
	'certidao-negativa-de-debitos': { service: 'cpf', fields: ['cpf', 'uf'] },
	'certidao-negativa-de-licitante-inidoneo': { service: 'cpf', fields: ['cpf'] },
	'certificado-upload': { service: 'emissao-notas', fields: ['dados'] },
	'check-list': { service: 'veiculos', fields: ['placa'] },
	'cidades': { service: 'cep', fields: ['uf'] },
	'cidadesPorDDD': { service: 'cep', fields: ['ddd'] },
	'city': { service: 'weather-api', fields: ['city'] },
	'cnh-criminals': { service: 'cpf', fields: ['cpf'] },
	'cnh-criminals-async': { service: 'cpf', fields: ['cpf', 'webhook_url'] },
	'cnh-por-cpf': { service: 'cpf', fields: ['cpf'] },
	'cnpj-cadastral': { service: 'cnpj', fields: ['cnpj'] },
	'cnpj-search': { service: 'cnpj', fields: ['cnpj'] },
	'compliance-basic': { service: 'cpf', fields: ['cpf'] },
	'compliance-basic-pj': { service: 'cnpj', fields: ['cnpj'] },
	'compliance-complete': { service: 'cpf', fields: ['cpf'] },
	'compliance-complete-pj': { service: 'cnpj', fields: ['cnpj'] },
	'consulta-ano-modelo': { service: 'veiculos', fields: ['codigoMarca', 'codigoModelo', 'codigoTabelaReferencia', 'codigoTipoVeiculo'] },
	'consulta-cgu': { service: 'cpf', fields: ['cpf', 'tipo-agente'] },
	'consulta-chave': { service: 'vehicles', fields: ['job-id'] },
	'consulta-consolidada-de-pessoa-juridica': { service: 'cnpj', fields: ['cnpj'] },
	'consulta-marca': { service: 'veiculos', fields: ['codigoTabelaReferencia', 'codigoTipoVeiculo'] },
	'consulta-modelo': { service: 'veiculos', fields: ['codigoMarca', 'codigoTabelaReferencia', 'codigoTipoVeiculo'] },
	'consulta-modelos-atraves-do-ano': { service: 'veiculos', fields: ['ano', 'anoModelo', 'codigoMarca', 'codigoTabelaReferencia', 'codigoTipoCombustivel', 'codigoTipoVeiculo'] },
	'consulta-tabela-referencia': { service: 'veiculos', fields: [] },
	'consulta-valor-com-todos-parametros': { service: 'veiculos', fields: ['ano', 'anoModelo', 'codigoMarca', 'codigoModelo', 'codigoTabelaReferencia', 'codigoTipoCombustivel', 'codigoTipoVeiculo'] },
	'consultar-chave-base-estadual-v3': { service: 'vehicles', fields: ['job-id'] },
	'consultar-chave-cnh-criminals': { service: 'cpf', fields: ['job-id'] },
	'consultar-chave-csv-renainf-renajud-bin-proprietario': { service: 'vehicles', fields: ['job-id'] },
	'consultar-chave-leilao-v2': { service: 'vehicles', fields: ['job-id'] },
	'consultar-chave-veiculos-total': { service: 'vehicles', fields: ['job-id'] },
	'coordinates': { service: 'weather-api', fields: ['lat', 'lon'] },
	'cpf-dados': { service: 'cpf', fields: ['cpf'] },
	'cpf-hotline': { service: 'cpf', fields: ['cpf'] },
	'cpf-impedidos': { service: 'cpf', fields: ['cpf'] },
	'cpf-lite': { service: 'cpf', fields: ['cpf'] },
	'cpf-obito-grupo-cadastral': { service: 'cpf', fields: ['cpf'] },
	'cpf-relatorio': { service: 'cpf', fields: ['cpf', 'extra', 'whitelabel'] },
	'cpf-search': { service: 'cpf', fields: ['cpf'] },
	'cpf-search-mae': { service: 'cpf', fields: ['cpf'] },
	'cpf-sociodemograficos': { service: 'cpf', fields: ['cpf'] },
	'crbm': { service: 'crbm', fields: ['numero_registro', 'regiao'] },
	'creditos-simples-pf': { service: 'cpf', fields: ['cpf'] },
	'creditos-simples-pj': { service: 'cnpj', fields: ['cnpj'] },
	'crlve': { service: 'veiculos', fields: ['placa', 'uf'] },
	'crm': { service: 'crm', fields: ['numero_registro', 'uf'] },
	'cro': { service: 'cro', fields: ['categoria', 'numero_registro', 'uf'] },
	'csv-renainf-renajud-bin-proprietario': { service: 'veiculos', fields: ['placa'] },
	'csv-renainf-renajud-bin-proprietario-async': { service: 'veiculos', fields: ['placa', 'webhook_url'] },
	'dados-cadastrais': { service: 'cpf', fields: ['cpf'] },
	'dados-processos': { service: 'cpf', fields: ['cpf', 'whitelabel'] },
	'ddd-cidade': { service: 'ddd-anatel', fields: ['city'] },
	'debitos-restricoes': { service: 'veiculos', fields: ['placa'] },
	'debitos-v4': { service: 'veiculos', fields: ['placa'] },
	'debitos-v4-async': { service: 'vehicles', fields: ['placa', 'webhook_url'] },
	'decodificador-agregados': { service: 'veiculos', fields: ['placa'] },
	'decodificador-precificador': { service: 'veiculos', fields: ['placa'] },
	'define-risco-pj': { service: 'cnpj', fields: ['cnpj'] },
	'detalhamento-negativo': { service: 'cnpj', fields: ['cnpj'] },
	'divida-ativa': { service: 'cpf', fields: ['cpf'] },
	'documento-crlv-ac': { service: 'veiculos', fields: ['cpf', 'placa', 'renavam'] },
	'documento-crlv-ap': { service: 'veiculos', fields: ['cpf', 'placa', 'renavam'] },
	'documento-crlv-ba': { service: 'veiculos', fields: ['cpf', 'placa', 'renavam'] },
	'documento-crlv-go': { service: 'veiculos', fields: ['cpf', 'placa', 'renavam'] },
	'documento-crlv-ma': { service: 'veiculos', fields: ['cpf', 'placa', 'renavam'] },
	'documento-crlv-mg': { service: 'veiculos', fields: ['cpf', 'placa', 'renavam'] },
	'documento-crlv-ms': { service: 'veiculos', fields: ['placa'] },
	'documento-crlv-mt': { service: 'veiculos', fields: ['cpf', 'placa', 'renavam'] },
	'documento-crlv-pi': { service: 'veiculos', fields: ['placa'] },
	'documento-crlv-ro': { service: 'veiculos', fields: ['placa'] },
	'documento-crlv-rr': { service: 'veiculos', fields: ['cpf', 'placa', 'renavam'] },
	'documento-crlv-to': { service: 'veiculos', fields: ['cpf', 'placa', 'renavam'] },
	'documento-frota': { service: 'cnpj', fields: ['cnpj'] },
	'emitentes-atualiza': { service: 'emissao-notas', fields: ['bairro', 'cep', 'cmun', 'cnae', 'cnpj', 'crt', 'documentos', 'email', 'emitente_id', 'ie', 'im', 'logo', 'municipio', 'nome', 'numero', 'razao', 'rua', 'suframa', 'telefone', 'uf', 'webhook_url'] },
	'emitentes-cadastro': { service: 'emissao-notas', fields: ['bairro', 'cep', 'cmun', 'cnae', 'cnpj', 'crt', 'documentos', 'email', 'ie', 'im', 'logo', 'municipio', 'nome', 'numero', 'razao', 'rua', 'suframa', 'telefone', 'uf', 'webhook_url'] },
	'emitentes-lista': { service: 'emissao-notas', fields: ['emitente'] },
	'endereco-telefone-por-placa': { service: 'veiculos', fields: ['placa'] },
	'enriquecimento-de-lead': { service: 'cpf', fields: ['email'] },
	'estadual': { service: 'veiculos', fields: ['placa'] },
	'farol': { service: 'veiculos', fields: ['placa'] },
	'fgts-regularidade-do-empregador': { service: 'cnpj', fields: ['cnpj'] },
	'ficha-tecnica': { service: 'veiculos', fields: ['placa'] },
	'fipe': { service: 'veiculos', fields: ['placa'] },
	'fipe-chassi': { service: 'veiculos', fields: ['placa'] },
	'geoip': { service: 'geoip', fields: ['ip'] },
	'gravame': { service: 'veiculos', fields: ['placa'] },
	'gravame-v2': { service: 'veiculos', fields: ['placa'] },
	'historico-alteracoes-empresa': { service: 'cnpj', fields: ['cnpj'] },
	'historico-km': { service: 'veiculos', fields: ['placa'] },
	'historico-proprietario': { service: 'vehicles', fields: ['cnpj', 'placa'] },
	'historico-veiculos-pf-pj': { service: 'cnpj', fields: ['cnpj'] },
	'leilao': { service: 'veiculos', fields: ['placa'] },
	'leilao-completo-score': { service: 'veiculos', fields: ['placa'] },
	'leilao-conjugado': { service: 'veiculos', fields: ['placa'] },
	'leilao-sintetico': { service: 'veiculos', fields: ['placa'] },
	'leilao-v2': { service: 'veiculos', fields: ['placa'] },
	'leilao-v2-async': { service: 'veiculos', fields: ['placa', 'webhook_url'] },
	'limite-pj': { service: 'cnpj', fields: ['cnpj'] },
	'limite-positivo-pj': { service: 'cnpj', fields: ['cnpj'] },
	'localiza-cnpj': { service: 'cnpj', fields: ['cnpj'] },
	'modelos-carga': { service: 'frete-antt', fields: ['dataReferencia'] },
	'multas': { service: 'veiculos', fields: ['placa'] },
	'multas-prf': { service: 'veiculos', fields: ['placa', 'renavam'] },
	'nacional': { service: 'veiculos', fields: ['placa'] },
	'nfse-consulta': { service: 'emissao-notas', fields: ['chave', 'emitente_id'] },
	'nfse-envio': { service: 'emissao-notas', fields: ['dados', 'emitente_id'] },
	'normativa-atual': { service: 'frete-antt', fields: ['dataReferencia'] },
	'obito': { service: 'cpf', fields: ['cpf'] },
	'opcoes-calculo': { service: 'frete-antt', fields: ['dataReferencia'] },
	'pep-lista-restritiva': { service: 'cpf', fields: ['cpf'] },
	'pessoa-exposta-politicamente': { service: 'cpf', fields: ['cpf'] },
	'pessoa-exposta-politicamente-parentesco': { service: 'cpf', fields: ['cpf'] },
	'pessoa-juridica-protesto': { service: 'cnpj', fields: ['cnpj'] },
	'proprietario-atual': { service: 'veiculos', fields: ['placa'] },
	'proprietario-atual-v2': { service: 'veiculos', fields: ['placa'] },
	'protesto-nacional-v2': { service: 'cpf', fields: ['cpf'] },
	'protestos-nacional-base': { service: 'cpf', fields: ['cpf'] },
	'protestos-sp': { service: 'cpf', fields: ['cpf'] },
	'quod-pj': { service: 'cnpj', fields: ['cnpj'] },
	'quod-restricao-pf': { service: 'cpf', fields: ['cpf'] },
	'rastreio': { service: 'rastreio', fields: ['code'] },
	'rating-avancado-pj': { service: 'cnpj', fields: ['cnpj'] },
	'recall': { service: 'veiculos', fields: ['placa'] },
	'recall-v2': { service: 'veiculos', fields: ['chassi'] },
	'receita-federal': { service: 'cpf', fields: ['cpf'] },
	'receita-federal-pf': { service: 'cpf', fields: ['cpf'] },
	'receita-federal-pf-v3': { service: 'cpf', fields: ['cpf'] },
	'receita-federal-pj': { service: 'cnpj', fields: ['cnpj'] },
	'receita-federal-pj-v3': { service: 'cnpj', fields: ['cnpj'] },
	'regularidade-transportadora': { service: 'cnpj', fields: ['cnpj', 'rntrc'] },
	'relatorio-positivo': { service: 'cpf', fields: ['cpf'] },
	'relatorio-positivo-pj': { service: 'cnpj', fields: ['cnpj'] },
	'relatorio-veicular': { service: 'veiculos', fields: ['extra', 'placa', 'whitelabel'] },
	'relatorio-veicular-completo': { service: 'veiculos', fields: ['extra', 'placa', 'whitelabel'] },
	'renainf': { service: 'veiculos', fields: ['placa'] },
	'renajud': { service: 'veiculos', fields: ['documento', 'placa', 'renavam'] },
	'risco-positivo-pj': { service: 'cnpj', fields: ['cnpj'] },
	'roubo-furto': { service: 'veiculos', fields: ['placa'] },
	'roubo-furto-v2': { service: 'veiculos', fields: ['placa'] },
	'score-credito-quod': { service: 'cpf', fields: ['cpf'] },
	'scpc-net-pf': { service: 'cpf', fields: ['cpf'] },
	'scpc-net-pj': { service: 'cnpj', fields: ['cnpj'] },
	'scr-analitico-resumo-bacen': { service: 'cnpj', fields: ['cnpj'] },
	'scr-bacen': { service: 'cpf', fields: ['cpf'] },
	'scr-bacen-score': { service: 'cpf', fields: ['cpf'] },
	'search': { service: 'api-rntrc', fields: ['filters', 'pagination', 'sort'] },
	'secretaria-da-fazenda-sao-paulo': { service: 'cpf', fields: ['cpf'] },
	'serasa-real-time': { service: 'cnpj', fields: ['cnpj'] },
	'serasa-score-pf': { service: 'cpf', fields: ['cpf'] },
	'serasa-score-pj': { service: 'cnpj', fields: ['cnpj'] },
	'simples-nacional': { service: 'cnpj', fields: ['cnpj'] },
	'sincroniza-normativas': { service: 'frete-antt', fields: [] },
	'sintegra-cadastros-estaduais': { service: 'cnpj', fields: ['cnpj'] },
	'sintegra-ccc': { service: 'cnpj', fields: ['cnpj', 'uf'] },
	'situacao-eleitoral': { service: 'cpf', fields: ['cpf'] },
	'spc-boa-vista': { service: 'cpf', fields: ['cpf'] },
	'spc-serasa': { service: 'cpf', fields: ['cpf'] },
	'spc-terceiros-pf': { service: 'cpf', fields: ['cpf'] },
	'spc-terceiros-pj': { service: 'cnpj', fields: ['cnpj'] },
	'telefone-operadora': { service: 'telefone', fields: ['numbers', 'options'] },
	'transacional-pf': { service: 'cpf', fields: ['cpf'] },
	'transacional-pj': { service: 'cnpj', fields: ['cnpj'] },
	'var': { service: 'cpf', fields: ['cpf'] },
	'veicular-agrupados': { service: 'veiculos', fields: ['agrupados', 'placa'] },
	'veiculos-dados-v1': { service: 'veiculos', fields: ['placa'] },
	'veiculos-documento-pf': { service: 'cpf', fields: ['cpf'] },
	'veiculos-documento-pj': { service: 'veiculos', fields: ['cnpj'] },
	'veiculos-total': { service: 'veiculos', fields: ['placa'] },
	'veiculos-total-async': { service: 'veiculos', fields: ['placa', 'webhook_url'] },
	'versoes-normativas': { service: 'frete-antt', fields: [] },
	'vinculo-empregaticio': { service: 'cnpj', fields: ['cnpj'] },
	'vip-car': { service: 'veiculos', fields: ['placa'] },
};

/** Actions documentadas por serviço do gateway. */
export const SERVICE_ACTIONS: Record<string, string[]> = {
	'api': ['loterias/:sorteio'],
	'apis': ['list'],
	'auth': ['login', 'logout'],
	'balance': [],
	'cep': ['bairros', 'cep', 'cidades', 'cidadesPorDDD', 'distancia/calcular', 'estados'],
	'chip': ['virtual/activation', 'virtual/buy', 'virtual/operators', 'virtual/services'],
	'consulta': ['api-rntrc/credits', 'cep/credits', 'cnpj/credits', 'cpf/credits', 'crbm/credits', 'crm/credits', 'cro/credits', 'ddd-anatel/credits', 'emissao-notas/credits', 'frete-antt/credits', 'geoip/credits', 'rastreio/credits', 'telefone/credits', 'vehicles/credits', 'veiculos/credits', 'weather-api/credits'],
	'correios': ['rastreio'],
	'dados': ['byquery', 'capital-social', 'cep', 'cnae', 'cnpj', 'cnpj/credits', 'cpf', 'lista-cnaes', 'lista-socios', 'uf'],
	'database': ['ip'],
	'ddd': [],
	'devices': ['destroy', 'requests', 'search', 'store'],
	'evolution': ['call/offer', 'chat/deleteMessageForEveryone', 'chat/fetchPrivacySettings', 'chat/fetchProfile', 'chat/fetchProfilePictureUrl', 'chat/findChats', 'chat/findContacts', 'chat/findMessages', 'chat/getBase64FromMediaMessage', 'chat/removeProfilePicture', 'chat/updatePrivacySettings', 'chat/updateProfileName', 'chat/updateProfilePicture', 'chat/updateProfileStatus', 'chat/whatsappNumbers', 'group/create', 'group/fetchAllGroups?getParticipants=true', 'group/findGroupInfos?groupJid=120363314888103300', 'group/inviteCode?groupJid=120363314888103300', 'group/inviteInfo?groupJid=120363314888103300', 'group/participants?groupJid=120363314888103300', 'group/revokeInviteCode?groupJid=120363314888103300', 'group/sendInvite', 'group/updateGroupDescription?groupJid=120363314888103300', 'group/updateGroupPicture?groupJid=120363314888103300', 'group/updateGroupSubject?groupJid=120363314888103300', 'group/updateParticipant?groupJid=120363314888103300', 'group/updateSetting?groupJid=120363314888103300', 'instance/connect', 'instance/connectionState', 'instance/create', 'instance/delete', 'instance/logout', 'instance/restart', 'label/findLabels', 'label/handleLabel', 'message/sendButtons', 'message/sendContact', 'message/sendLocation', 'message/sendMedia', 'message/sendPoll', 'message/sendReaction', 'message/sendStatus', 'message/sendSticker', 'message/sendText', 'message/sendText/queue', 'message/sendWhatsAppAudio', 'settings/find', 'settings/set'],
	'fipe': ['ConsultarAnoModelo', 'ConsultarMarcas', 'ConsultarModelos', 'ConsultarModelosAtravesDoAno', 'ConsultarTabelaDeReferencia', 'ConsultarValorComTodosParametros'],
	'geolocation': ['forward-geocoding', 'geocode'],
	'geomatrix': ['distance'],
	'holidays': ['feriados'],
	'invoices': [],
	'loterias': [':sorteio/:concurso', ':sorteio/latest'],
	'plan': [],
	'profile': [],
	'proxy': ['seller/credits'],
	'quod': ['cnpj/credits'],
	'recharge': [],
	'recharges': [],
	'recognize': ['base64', 'uri'],
	'requests': ['paginate'],
	'servers': [],
	'sms': ['send/credits'],
	'social': ['github/callback?code=SEU_CODE&state=SEU_STATE', 'github/url'],
	'ticket': ['TCK-HKGMWHCW2S', 'TCK-HKGMWHCW2S/messages'],
	'tickets': [],
	'translate': ['identify', 'models'],
	'ura': ['call/dialler', 'call/status?callId='],
	'vehicles': ['base/000/dados', 'dados', 'fipe'],
	'weather': ['city', 'coordenates'],
	'whatsapp': ['addParticipant', 'addSubgroupsCommunity', 'approveGroupMembershipRequest', 'archiveChat', 'blockContact', 'checkNumberStatus', 'clearChat', 'close', 'closeChat', 'createCommunity', 'createGroup', 'deactivateCommunity', 'deleteChat', 'deleteMessage', 'deleteSession', 'demoteCommunityParticipant', 'demoteParticipant', 'downloadMediaByMessage', 'fila', 'forwardMessages', 'getAllBroadcastList', 'getAllChats', 'getAllChatsWithMessages', 'getAllContacts', 'getAllGroups', 'getAllGroupsFull', 'getAllLabels', 'getAllNewMessages', 'getAutoDownloadSettings', 'getBatteryLevel', 'getBlockList', 'getChat', 'getCommonGroups', 'getCommunityParticipants', 'getConnectionState', 'getConnectionStatus', 'getGroupAdmins', 'getGroupInfoFromInviteLink', 'getGroupInviteLink', 'getGroupMembers', 'getGroupMembersIds', 'getGroupMembershipRequests', 'getGroupSizeLimit', 'getMessagesChat', 'getMessagesFromRowId', 'getNumberProfile', 'getPhoneNumberByLid', 'getPlatformFromMessage', 'getProducts', 'getProfilePic', 'getReactions', 'getStatus', 'getUnreadMessages', 'getWid', 'isAuthenticated', 'isConnected', 'isLoggedIn', 'isMultiDevice', 'joinGroup', 'joinWebBeta', 'leaveGroup', 'loadEarlierMessages', 'logout', 'markPlayed', 'openChat', 'promoteCommunityParticipant', 'promoteParticipant', 'qrcode', 'removeGroupIcon', 'removeParticipant', 'removeSubgroupsCommunity', 'reply', 'restartSession', 'sendAudio', 'sendAudio64', 'sendButtons', 'sendContact', 'sendContactVcardList', 'sendFile', 'sendFile/queue', 'sendFile64', 'sendGif', 'sendImageToStorie', 'sendLink', 'sendList', 'sendLocation', 'sendMentioned', 'sendMessageWithThumb', 'sendOrderMessage', 'sendOrderMessage/queue', 'sendPixKey', 'sendPollMessage', 'sendReadStatus', 'sendSticker', 'sendText', 'sendText/queue', 'sendTextToStorie', 'sendVideo', 'sendVideo/queue', 'sendVideoAsGif', 'sendVideoToStorie', 'setAutoDownloadSettings', 'setGroupDescription', 'setGroupPic', 'setGroupProperty', 'setGroupSubject', 'setMessagesAdminsOnly', 'setProfileName', 'setProfilePic', 'setTemporaryMessages', 'setTheme', 'start', 'startPhoneWatchdog', 'startRecording', 'startTyping', 'stopPhoneWatchdog', 'stopRecording', 'stopTyping', 'unblockContact', 'verifyNumber', 'whatsapp-versions'],
	'whatsmeow': ['chat/archive', 'chat/mute', 'chat/pin', 'chat/unpin', 'group/create', 'group/info', 'group/invitelink', 'group/join', 'group/list', 'group/myall', 'group/name', 'group/participant', 'group/photo', 'instance/connect', 'instance/create', 'instance/delete/<devicekey>', 'instance/disconnect', 'instance/info/<devicekey>', 'instance/logout', 'instance/qr', 'send/contact', 'send/link', 'send/location', 'send/media', 'send/poll', 'send/sticker', 'send/text', 'user/avatar', 'user/block', 'user/blocklist', 'user/check', 'user/contacts', 'user/info', 'user/privacy', 'user/profile', 'user/unblock'],
};
