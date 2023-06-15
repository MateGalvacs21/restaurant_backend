import { DocumentType } from '@typegoose/typegoose';
import { Statistic, StatisticModel } from '../model/statistic.model';
import { OrderModel } from '../../order/model/order.model';
import { Logger } from '../../services/logger/logger.service';

export class StatisticDAO {
    private static loggerService = new Logger();

    public static async BackUp(id: string, payWithCard: boolean): Promise<void> {
        const order = await OrderModel.findOne({_id: id});
        const statistics: DocumentType<Statistic> = {
            _id: order._id,
            items: order.items,
            date: order.date,
            table: order.table,
            restaurantId: order.restaurantId,
            amount: order.amount,
            afa5: order.afa5,
            afa27: order.afa27,
            payWithCard: payWithCard
        } as DocumentType<Statistic>;
        await StatisticModel.insertMany(statistics);
        this.loggerService.info(`[BACKUP] store order with ${id} id...`);
    }

    public static async getStatistics(restaurantId: string): Promise<DocumentType<Statistic>[]> {
        this.loggerService.info(`[GET] ${restaurantId} statistics`);
        return StatisticModel.find({restaurantId: restaurantId});
    }
}
