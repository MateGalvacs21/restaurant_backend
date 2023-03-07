import { DocumentType } from '@typegoose/typegoose';
import { Statistic, StatisticModel } from '../model/statistic.model';
import { OrderModel } from '../../order/model/order.model';
import { Logger } from '../../services/logger/logger.service';

export class StatisticDAO {
	private static loggerService = new Logger();

	public static async BackUp(id: string): Promise<void> {
		const order = await OrderModel.findOne({ _id: id });
		await StatisticModel.insertMany(order as DocumentType<Statistic>);
		this.loggerService.info(`[BACKUP] store order with ${id} id...`);
	}

	public static async getStatistics(restaurantId: string): Promise<Statistic[]> {
		this.loggerService.info(`[GET] ${restaurantId} statistics`);
		return StatisticModel.find({ restaurantId: restaurantId });
	}
}
