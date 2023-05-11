import { OrderCollectionMock } from '@root/shared/mocks/data-mocks/order.mock';
import { OrderMapper } from '@root/order/mapper/order/order.mapper';
import { PostOrder } from '@root/shared/models/order.dto';
import { OrderItemMapper } from '@root/order/mapper/order/helper/order-item.mapper';
import { DocumentType } from '@typegoose/typegoose';
import { OrderItem } from '@root/order/model/helper/order-item.model';

describe('Order Mapper', () => {
	it('should map order to DTO', () => {
		const dao = OrderCollectionMock.order;
		const dto = OrderMapper.mapToDTO(dao);

		expect(dao._id.toString()).toEqual(dto.id);
		expect(dao.afa5).toEqual(dto.afa5);
		expect(dao.afa27).toEqual(dto.afa27);
		expect(dao.restaurantId).toEqual(dto.restaurantId);
		expect(dao.amount).toEqual(dto.amount);
		expect(dao.date).toEqual(dto.date);
		expect(dao.table).toEqual(dto.table);
		expect(dao.items).toEqual(dto.items);
	});

	it('should map post order to DAO', () => {
		const postedOrder: PostOrder = {
			table: 'T2',
			amount: OrderCollectionMock.order.amount,
			restaurantId: '63cc776b9c1f72057706a601',
			items: OrderItemMapper.mapItemToDTOList(OrderCollectionMock.order.items)
		};
		const dao = OrderMapper.mapToDAO(postedOrder);

		expect(dao.items).toEqual(postedOrder.items);
		expect(dao.table).toEqual(postedOrder.table);
		expect(dao.amount).toEqual(postedOrder.amount);
		expect(dao.restaurantId).toEqual(postedOrder.restaurantId);
		expect(dao).toHaveProperty('_id');
	});

	it('should throw error if count invalid', () => {
		const orderItem: DocumentType<OrderItem> = {
			_id: '63cc776b9c1f72057706a602',
			itemsOriginalCount: 1,
			extraItems: [],
			type: 'foetel',
			afa: 27,
			removedItems: [],
			items: ['test'],
			price: 3000,
			nickname: 'ex',
			name: 'tester'
		} as DocumentType<OrderItem>;
		const items = [...OrderCollectionMock.order.items, orderItem];
		const postedOrder: PostOrder = {
			table: 'T2',
			amount: 16000,
			restaurantId: '63cc776b9c1f72057706a601',
			items: OrderItemMapper.mapItemToDTOList(items)
		};
		try {
			OrderMapper.mapToDAO(postedOrder);
			fail();
		} catch (error) {
			expect(error.message).toEqual('Something went wrong...');
		}
	});
});
