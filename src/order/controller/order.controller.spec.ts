import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { OrderCollectionMock } from '@root/shared/mocks/data-mocks/order.mock';
import { OrderController } from '@root/order/controller/order.controller';
import { OrderItemMapper } from '@root/order/mapper/order/helper/order-item.mapper';
import { OrderService } from '@root/order/service/order.service';
import { OrderMapper } from '@root/order/mapper/order/order.mapper';

describe('Order controller', () => {
	const orderController = new OrderController();

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe('GetOrdersByRestaurant', () => {
		const reqMock = {
			params: {
				restaurantId: OrderCollectionMock.order.restaurantId
			}
		} as unknown as Request;

		it('should return orders by restaurant and 200 status if data is correct', async () => {
			const serviceSpy = jest.spyOn(OrderService, 'getOrdersByRestaurant').mockResolvedValue(OrderMapper.mapToDTOList([OrderCollectionMock.order]));
			const resMock = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			} as unknown as Response;
			await orderController.getOrdersByRestaurant(reqMock, resMock);

			expect(serviceSpy).toHaveBeenCalled();
			expect(resMock.status).toHaveBeenCalledWith(StatusCodes.OK);
			expect(resMock.json).toHaveBeenCalledWith(OrderMapper.mapToDTOList([OrderCollectionMock.order]));
		});

		it('should return 400 if orders by restaurant query drop error', async () => {
			const serviceSpy = jest.spyOn(OrderService, 'getOrdersByRestaurant').mockRejectedValue(new Error('error'));
			const resMock = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			} as unknown as Response;

			try {
				await orderController.getOrdersByRestaurant(reqMock, resMock);
				expect(serviceSpy).toHaveBeenCalled();
			} catch (error) {
				expect(resMock.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
				expect(resMock.json).toHaveBeenCalledWith({ error: error.message });
			}
		});
	});

	describe('GetOrdersByTable', () => {
		const reqMock = {
			params: {
				table: OrderCollectionMock.order.table
			}
		} as unknown as Request;

		it('should sent 200 status and return orders by table', async () => {
			const resMock = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			} as unknown as Response;
			const serviceSpy = jest.spyOn(OrderService, 'getOrdersByTable').mockResolvedValue(OrderMapper.mapToDTOList([OrderCollectionMock.order]));

			await orderController.getOrdersByTable(reqMock, resMock);

			expect(serviceSpy).toHaveBeenCalled();
			expect(resMock.status).toHaveBeenCalledWith(StatusCodes.OK);
			expect(resMock.json).toHaveBeenCalledWith(OrderMapper.mapToDTOList([OrderCollectionMock.order]));
		});

		it('should return 404 if service thrown anything error', async () => {
			const serviceSpy = jest.spyOn(OrderService, 'getOrdersByTable').mockRejectedValue(new Error('Test Error'));

			const resMock = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			} as unknown as Response;

			try {
				await orderController.getOrdersByTable(reqMock, resMock);
				expect(serviceSpy).toHaveBeenCalled();
			} catch (error) {
				expect(resMock.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
				expect(resMock.json).toHaveBeenCalledWith({ error: error.message });
			}
		});
	});

	describe('deleteOrder', () => {
		const reqMock = {
			params: {
				id: OrderCollectionMock.order._id.toString()
			}
		} as unknown as Request;

		it('should sent 200 status and remove order from database', async () => {
			const resMock = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			} as unknown as Response;
			const serviceSpy = jest.spyOn(OrderService, 'deleteOrder').mockResolvedValue(null);

			await orderController.deleteOrder(reqMock, resMock);

			expect(serviceSpy).toHaveBeenCalled();
			expect(resMock.status).toHaveBeenCalledWith(StatusCodes.OK);
			expect(resMock.json).toHaveBeenCalledWith({ deleteId: reqMock.params.id });
		});

		it('should return 404 if service throw error', async () => {
			const serviceSpy = jest.spyOn(OrderService, 'deleteOrder').mockRejectedValue(new Error('Test Error'));

			const resMock = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			} as unknown as Response;

			try {
				await orderController.deleteOrder(reqMock, resMock);
				expect(serviceSpy).toHaveBeenCalled();
			} catch (error) {
				expect(resMock.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
				expect(resMock.json).toHaveBeenCalledWith({ error: error.message });
			}
		});
	});

	describe('PostOrder', () => {
		const reqMock = {
			body: {
				items: OrderItemMapper.mapItemToDTOList(OrderCollectionMock.order.items),
				amount: OrderCollectionMock.order.amount,
				restaurantId: '63cc776b9c1f72057706a601',
				table: OrderCollectionMock.order.table
			}
		} as unknown as Request;

		it('should return order and 201 status if data is correct', async () => {
			const serviceSpy = jest.spyOn(OrderService, 'postOrder').mockResolvedValue(OrderMapper.mapToDTO(OrderCollectionMock.order));
			const resMock = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			} as unknown as Response;

			await orderController.postOrder(reqMock, resMock);

			expect(resMock.status).toHaveBeenCalledWith(StatusCodes.CREATED);
			expect(serviceSpy).toHaveBeenCalled();
			expect(resMock.json).toHaveBeenCalledWith(OrderMapper.mapToDTO(OrderCollectionMock.order));
		});

		it('should return 500 if anything error catch', async () => {
			const serviceSpy = jest.spyOn(OrderService, 'postOrder').mockRejectedValue(new Error('error catch'));
			const resMock = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			} as unknown as Response;

			try {
				await orderController.postOrder(reqMock, resMock);
				expect(serviceSpy).toHaveBeenCalled();
			} catch (error) {
				expect(resMock.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
				expect(resMock.json).toHaveBeenCalledWith({ error: error.message });
			}
		});
	});

	describe('PatchOrder', () => {
		const reqMock = {
			params: {
				id: OrderCollectionMock.order._id.toString()
			},
			body: {
				items: OrderItemMapper.mapItemToDTOList(OrderCollectionMock.order.items),
				amount: OrderCollectionMock.order.amount
			}
		} as unknown as Request;

		it('should return with updated order and 202 status if data is correct', async () => {
			const serviceSpy = jest.spyOn(OrderService, 'patchOrder').mockResolvedValue(OrderMapper.mapToDTO(OrderCollectionMock.order));
			const resMock = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			} as unknown as Response;

			await orderController.patchOrder(reqMock, resMock);

			expect(resMock.status).toHaveBeenCalledWith(StatusCodes.ACCEPTED);
			expect(serviceSpy).toHaveBeenCalled();
			expect(resMock.json).toHaveBeenCalledWith(OrderMapper.mapToDTO(OrderCollectionMock.order));
		});

		it('should return 404 if anything error catch', async () => {
			const serviceSpy = jest.spyOn(OrderService, 'patchOrder').mockRejectedValue(new Error('Some error'));
			const resMock = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			} as unknown as Response;

			try {
				await orderController.patchOrder(reqMock, resMock);
				expect(serviceSpy).toHaveBeenCalled();
			} catch (error) {
				expect(resMock.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
				expect(resMock.json).toHaveBeenCalledWith({ error: error.message });
			}
		});
	});
});
