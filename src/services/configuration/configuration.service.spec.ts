import * as process from 'process';
import { ConfigurationService } from '@root/services/configuration/configuration.service';

describe('ConfigurationService', () => {
	const connectionString = 'mongo-conn';
	const dbName = 'db-name';
	const port = 5500;

	beforeAll(() => {
		jest.restoreAllMocks();
		process.env.CONN_STRING = connectionString;
		process.env.DB_NAME = dbName;
		process.env.PORT = String(port);
	});

	it('should get property for function', () => {
		expect(ConfigurationService.ServerPort).toEqual(port);
		expect(ConfigurationService.ConnectionData).toEqual({ connStr: connectionString, dbName: dbName });
	});
});
