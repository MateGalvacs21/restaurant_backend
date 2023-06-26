import { DocumentType } from '@typegoose/typegoose';
import { Order } from '@root/order/model/order.model';
import { OrderItemMapper } from '@root/order/mapper/order/helper/order-item.mapper';
import { Types } from 'mongoose';
import { OrderItemDTO } from '@root/shared/models/order-item.dto';
import { PatchOrder, PostOrder } from '@root/shared/models/order.dto';
import { OrderItem } from '@root/order/model/helper/order-item.model';

export const OrderCollectionMock = {
	get order(): DocumentType<Order> {
		return {
			_id: new Types.ObjectId('640cf2c4fa1c6aae619f8494'),
			table: 'B1',
			date: new Date('2023-03-10').toString(),
			restaurantId: '63cc776b9c1f72057706a601',
			amount: 15000,
			afa27: 0,
			afa5: 15000,
			items: OrderItemMapper.mapItemToDAOList([
				{
					name: 'TestEtel',
					price: 3000,
					afa: 5,
					items: ['example'],
					itemsOriginalCount: 1,
					extraItems: [],
					removedItems: [],
					type: 'Leves',
					nickname: 'asd'
				},
				{
					name: 'TestEtel',
					price: 2000,
					afa: 5,
					items: ['example'],
					itemsOriginalCount: 1,
					extraItems: [],
					removedItems: [],
					type: 'Leves',
					nickname: 'asd'
				},
				{
					name: 'TestEtel',
					price: 3000,
					afa: 5,
					items: ['example'],
					itemsOriginalCount: 1,
					extraItems: [],
					removedItems: [],
					type: 'desszert',
					nickname: 'asd'
				},
				{
					name: 'TestEtel',
					price: 2000,
					afa: 5,
					items: ['example'],
					itemsOriginalCount: 1,
					extraItems: [],
					removedItems: [],
					type: 'martas',
					nickname: 'asd'
				},
				{
					name: 'TestEtel',
					price: 3000,
					afa: 5,
					items: ['example'],
					itemsOriginalCount: 1,
					extraItems: [],
					removedItems: [],
					type: 'salata',
					nickname: 'asd'
				},
				{
					name: 'TestEtel',
					price: 2000,
					afa: 5,
					items: ['example'],
					itemsOriginalCount: 1,
					extraItems: [],
					removedItems: [],
					type: 'foetel',
					nickname: 'asd'
				}
			])
		} as DocumentType<Order>;
	},
	get orderItemDTO(): OrderItemDTO {
		return {
			name: 'test',
			nickname: 'test nickname',
			price: 5000,
			afa: 5,
			items: ['ex'],
			itemsOriginalCount: 1,
			extraItems: [],
			type: 'foetel',
			removedItems: []
		};
	},
	get patchOrder(): PatchOrder {
		return {
			items: [
				...OrderItemMapper.mapItemToDTOList(OrderCollectionMock.order.items),
				{
					name: 'TestEtel',
					price: 3000,
					afa: 5,
					items: ['example'],
					itemsOriginalCount: 1,
					extraItems: [],
					removedItems: [],
					type: 'salata',
					nickname: 'asd',
				}
			],
			id: OrderCollectionMock.order._id.toString(),
			amount: OrderCollectionMock.order.amount + 3000,
			afa5: OrderCollectionMock.order.afa5 +3000,
			afa27: OrderCollectionMock.order.afa27
		};
	},

	get patchedOrderDAO(): DocumentType<Order> {
		const items: DocumentType<OrderItem> = {
			items: ['ex'],
			itemsOriginalCount: 1,
			extraItems: [],
			removedItems: [],
			type: 'Leves',
			nickname: 'test',
			afa: 5,
			price: 5000,
			name: 'tester'
		} as DocumentType<OrderItem>;
		return {
			_id: new Types.ObjectId('640cf2c4fa1c6aae619f8494'),
			table: 'T3',
			afa5: 5000,
			afa27: 0,
			amount: 5000,
			date: '2023-03-12',
			restaurantId: '63cc776b9c1f72057706a601',
			items: [
				items,
				{
					name: 'TestEtel',
					price: 3000,
					afa: 5,
					items: ['example'],
					itemsOriginalCount: 1,
					extraItems: [],
					removedItems: [],
					type: 'salata',
					nickname: 'asd'
				}
			]
		} as DocumentType<Order>;
	},
	get postOrder(): PostOrder {
		return {
			table: 'T2',
			amount: OrderCollectionMock.order.amount,
			restaurantId: '63cc776b9c1f72057706a601',
			items: OrderItemMapper.mapItemToDTOList(OrderCollectionMock.order.items)
		};
	}
};
