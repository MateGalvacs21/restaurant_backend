import {ConnectionData} from "../mongo/helper/connectionData.model";
import {ConfigurationKeys} from "./helper/configuration-keys.enum";

export class ConfigurationService {
    private readonly SERVER_PORT = process.env[ConfigurationKeys.serverPort];
    private readonly MONGO_CONNECTION_STRING = process.env[ConfigurationKeys.connectionString];
    private readonly CONNECTION_DATA: ConnectionData;
    private readonly DB_NAME = process.env[ConfigurationKeys.dbName];

    constructor() {
        this.CONNECTION_DATA = {
            connStr: this.connectionString,
            dbName: this.dbName
        }
    }

    public get serverPort(): number {
        return Number(this.SERVER_PORT);
    }

    public get connectionData(): ConnectionData {
        return this.CONNECTION_DATA;
    }

    public get connectionString(): string {
        if(!this.MONGO_CONNECTION_STRING) return "";
        return this.MONGO_CONNECTION_STRING;
    }

    public get dbName(): string {
        if(!this.DB_NAME) return "";
        return this.DB_NAME;
    }
}