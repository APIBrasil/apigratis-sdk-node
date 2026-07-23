import { HttpClient } from '../../core/http';
import { DeviceProxyService } from '../deviceProxy';

/** Tabela FIPE (device-based): `/fipe/{action}` (marcas, modelos, anos, preço...). */
export class FipeService extends DeviceProxyService {
	constructor(http: HttpClient) {
		super(http, 'fipe');
	}
}
