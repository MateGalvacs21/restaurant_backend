import { DocumentType } from '@typegoose/typegoose';
import { Statistic } from '@root/statistics/model/statistic.model';

import { OrderItemMapper } from '../../order/mapper/order/helper/order-item.mapper';

export class StatisticMapper {
	public static mapToDTO(stat: DocumentType<Statistic>) {
		return {
			restaurantId: stat.restaurantId,
			items: OrderItemMapper.mapItemToDTOList(stat.items),
			amount: stat.amount,
			table: stat.table,
			afa27: stat.afa27,
			afa5: stat.afa5,
			date: stat.date,
			id: stat.id,
			payWithCard: stat.card
		};
	}

	public static mapToDTOList(stats: DocumentType<Statistic>[]) {
		return stats.map((stat) => this.mapToDTO(stat));
	}
}
