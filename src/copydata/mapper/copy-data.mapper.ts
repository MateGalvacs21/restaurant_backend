import { OrderDTO } from '../../models/order.dto';
import { CopyDataDTO } from '../../models/copy-data.dto';
import { OrderItemDTO } from '../../models/order-item.dto';
import { DocumentType } from '@typegoose/typegoose';
import { CopyData } from '../model/copy-data.model';
import { OrderItemMapper } from '../../order/mapper/order/helper/order-item.mapper';

export class CopyDataMapper {
	public static mapToCopyData(orderDTO: OrderDTO): CopyDataDTO {
		const filteredList: OrderItemDTO[] = [];
		orderDTO.items.forEach((item) => {
			if (item.type === 'foetel' || item.type === 'Leves' || item.type === 'salata' || item.type === 'martas' || item.type === 'desszert') {
				filteredList.push(item);
			}
		});
		return {
			items: filteredList,
			restaurantId: orderDTO.restaurantId,
			table: orderDTO.table
		};
	}

	public static mapToDAO(copyDTO: CopyDataDTO): DocumentType<CopyData> {
		return {
			table: copyDTO.table,
			restaurantId: copyDTO.restaurantId,
			items: OrderItemMapper.mapItemToDAOList(copyDTO.items)
		} as DocumentType<CopyData>;
	}

	public static mapToDTO(copyDataDAO: DocumentType<CopyData>): CopyDataDTO | null {
		if (!copyDataDAO.items) return null;
		return {
			table: copyDataDAO.table ? copyDataDAO.table : '',
			restaurantId: copyDataDAO.restaurantId ? copyDataDAO.restaurantId : '',
			items: OrderItemMapper.mapItemToDTOList(copyDataDAO.items)
		};
	}

	public static mapToDTOList(daoList: DocumentType<CopyData[]>): CopyDataDTO[] {
		const dtoList: CopyDataDTO[] = [];
		daoList.forEach((dao) => {
			const dto = this.mapToDTO(dao as DocumentType<CopyData>);
			if (dto) {
				dtoList.push(dto);
			}
		});
		return dtoList;
	}

	public static mapToDAOList(dtoList: CopyDataDTO[]): DocumentType<CopyData[]> {
		const daoList: CopyData[] = [];
		dtoList.forEach((dto) => {
			const dao = this.mapToDAO(dto);
			if (dao) {
				daoList.push(dao);
			}
		});
		return daoList as DocumentType<CopyData[]>;
	}
}
