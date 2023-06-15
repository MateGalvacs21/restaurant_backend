import { StatisticDAO } from '@root/statistics/dao/statistic.dao';
import { StatisticService } from '@root/statistics/service/statistic.service';
import { OrderCollectionMock } from '@root/shared/mocks/data-mocks/order.mock';
import { DocumentType } from '@typegoose/typegoose';
import { Statistic } from '@root/statistics/model/statistic.model';
import { StatisticMapper } from '@root/statistics/mapper/statistic.mapper';

describe('Statistics Service', () => {
	it('should backup success an order', async () => {
		const backUpMock = jest.spyOn(StatisticDAO, 'BackUp').mockResolvedValue(null);
		await StatisticService.BackUp(OrderCollectionMock.order._id.toString(), false);

		expect(backUpMock).toHaveBeenCalledWith(OrderCollectionMock.order._id.toString(), false);
	});

	it('should get all backup by restaurant id', async () => {
		const statistics = {
			...OrderCollectionMock.order,
			payWithCard: false
		} as DocumentType<Statistic>;
		const getBackupSpy = jest.spyOn(StatisticDAO, 'getStatistics').mockResolvedValue([statistics]);
		const backUps = await StatisticService.getStatistics(OrderCollectionMock.order.restaurantId, OrderCollectionMock.order.date);

		expect(getBackupSpy).toHaveBeenCalledWith(OrderCollectionMock.order.restaurantId);
		expect(backUps[0]).toEqual(StatisticMapper.mapToDTO(statistics));
	});

	it('should return empty list if restaurant has no statistics', async () => {
		const getBackupSpy = jest.spyOn(StatisticDAO, 'getStatistics').mockResolvedValue([]);
		const backUps = await StatisticService.getStatistics(OrderCollectionMock.order.restaurantId, OrderCollectionMock.order.date);

		expect(getBackupSpy).toHaveBeenCalledWith(OrderCollectionMock.order.restaurantId);
		expect(backUps).toEqual([]);
	});
});
