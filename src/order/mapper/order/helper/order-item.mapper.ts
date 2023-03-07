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
			name: orderItemDAO.name ? orderItemDAO.name : '',
			type: orderItemDAO.type ? orderItemDAO.type : '',
			afa: orderItemDAO.afa === 27 ? 27 : 5,
			removedItems: orderItemDAO.removedItems ? orderItemDAO.removedItems : [],
			extraItems: orderItemDAO.extraItems ? orderItemDAO.extraItems : [],
			items: orderItemDAO.items ? orderItemDAO.items : [],
			price: orderItemDAO.price ? orderItemDAO.price : 0,
			itemsOriginalCount: orderItemDAO.itemsOriginalCount ? orderItemDAO.itemsOriginalCount : 0
		};
	}

	public static mapItemToDAOList(orderItemsDTO: OrderItemDTO[]): DocumentType<OrderItem[]> {
		const orderItemDAOList: OrderItem[] = [];
		orderItemsDTO.forEach((item) => {
			const itemToDao = this.mapItemToDAO(item);
			orderItemDAOList.push(itemToDao);
		});
		return orderItemDAOList as DocumentType<OrderItem[]>;
	}

	public static mapItemToDTOList(orderItemsDAO: DocumentType<OrderItem[]>): OrderItemDTO[] {
		const orderItemDTOList: OrderItemDTO[] = [];
		orderItemsDAO.forEach((item) => {
			const itemToDto = this.mapItemToDTO(item as DocumentType<OrderItem>);
			orderItemDTOList.push(itemToDto);
		});
		return orderItemDTOList;
	}
}
