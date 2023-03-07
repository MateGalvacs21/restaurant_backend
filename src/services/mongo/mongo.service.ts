import { connect, Mongoose } from 'mongoose';
import { ConnectionData } from './helper/connectionData.model';
import { Logger } from '../logger/logger.service';

export class MongoService {
	private client: Mongoose;
	private loggerService = new Logger();
	public async connect(connectionData: ConnectionData): Promise<void> {
		if (this.client) {
			return;
		}
		try {
			this.loggerService.info('Connecting to MongoDB...');
			this.client = await connect(connectionData.connStr, { dbName: connectionData.dbName });
			this.loggerService.success('Successfully connected!');
		} catch (error) {
			this.loggerService.error(`An error occurred during connecting to MongoDB: ${error}`);
			throw new Error(error);
		}
	}
}
