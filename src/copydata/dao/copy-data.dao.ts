import {OrderDTO} from "../../models/order.dto";
import {DocumentType} from "@typegoose/typegoose";
import {CopyData, CopyDataModel} from "../model/copy-data.model";
import {CopyDataMapper} from "../mapper/copy-data.mapper";
import {Logger} from "../../services/logger/logger.service";

export class CopyDataDAO {
    public static async CopyData(order: OrderDTO): Promise<DocumentType<CopyData>> {
        const data = CopyDataMapper.mapToCopyData(order);
        Logger.info(`[POST] copy order with ${order.id} to print...`);
        return CopyDataModel.create(CopyDataMapper.mapToDAO(data));
    }

    public static async deleteData(restaurantId: string, table: string): Promise<void> {
        CopyDataModel.findOneAndDelete({table: table, restaurantId: restaurantId});
        Logger.info('[DELETE] data printing....')
    }

    public static async getAllData(restaurantId: string): Promise<CopyData[]> {
        Logger.info(`[GET] print data to ${restaurantId}`);
        return CopyDataModel.find({restaurantId: restaurantId});
    }
}