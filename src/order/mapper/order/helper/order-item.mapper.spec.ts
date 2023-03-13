import { OrderCollectionMock } from '@root/shared/mocks/data-mocks/order.mock';
import { OrderItemMapper } from '@root/order/mapper/order/helper/order-item.mapper';

describe('OrderItem Mapper', () => {
	it('should map item to dao', () => {
		const dto = OrderCollectionMock.orderItemDTO;
		const dao = OrderItemMapper.mapItemToDAO(dto);

		expect(dao).toEqual(dto);
	});

	it('should map item to dto', () => {
		const dao = OrderCollectionMock.order.items[0];
		const dto = OrderItemMapper.mapItemToDTO(dao);

		expect(dto).toEqual(dao);
	});

	it('should map item to dao list', () => {
		const dto = [OrderCollectionMock.orderItemDTO];
		const dao = OrderItemMapper.mapItemToDAOList(dto);

		expect(dao[0]).toEqual(dto[0]);
	});

	it('should map item to dto list', () => {
		const dao = [OrderCollectionMock.order.items[0]];
		const dto = OrderItemMapper.mapItemToDTOList(dao);

		expect(dto[0]).toEqual(dao[0]);
	});
});
