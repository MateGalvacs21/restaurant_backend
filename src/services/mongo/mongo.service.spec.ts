import { MongoService } from '@root/services/mongo/mongo.service';
import { Mongoose } from 'mongoose';
import SpyInstance = jest.SpyInstance;
import { ConfigurationService } from '@root/services/configuration/configuration.service';
import * as mongoose from 'mongoose';

jest.mock('mongoose');

describe('Mongo Service', () => {
	const dbName = 'dbName';
	const connectionString = 'connectionString';
	const testingError = 'Testing error!';

	const mongoClient: Mongoose = {} as never;
	let connectSpy: SpyInstance;
	let consoleSpy: SpyInstance;
	let mongoService: MongoService;

	beforeEach(() => {
		jest.spyOn(ConfigurationService, 'ConnectionData', 'get').mockReturnValue({
			connStr: connectionString,
			dbName: dbName
		});
		mongoService = new MongoService();
		consoleSpy = jest.spyOn(console, 'log').mockImplementation();
	});

	afterEach(() => {
		connectSpy.mockReset();
		consoleSpy.mockReset();
	});

	it('should create new connection to mongoDB successfully', async () => {
		connectSpy = jest.spyOn(mongoose, 'connect').mockResolvedValue(mongoClient);
		await mongoService.connect({ connStr: connectionString, dbName: dbName });

		expect(connectSpy).toHaveBeenCalledWith(connectionString, { dbName: dbName });
		expect(consoleSpy).toBeCalledTimes(2);
	});

	it('should not create new connection when mongoose client has been already created', async () => {
		connectSpy = jest.spyOn(mongoose, 'connect').mockResolvedValue(mongoClient);
		await mongoService.connect({ connStr: connectionString, dbName: dbName });

		await mongoService.connect({ connStr: connectionString, dbName: dbName });
		expect(connectSpy).toHaveBeenCalledTimes(1);
	});

	it('should log error when an error occurs during connecting to MongoDB', async () => {
		const error = new Error(testingError);
		connectSpy = jest.spyOn(mongoose, 'connect').mockRejectedValue(error);

		try {
			await mongoService.connect({ connStr: connectionString, dbName: dbName });
			fail('it should fail');
		} catch (mongoError) {
			expect(mongoError).toBe(mongoError);
		}
		expect(consoleSpy.mock.calls).toEqual([['\x1b[36m' + 'Connecting to MongoDB...'], ['\x1b[31m' + `An error occurred during connecting to MongoDB: Error: ${testingError}`]]);
	});
});
