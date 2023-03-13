import { OrderModel } from '@root/order/model/order.model';
import { OrderCollectionMock } from '@root/shared/mocks/data-mocks/order.mock';
import { OrderDAO } from '@root/order/dao/order.dao';
import { OrderItemDTO } from '@root/shared/models/order-item.dto';
import { PostOrder } from '@root/shared/models/order.dto';
import { OrderItemMapper } from '@root/order/mapper/order/helper/order-item.mapper';
import { CopyDataService } from '@root/copydata/service/copy-data.service';
import { OrderMapper } from '@root/order/mapper/order/order.mapper';

describe('OrderDao', () => {
	describe('getOrdersByRestaurantId', () => {
		it('should return orders by restaurant id', async () => {
			OrderModel.find = jest.fn().mockResolvedValue([OrderCollectionMock.order]);
			const orders = await OrderDAO.getOrdersByRestaurant(OrderCollectionMock.order.restaurantId);

			expect(OrderModel.find).toHaveBeenCalledWith({ restaurantId: OrderCollectionMock.order.restaurantId });
			expect(orders[0]).toEqual(OrderCollectionMock.order);
		});

		it('should return empty list if restaurant has no order', async () => {
			OrderModel.find = jest.fn().mockResolvedValue([]);
			const orders = await OrderDAO.getOrdersByRestaurant(OrderCollectionMock.order.restaurantId);

			expect(OrderModel.find).toHaveBeenCalledWith({ restaurantId: OrderCollectionMock.order.restaurantId });
			expect(orders).toEqual([]);
		});
	});

	describe('getOrdersByTable', () => {
		it('should return orders by table', async () => {
			OrderModel.find = jest.fn().mockResolvedValue([OrderCollectionMock.order]);
			const orders = await OrderDAO.getOrdersByTable(OrderCollectionMock.order.table);

			expect(OrderModel.find).toHaveBeenCalledWith({ table: OrderCollectionMock.order.table });
			expect(orders[0]).toEqual(OrderCollectionMock.order);
		});

		it('should return empty list if restaurant table has no order', async () => {
			OrderModel.find = jest.fn().mockResolvedValue([]);
			const orders = await OrderDAO.getOrdersByTable(OrderCollectionMock.order.table);

			expect(OrderModel.find).toHaveBeenCalledWith({ table: OrderCollectionMock.order.table });
			expect(orders).toEqual([]);
		});
	});

	describe('deleteOrder', () => {
		it('should delete order by id', async () => {
			OrderModel.findOneAndDelete = jest.fn().mockResolvedValue(null);
			await OrderDAO.deleteOrder(OrderCollectionMock.order._id.toString());

			expect(OrderModel.findOneAndDelete).toHaveBeenCalledWith({ _id: OrderCollectionMock.order._id.toString() });
		});
	});

	describe('patchOrder', () => {
		it('should update order with new items and amount', async () => {
			const orderItem: OrderItemDTO = {
				items: ['test'],
				removedItems: [],
				type: 'foetel',
				extraItems: [],
				itemsOriginalCount: 1,
				afa: 5,
				price: 3000,
				name: 'tester',
				nickname: 'nickTest'
			};
			const items = [...OrderCollectionMock.order.items, orderItem];
			OrderModel.findOneAndUpdate = jest.fn().mockResolvedValue({
				...OrderCollectionMock.order,
				items: items,
				amount: OrderCollectionMock.order.amount + 3000
			});
			await OrderDAO.patchOrder({
				id: OrderCollectionMock.order._id.toString(),
				amount: OrderCollectionMock.order.amount + 3000,
				items: items
			});

			expect(OrderModel.findOneAndUpdate).toHaveBeenCalledWith(
				{ _id: OrderCollectionMock.order._id.toString() },
				{
					$set: {
						amount: OrderCollectionMock.order.amount + 3000,
						items: items
					}
				},
				{ new: true }
			);
		});
	});

	describe('postOrder', () => {
		it('should add an new order and copy if have food', async () => {
			const postedOrder: PostOrder = {
				table: 'T2',
				amount: OrderCollectionMock.order.amount,
				restaurantId: '63cc776b9c1f72057706a601',
				items: OrderItemMapper.mapItemToDTOList(OrderCollectionMock.order.items)
			};
			const orderDAO = OrderMapper.mapToDAO(postedOrder);
			const copyServiceSpy = jest.spyOn(CopyDataService, 'copyData').mockResolvedValue(orderDAO);
			OrderModel.create = jest.fn().mockResolvedValue(orderDAO);
			const order = await OrderDAO.postOrder(postedOrder);

			expect(OrderModel.create).toHaveBeenCalled();
			expect(order.items).toEqual(OrderCollectionMock.order.items);
			expect(order.amount).toEqual(15000);
			expect(order.table).toEqual('T2');
			expect(order.restaurantId).toEqual(postedOrder.restaurantId);
			expect(copyServiceSpy).toHaveBeenCalled();
		});
	});
});
