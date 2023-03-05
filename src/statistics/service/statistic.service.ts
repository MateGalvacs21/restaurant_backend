import {Order} from "../../order/model/order.model";
import {DocumentType} from "@typegoose/typegoose";
import {Logger} from "../../services/logger/logger.service";
import {StatisticDAO} from "../dao/statistic.dao";
import {OrderDTO} from "../../models/order.dto";
import {OrderMapper} from "../../order/mapper/order/order.mapper";

export class StatisticService{
    public static async BackUp(id: string): Promise<void> {
        await StatisticDAO.BackUp(id);
        Logger.success(`Store was successfully`);
    }

    public static async getStatistics(restaurantId:string): Promise<OrderDTO[]>{
        const statistics = await StatisticDAO.getStatistics(restaurantId);
        Logger.success(`${restaurantId} statistics fetched successfully`);
        return OrderMapper.mapToDTOList(statistics as DocumentType<Order[]>);
    }
}