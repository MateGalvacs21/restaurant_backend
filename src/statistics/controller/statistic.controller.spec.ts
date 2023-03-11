import {OrderCollectionMock} from "@root/shared/mocks/data-mocks/order.mock";
import {Request, Response} from "express";
import {StatisticService} from "@root/statistics/service/statistic.service";
import {OrderMapper} from "@root/order/mapper/order/order.mapper";
import {StatisticController} from "@root/statistics/controller/statistic.controller";
import {StatusCodes} from "http-status-codes";

describe('Statistics Controller', () => {
    const reqMock = ({
        params: {
            restaurantId: OrderCollectionMock.order.restaurantId
        }
    } as unknown) as Request
    const controller = new StatisticController();

    it('should get all backups with 200 status by restaurantId', async () => {
        const resMock = ({
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown) as Response;
        const backup = OrderMapper.mapToDTO(OrderCollectionMock.order);
        const serviceSpy= jest.spyOn(StatisticService,'getStatistics').mockResolvedValue([backup]);
        await controller.getStatistics(reqMock,resMock);

        expect(serviceSpy).toHaveBeenCalledWith(reqMock.params.restaurantId);
        expect(resMock.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(resMock.json).toHaveBeenCalledWith([backup]);
    });

    it('should return empty list backups with 200 status', async () => {
        const resMock = ({
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown) as Response;
        const serviceSpy= jest.spyOn(StatisticService,'getStatistics').mockResolvedValue([]);
        await controller.getStatistics(reqMock,resMock);

        expect(serviceSpy).toHaveBeenCalledWith(reqMock.params.restaurantId);
        expect(resMock.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(resMock.json).toHaveBeenCalledWith([]);
    });

    it('should throw error with 404 any problem', async () => {
        const resMock = ({
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown) as Response;
        const serviceSpy= jest.spyOn(StatisticService,'getStatistics').mockRejectedValue(new Error('Test error'));
        try {
            await controller.getStatistics(reqMock,resMock);
            expect(serviceSpy).toHaveBeenCalledWith(reqMock.params.restaurantId);
        }catch (error){
            expect(resMock.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
            expect(resMock.json).toHaveBeenCalledWith({error: error.message});
        }
    });
});