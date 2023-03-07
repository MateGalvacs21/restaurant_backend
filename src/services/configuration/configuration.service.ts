import { ConnectionData } from '../mongo/helper/connectionData.model';
import { ConfigurationKeys } from './helper/configuration-keys.enum';

export class ConfigurationService {
	public static get ServerPort(): number {
		return Number(process.env[ConfigurationKeys.serverPort]);
	}

	public static get ConnectionData(): ConnectionData {
		return {
			connStr: process.env[ConfigurationKeys.connectionString],
			dbName: process.env[ConfigurationKeys.dbName]
		};
	}
}
