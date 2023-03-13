import {DocumentType} from '@typegoose/typegoose';
import {Statistic, StatisticModel} from '../model/statistic.model';
import {OrderModel} from '../../order/model/order.model';
import {Logger} from '../../services/logger/logger.service';

export class StatisticDAO {
    private static loggerService = new Logger();

    public static async BackUp(id: string, payWithCard: boolean): Promise<void> {
        const order = await OrderModel.findOne({_id: id});
        const statistics: DocumentType<Statistic> = {
            ...order,
            payWithCard: payWithCard
        } as DocumentType<Statistic>
        await StatisticModel.insertMany(statistics);
        this.loggerService.info(`[BACKUP] store order with ${id} id...`);
    }

    public static async getStatistics(restaurantId: string): Promise<DocumentType<Statistic>[]> {
        this.loggerService.info(`[GET] ${restaurantId} statistics`);
        return StatisticModel.find({restaurantId: restaurantId});
    }
}
