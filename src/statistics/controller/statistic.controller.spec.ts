import { OrderCollectionMock } from '@root/shared/mocks/data-mocks/order.mock';
import { Request, Response } from 'express';
import { StatisticService } from '@root/statistics/service/statistic.service';
import { StatisticController } from '@root/statistics/controller/statistic.controller';
import { StatusCodes } from 'http-status-codes';
import { StatisticMapper } from '@root/statistics/mapper/statistic.mapper';
import { DocumentType } from '@typegoose/typegoose';
import { Statistic } from '@root/statistics/model/statistic.model';

describe('Statistics Controller', () => {
	const reqMock = {
		params: {
			restaurantId: OrderCollectionMock.order.restaurantId,
			payWithCard: false,
			id: OrderCollectionMock.order._id.toString()
		}
	} as unknown as Request;
	const controller = new StatisticController();

	it('should get all backups with 200 status by restaurantId', async () => {
		const resMock = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		} as unknown as Response;
		const stat = {
			...OrderCollectionMock.order,
			payWithCard: false
		} as DocumentType<Statistic>;

		const backup = StatisticMapper.mapToDTO(stat);
		const serviceSpy = jest.spyOn(StatisticService, 'getStatistics').mockResolvedValue([backup]);
		await controller.getStatistics(reqMock, resMock);

		expect(serviceSpy).toHaveBeenCalledWith(reqMock.params.restaurantId);
		expect(resMock.status).toHaveBeenCalledWith(StatusCodes.OK);
		expect(resMock.json).toHaveBeenCalledWith([backup]);
	});

	it('should return empty list backups with 200 status', async () => {
		const resMock = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		} as unknown as Response;
		const serviceSpy = jest.spyOn(StatisticService, 'getStatistics').mockResolvedValue([]);
		await controller.getStatistics(reqMock, resMock);

		expect(serviceSpy).toHaveBeenCalledWith(reqMock.params.restaurantId);
		expect(resMock.status).toHaveBeenCalledWith(StatusCodes.OK);
		expect(resMock.json).toHaveBeenCalledWith([]);
	});

	it('should throw error with 404 any problem', async () => {
		const resMock = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		} as unknown as Response;
		const serviceSpy = jest.spyOn(StatisticService, 'getStatistics').mockRejectedValue(new Error('Test error'));
		try {
			await controller.getStatistics(reqMock, resMock);
			expect(serviceSpy).toHaveBeenCalledWith(reqMock.params.restaurantId);
		} catch (error) {
			expect(resMock.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
			expect(resMock.json).toHaveBeenCalledWith({ error: error.message });
		}
	});

	it('should backUp if everything is good', async () => {
		const resMock = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		} as unknown as Response;
		const serviceSpy = jest.spyOn(StatisticService, 'BackUp').mockResolvedValue(null);
		await controller.backUpStatistics(reqMock, resMock);

		expect(serviceSpy).toHaveBeenCalledWith(OrderCollectionMock.order._id.toString(), false);
		expect(resMock.status).toHaveBeenCalledWith(StatusCodes.OK);
		expect(resMock.json).toHaveBeenCalledWith({ stored: OrderCollectionMock.order._id.toString() });
	});

	it('should throw error with 404 any problem with backup', async () => {
		const resMock = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		} as unknown as Response;
		const serviceSpy = jest.spyOn(StatisticService, 'BackUp').mockRejectedValue(new Error('Test error'));
		try {
			await controller.backUpStatistics(reqMock, resMock);
			expect(serviceSpy).toHaveBeenCalledWith(OrderCollectionMock.order._id.toString(), false);
		} catch (error) {
			expect(resMock.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
			expect(resMock.json).toHaveBeenCalledWith({ error: error.message });
		}
	});
});
