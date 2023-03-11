import {StatisticModel} from "@root/statistics/model/statistic.model";
import {OrderCollectionMock} from "@root/shared/mocks/data-mocks/order.mock";
import {OrderModel} from "@root/order/model/order.model";
import {StatisticDAO} from "@root/statistics/dao/statistic.dao";

describe('StatisticsDao',()=>{
   it('should backup after after close an order',async()=>{
      StatisticModel.insertMany= jest.fn().mockResolvedValue(OrderCollectionMock.order);
      OrderModel.findOne = jest.fn().mockResolvedValue(OrderCollectionMock.order);
      await StatisticDAO.BackUp(OrderCollectionMock.order._id.toString());

      expect(OrderModel.findOne).toHaveBeenCalledWith({_id:OrderCollectionMock.order._id.toString()});
      expect(StatisticModel.insertMany).toHaveBeenCalledWith(OrderCollectionMock.order);
   });

   it('should getAllStatistics by restaurant id', async ()=> {
      StatisticModel.find = jest.fn().mockResolvedValue([OrderCollectionMock.order]);
      const statistics = await StatisticDAO.getStatistics(OrderCollectionMock.order.restaurantId);

      expect(StatisticModel.find).toHaveBeenCalledWith({restaurantId: OrderCollectionMock.order.restaurantId});
      expect(statistics[0]).toEqual(OrderCollectionMock.order);
   });

   it('should return empty list if no have backup', async ()=> {
      StatisticModel.find = jest.fn().mockResolvedValue([]);
      const statistics = await StatisticDAO.getStatistics(OrderCollectionMock.order.restaurantId);

      expect(StatisticModel.find).toHaveBeenCalledWith({restaurantId: OrderCollectionMock.order.restaurantId});
      expect(statistics).toEqual([]);
   });

});