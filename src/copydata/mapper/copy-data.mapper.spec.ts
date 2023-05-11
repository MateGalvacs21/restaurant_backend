import { OrderCollectionMock } from '@root/shared/mocks/data-mocks/order.mock';
import { CopyDataMapper } from '@root/copydata/mapper/copy-data.mapper';
import { OrderItemMapper } from '@root/order/mapper/order/helper/order-item.mapper';

describe('CopyData Mapper', () => {
	it('should create CopyData from Order', () => {
		const order = OrderCollectionMock.order;
		const copied = CopyDataMapper.mapToCopyDAO(order);

		expect(copied).toEqual({
			items: OrderItemMapper.mapItemToDAOList(copied.items),
			restaurantId: order.restaurantId,
			table: order.table
		});
	});

	it('should create CopyDataDTO from CopyDAO', () => {
		const order = OrderCollectionMock.order;
		const copied = CopyDataMapper.mapToCopyDAO(order);
		const dto = CopyDataMapper.mapToDTO(copied);

		expect(dto).toEqual({
			items: OrderItemMapper.mapItemToDAOList(copied.items),
			restaurantId: order.restaurantId,
			table: order.table
		});
	});

	it('should create CopyDataDAO from CopyDataDTO', () => {
		const order = OrderCollectionMock.order;
		const copied = CopyDataMapper.mapToCopyDAO(order);
		const dto = CopyDataMapper.mapToDTO(copied);
		const dao = CopyDataMapper.mapToDAO(dto);

		expect(dao).toEqual({
			items: OrderItemMapper.mapItemToDAOList(copied.items),
			restaurantId: order.restaurantId,
			table: order.table
		});
	});

	it('should create CopyDataDTO list from CopyDAO list', () => {
		const order = OrderCollectionMock.order;
		const copied = CopyDataMapper.mapToCopyDAO(order);
		const dtoList = CopyDataMapper.mapToDTOList([copied]);

		expect(dtoList[0]).toEqual(copied);
	});

	it('should create CopyDataDAO list from CopyDataDTO list', () => {
		const order = OrderCollectionMock.order;
		const copied = CopyDataMapper.mapToCopyDAO(order);
		const dto = CopyDataMapper.mapToDTO(copied);
		const daoList = CopyDataMapper.mapToDAOList([dto]);

		expect(daoList[0]).toEqual(dto);
	});
});
