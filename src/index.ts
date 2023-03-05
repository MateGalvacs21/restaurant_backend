import {MongoService} from "./services/mongo/mongo.service";
import {ConfigurationService} from "./services/configuration/configuration.service";
import {errorHandler, start} from "./initialization/app-start.funtion";

const configuration = new ConfigurationService();
MongoService.connect(configuration.connectionData)
    .then(start)
    .catch(errorHandler);

