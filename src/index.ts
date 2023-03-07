import { MongoService } from './services/mongo/mongo.service';
import { ConfigurationService } from './services/configuration/configuration.service';
import { errorHandler, start } from './initialization/app-start.funtion';

const mongoService = new MongoService();
mongoService.connect(ConfigurationService.ConnectionData).then(start).catch(errorHandler);
