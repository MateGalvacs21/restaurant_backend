import {DocumentType} from "@typegoose/typegoose";
import {Statistic, StatisticModel} from "../model/statistic.model";
import {OrderModel} from "../../order/model/order.model";
import {Logger} from "../../logger/logger.service";

export class StatisticDAO {
    public static async BackUp(id: string): Promise<void> {
        const order = await OrderModel.findOne({_id: id});
        await StatisticModel.insertMany(order as DocumentType<Statistic>);
        Logger.info(`[BACKUP] store order with ${id} id...`);
    }

    public static async getStatistics(restaurantId:string): Promise<Statistic[]>{
        Logger.info(`[GET] ${restaurantId} statistics`);
        return StatisticModel.find({restaurantId:restaurantId});
    }
}