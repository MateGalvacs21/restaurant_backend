import express, {Application} from "express";
import cors from "cors";
import {ConfigurationService} from "../services/configuration/configuration.service";
import {Logger} from "../logger/logger.service";
import {RestaurantRoutes} from "../restaurant/routes/restaurant.route";
import {OrderRoutes} from "../order/routes/order.route";
import {PrintDataRoutes} from "../copydata/routes/copy-data.route";
import {StatisticRoutes} from "../statistics/routes/statistic.route";

const configuration = new ConfigurationService();
export const start = () => {
    const app: Application = express();
    app.use(express.json());
    app.use(cors({origin: "*"}));
    app.use("/api/restaurant",RestaurantRoutes);
    app.use("/api/order",OrderRoutes);
    app.use("/api/printer",PrintDataRoutes);
    app.use("/api/statistics",StatisticRoutes);
    app.listen(configuration.serverPort, () => Logger.success(`Server is run at ${configuration.serverPort} port!`))
}

export const errorHandler = ()=> {
    Logger.error('SERVER cannot be start because have an problem..')
}