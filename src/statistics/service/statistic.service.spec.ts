import {StatisticDAO} from "@root/statistics/dao/statistic.dao";
import {StatisticService} from "@root/statistics/service/statistic.service";
import {OrderCollectionMock} from "@root/shared/mocks/data-mocks/order.mock";
import {OrderMapper} from "@root/order/mapper/order/order.mapper";

describe('Statistics Service', ()=>{
    it('should backup success an order', async ()=> {
        const backUpMock = jest.spyOn(StatisticDAO,'BackUp').mockResolvedValue(null);
        await StatisticService.BackUp(OrderCollectionMock.order._id.toString());

        expect(backUpMock).toHaveBeenCalledWith(OrderCollectionMock.order._id.toString());
    });

    it('should get all backup by restaurant id',async ()=>{
        const getBackupSpy= jest.spyOn(StatisticDAO,'getStatistics').mockResolvedValue([OrderCollectionMock.order]);
        const backUps = await StatisticService.getStatistics(OrderCollectionMock.order.restaurantId);

        expect(getBackupSpy).toHaveBeenCalledWith(OrderCollectionMock.order.restaurantId);
        expect(backUps[0]).toEqual(OrderMapper.mapToDTO(OrderCollectionMock.order));
    });

    it('should return empty list if restaurant has no statistics',async ()=>{
        const getBackupSpy= jest.spyOn(StatisticDAO,'getStatistics').mockResolvedValue([]);
        const backUps = await StatisticService.getStatistics(OrderCollectionMock.order.restaurantId);

        expect(getBackupSpy).toHaveBeenCalledWith(OrderCollectionMock.order.restaurantId);
        expect(backUps).toEqual([]);
    });

});