import { CopyDataDTO } from '../../shared/models/copy-data.dto';
import { OrderItemDTO } from '../../shared/models/order-item.dto';
import { DocumentType } from '@typegoose/typegoose';
import { CopyData } from '../model/copy-data.model';
import { OrderItemMapper } from '../../order/mapper/order/helper/order-item.mapper';
import { Order } from '@root/order/model/order.model';

export class CopyDataMapper {
	public static mapToCopyDAO(orderDAO: DocumentType<Order>): DocumentType<CopyData> {
		const filteredList: OrderItemDTO[] = [];
		orderDAO.items.forEach((item) => {
			if (item.type === 'foetel' || item.type === 'Leves' || item.type === 'salata' || item.type === 'martas' || item.type === 'desszert') {
				filteredList.push(item);
			}
		});
		return {
			items: OrderItemMapper.mapItemToDAOList(filteredList),
			restaurantId: orderDAO.restaurantId,
			table: orderDAO.table
		} as DocumentType<CopyData>;
	}
	public static mapToDTO(copyDataDAO: DocumentType<CopyData>): CopyDataDTO {
		return {
			table: copyDataDAO.table,
			restaurantId: copyDataDAO.restaurantId,
			items: OrderItemMapper.mapItemToDTOList(copyDataDAO.items)
		};
	}

	public static mapToDAO(copyDataDAO: CopyDataDTO): DocumentType<CopyData> {
		return {
			table: copyDataDAO.table,
			restaurantId: copyDataDAO.restaurantId,
			items: OrderItemMapper.mapItemToDAOList(copyDataDAO.items)
		} as DocumentType<CopyData>;
	}

	public static mapToDTOList(daoList: DocumentType<CopyData>[]): CopyDataDTO[] {
		return daoList.map((dao) => this.mapToDTO(dao));
	}

	public static mapToDAOList(dtoList: CopyDataDTO[]): DocumentType<CopyData>[] {
		return dtoList.map((dto) => this.mapToDAO(dto));
	}
}
