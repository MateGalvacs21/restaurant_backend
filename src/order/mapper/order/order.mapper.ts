import { OrderDTO, PostOrder } from '@root/shared/models/order.dto';
import { Types } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose';
import { Order } from '../../model/order.model';
import { OrderItemMapper } from './helper/order-item.mapper';

export class OrderMapper {
	public static mapToDAO(postOrder: PostOrder): DocumentType<Order> {
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
			_id: new Types.ObjectId(),
			amount: postOrder.amount,
			afa5: afa5,
			afa27: afa27,
			restaurantId: postOrder.restaurantId,
			table: postOrder.table,
			items: OrderItemMapper.mapItemToDAOList(postOrder.items),
			date: new Date().toString()
		} as DocumentType<Order>;
	}

	public static mapToDTO(orderDAO: DocumentType<Order>): OrderDTO {
		return {
			id: orderDAO._id.toString(),
			date: orderDAO.date,
			table: orderDAO.table,
			restaurantId: orderDAO.restaurantId,
			items: OrderItemMapper.mapItemToDTOList(orderDAO.items),
			afa5: orderDAO.afa5,
			afa27: orderDAO.afa27,
			amount: orderDAO.amount
		};
	}

	public static mapToDTOList(orderDAOList: DocumentType<Order>[]): OrderDTO[] {
		return orderDAOList.map((dao) => this.mapToDTO(dao));
	}

	public static mapToDAOList(orderDTOList: OrderDTO[]): DocumentType<Order>[] {
		return orderDTOList.map((dto) => this.mapToDAO(dto));
	}
}
