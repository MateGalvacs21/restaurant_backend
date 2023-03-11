import express, { Application } from 'express';
import cors from 'cors';
import { ConfigurationService } from '../services/configuration/configuration.service';
import { Logger } from '../services/logger/logger.service';
import { RestaurantRoutes } from '../restaurant/routes/restaurant.route';
import { OrderRoutes } from '../order/routes/order.route';
import { PrintDataRoutes } from '../copydata/routes/copy-data.route';
import { StatisticRoutes } from '../statistics/routes/statistic.route';
import { AuthenticationRoutes } from '../authentication/routes/authentication.route';
import {AuthenticationService} from "../authentication/service/authentication.service";
const loggerService = new Logger();
export const start = async() => {
	const app: Application = express();
	app.use(express.json());
	app.use(cors({ origin: '*' }));
	app.use('/api/restaurant', RestaurantRoutes);
	app.use('/api/order', OrderRoutes);
	app.use('/api/printer', PrintDataRoutes);
	app.use('/api/statistics', StatisticRoutes);
	app.use('/api/authentication', AuthenticationRoutes);
	await AuthenticationService.expired();
	app.listen(ConfigurationService.ServerPort, () => loggerService.success(`Server is run at ${ConfigurationService.ServerPort} port!`));
};

export const errorHandler = () => {
	loggerService.error('SERVER cannot be start because have an problem..');
};
