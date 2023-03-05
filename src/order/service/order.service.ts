import { OrderDTO, PatchOrder, PostOrder } from '../../models/order.dto';
import { Order } from '../model/order.model';
import { OrderDAO } from '../dao/order.dao';
import { OrderMapper } from '../mapper/order/order.mapper';
import { DocumentType } from '@typegoose/typegoose';
import { Logger } from '../../services/logger/logger.service';

export class OrderService {
	public async getOrders(restaurantId: string): Promise<OrderDTO[] | []> {
		const orders: Order[] | [] = await OrderDAO.getOrdersByRestaurant(restaurantId);
		Logger.success(`Orders were fetched successfully (${restaurantId})`);
		if (orders.length === 0) {
			Logger.warn(`This restaurant (${restaurantId}) has no order`);
		}
		return OrderMapper.mapToDTOList(orders as DocumentType<Order[]>);
	}

	public async patchOrder(order: PatchOrder): Promise<OrderDTO | null> {
		const orderDAO: DocumentType<Order> | null = await OrderDAO.patchOrder(order);
		if (!orderDAO) {
			Logger.error(`Order modify was no successfully`);
			throw new Error(`Order modify was no successfully`);
		}
		Logger.success(`Order modify was successfully`);
		return OrderMapper.mapToDTO(orderDAO);
	}

	public async getOrder(table: string): Promise<OrderDTO[] | []> {
		const orders: Order[] | [] = await OrderDAO.getOrdersByTable(table);
		if (orders.length === 0) {
			Logger.error(`This ${table} table has no order`);
			throw new Error(`This ${table} table has no order`);
		}
		Logger.success(`This table ${table} fetched orders successfully`);
		return OrderMapper.mapToDTOList(orders as DocumentType<Order[]>);
	}

	public async deleteOrder(id: string): Promise<void> {
		await OrderDAO.deleteOrder(id);
		Logger.success(`This order ${id} delete successfully`);
	}

	public async postOrder(postOrder: PostOrder): Promise<OrderDTO | null> {
		const order: DocumentType<Order> | null = await OrderDAO.postOrder(postOrder);
		if (!order) {
			Logger.error(`New order added no successfully`);
			throw new Error(`New order added no successfully`);
		}
		Logger.success(`New order added successfully`);
		return OrderMapper.mapToDTO(order);
	}
}
