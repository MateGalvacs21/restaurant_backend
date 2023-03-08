import { Order } from '../../order/model/order.model';
import { DocumentType } from '@typegoose/typegoose';
import { Logger } from '../../services/logger/logger.service';
import { StatisticDAO } from '../dao/statistic.dao';
import { OrderDTO } from '../../shared/models/order.dto';
import { OrderMapper } from '../../order/mapper/order/order.mapper';

export class StatisticService {
	private static loggerService = new Logger();
	public static async BackUp(id: string): Promise<void> {
		await StatisticDAO.BackUp(id);
		this.loggerService.success(`Store was successfully`);
	}

	public static async getStatistics(restaurantId: string): Promise<OrderDTO[]> {
		const statistics = await StatisticDAO.getStatistics(restaurantId);
		this.loggerService.success(`${restaurantId} statistics fetched successfully`);
		return OrderMapper.mapToDTOList(statistics as DocumentType<Order>[]);
	}
}
