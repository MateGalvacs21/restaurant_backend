import { OrderItemDTO } from '@root/shared/models/order-item.dto';
import { DocumentType } from '@typegoose/typegoose';
import { OrderItem } from '../../../model/helper/order-item.model';

export class OrderItemMapper {
	public static mapItemToDAO(orderItemDTO: OrderItemDTO): DocumentType<OrderItem> {
		return {
			name: orderItemDTO.name,
			price: orderItemDTO.price,
			items: orderItemDTO.items,
			extraItems: orderItemDTO.extraItems,
			removedItems: orderItemDTO.removedItems,
			afa: orderItemDTO.afa,
			type: orderItemDTO.type
		} as DocumentType<OrderItem>;
	}

	public static mapItemToDTO(orderItemDAO: DocumentType<OrderItem>): OrderItemDTO {
		return {
			name: orderItemDAO.name,
			type: orderItemDAO.type,
			afa: orderItemDAO.afa,
			removedItems: orderItemDAO.removedItems,
			extraItems: orderItemDAO.extraItems,
			items: orderItemDAO.items,
			price: orderItemDAO.price,
			itemsOriginalCount: orderItemDAO.itemsOriginalCount
		};
	}

	public static mapItemToDAOList(orderItemsDTO: OrderItemDTO[]): DocumentType<OrderItem>[] {
		return orderItemsDTO.map((orderItemDTO) => this.mapItemToDAO(orderItemDTO));
	}

	public static mapItemToDTOList(orderItemsDAO: DocumentType<OrderItem>[]): OrderItemDTO[] {
		return orderItemsDAO.map((dao) => this.mapItemToDTO(dao));
	}
}
