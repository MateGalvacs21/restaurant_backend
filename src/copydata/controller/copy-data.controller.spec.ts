import { Request, Response } from 'express';
import { CopyDataService } from '@root/copydata/service/copy-data.service';
import { CopyDataMapper } from '@root/copydata/mapper/copy-data.mapper';
import { OrderCollectionMock } from '@root/shared/mocks/data-mocks/order.mock';
import { CopyDataController } from '@root/copydata/controller/copy-data.controller';
import { StatusCodes } from 'http-status-codes';

describe('Copy-data Controller', () => {
	const reqMock = {
		params: {
			restaurantId: 'Test',
			table: OrderCollectionMock.order.table
		}
	} as unknown as Request;
	const controller = new CopyDataController();
	const copiedData = CopyDataMapper.mapToCopyDAO(OrderCollectionMock.order);

	describe('getAllData', () => {
		it('should get copied data by restaurant id', async () => {
			const serviceMock = jest.spyOn(CopyDataService, 'getAllData').mockResolvedValue([copiedData]);
			const resMock = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			} as unknown as Response;
			await controller.getAllData(reqMock, resMock);

			expect(serviceMock).toHaveBeenCalledWith(reqMock.params.restaurantId);
			expect(resMock.status).toHaveBeenCalledWith(StatusCodes.OK);
			expect(resMock.json).toHaveBeenCalledWith([copiedData]);
		});

		it('should return empty list if restaurant has not copied data', async () => {
			const serviceMock = jest.spyOn(CopyDataService, 'getAllData').mockResolvedValue([]);
			const resMock = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			} as unknown as Response;
			await controller.getAllData(reqMock, resMock);

			expect(serviceMock).toHaveBeenCalledWith(reqMock.params.restaurantId);
			expect(resMock.status).toHaveBeenCalledWith(StatusCodes.OK);
			expect(resMock.json).toHaveBeenCalledWith([]);
		});

		it('should thrown an error if be anything problem', async () => {
			const serviceMock = jest.spyOn(CopyDataService, 'getAllData').mockRejectedValue(new Error('test error'));
			const resMock = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			} as unknown as Response;
			try {
				await controller.getAllData(reqMock, resMock);
				expect(serviceMock).toHaveBeenCalledWith(reqMock.params.restaurantId);
			} catch (error) {
				expect(resMock.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
				expect(resMock.json).toHaveBeenCalledWith({ error: error.message });
			}
		});
	});

	describe('deleteData', () => {
		it('should delete copied data by restaurant id and table', async () => {
			const serviceMock = jest.spyOn(CopyDataService, 'deleteData').mockResolvedValue(null);
			const resMock = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			} as unknown as Response;
			await controller.deleteData(reqMock, resMock);

			expect(serviceMock).toHaveBeenCalledWith(reqMock.params.restaurantId, reqMock.params.table);
			expect(resMock.status).toHaveBeenCalledWith(StatusCodes.OK);
			expect(resMock.json).toHaveBeenCalledWith({ deletedTable: reqMock.params.table });
		});

		it('should thrown an error if be anything problem with delete', async () => {
			const serviceMock = jest.spyOn(CopyDataService, 'deleteData').mockRejectedValue(new Error('test error'));
			const resMock = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			} as unknown as Response;
			try {
				await controller.deleteData(reqMock, resMock);
				expect(serviceMock).toHaveBeenCalledWith(reqMock.params.restaurantId, reqMock.params.table);
			} catch (error) {
				expect(resMock.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
				expect(resMock.json).toHaveBeenCalledWith({ error: error.message });
			}
		});
	});
});
