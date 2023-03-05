import { connect, Mongoose, set } from 'mongoose';

import {ConfigurationService} from "../configuration/configuration.service";
import {ConnectionData} from "./helper/connectionData.model";
import {Logger} from "../../logger/logger.service";

export class MongoService {
    private readonly connectionString: string;
    private static client: Mongoose;
    private readonly configuration = new ConfigurationService();
    constructor() {
        this.connectionString = this.configuration.connectionString;
    }
    public static async connect(connectionData: ConnectionData): Promise<void> {
        if (MongoService.client) {
            return;
        }
        try {
            Logger.info('Connecting to MongoDB...');
            await set('strictQuery', false);
            MongoService.client = await connect(connectionData.connStr, { dbName:connectionData.dbName });
            Logger.success('Successfully connected!');
        } catch (error: any) {
            Logger.error(`An error occurred during connecting to MongoDB: ${error}`);
            throw new Error(error);
        }
    }

    public static async disconnect(): Promise<void> {
        return MongoService.client.disconnect();
    }

}