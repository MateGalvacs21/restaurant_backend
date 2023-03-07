import { OrderDTO, PostOrder } from '@root/shared/models/order.dto';
import { Types } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose';
import { OrderItem } from '../../model/helper/order-item.model';
import { Order } from '../../model/order.model';
import { OrderItemMapper } from './helper/order-item.mapper';

export class OrderMapper {
	public static mapToDTOFromPost(postOrder: PostOrder): OrderDTO {
		let afa27 = 0;
		let afa5 = 0;
		postOrder.items.forEach((item) => {
			if (item.afa === 27) {
				afa27 += item.price;
			} else {
				afa5 += item.price;
			}
		});
		if (postOrder.amount !== afa5 + afa27) throw new Error('Something went wrong...');
		return {
			id: new Types.ObjectId().toString(),
			amount: postOrder.amount,
			afa5: afa5,
			afa27: afa27,
			items: postOrder.items,
			restaurantId: postOrder.restaurantId,
			table: postOrder.table,
			date: new Date().toString()
		};
	}

	public static mapToDAO(orderDTO: OrderDTO): DocumentType<Order> {
		return {
			_id: new Types.ObjectId(orderDTO.id),
			amount: orderDTO.amount,
			afa5: orderDTO.afa5,
			afa27: orderDTO.afa27,
			items: OrderItemMapper.mapItemToDAOList(orderDTO.items),
			table: orderDTO.table,
			restaurantId: orderDTO.restaurantId
		} as DocumentType<Order>;
	}

	public static mapToDTO(orderDAO: DocumentType<Order>): OrderDTO {
		return {
			id: orderDAO._id,
			date: orderDAO.date ? orderDAO.date : '',
			table: orderDAO.table ? orderDAO.table : '',
			restaurantId: orderDAO.restaurantId ? orderDAO.restaurantId : '',
			items: OrderItemMapper.mapItemToDTOList(orderDAO.items as DocumentType<OrderItem[]>),
			afa5: orderDAO.afa5 ? orderDAO.afa5 : 0,
			afa27: orderDAO.afa27 ? orderDAO.afa27 : 0,
			amount: orderDAO.amount ? orderDAO.amount : 0
		};
	}

	public static mapToDTOList(orderDAOList: DocumentType<Order[]>): OrderDTO[] {
		const orderDTOList: OrderDTO[] = [];
		orderDAOList.forEach((item) => {
			const orderDTO = this.mapToDTO(item as DocumentType<Order>);
			orderDTOList.push(orderDTO);
		});
		return orderDTOList;
	}

	public static mapToDAOList(orderDTOList: OrderDTO[]): DocumentType<Order[]> {
		const orderDAOList: Order[] = [];
		orderDTOList.forEach((item) => {
			const orderDAO = this.mapToDAO(item);
			orderDAOList.push(orderDAO);
		});
		return orderDAOList as DocumentType<Order[]>;
	}
}
