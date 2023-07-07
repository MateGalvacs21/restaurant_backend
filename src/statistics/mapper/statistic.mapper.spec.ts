import { OrderCollectionMock } from '@root/shared/mocks/data-mocks/order.mock';
import { DocumentType } from '@typegoose/typegoose';
import { Statistic } from '@root/statistics/model/statistic.model';
import { StatisticMapper } from '@root/statistics/mapper/statistic.mapper';

describe('Statistics Mapper', () => {
	it('should return dto from statistics', () => {
		const stat = {
			...OrderCollectionMock.order,
			card: 'false'
		} as DocumentType<Statistic>;

		const mapped = StatisticMapper.mapToDTO(stat);

		expect(mapped.payWithCard).toEqual(stat.card);
		expect(mapped.restaurantId).toEqual(stat.restaurantId);
	});

	it('should return dto list from statistics list', () => {
		const stat = [
			{
				...OrderCollectionMock.order,
				card: 'false'
			}
		] as DocumentType<Statistic>[];

		const mapped = StatisticMapper.mapToDTOList(stat);

		expect(mapped[0].payWithCard).toEqual(stat[0].card);
		expect(mapped[0].restaurantId).toEqual(stat[0].restaurantId);
	});
});
