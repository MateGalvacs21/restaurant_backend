import { OrderDTO, PatchOrder, PostOrder } from '../../shared/models/order.dto';
import { Order } from '../model/order.model';
import { OrderDAO } from '../dao/order.dao';
import { OrderMapper } from '../mapper/order/order.mapper';
import { DocumentType } from '@typegoose/typegoose';
import { Logger } from '../../services/logger/logger.service';

export class OrderService {
	private loggerService = new Logger();
	public async getOrdersByRestaurant(restaurantId: string): Promise<OrderDTO[] | []> {
		const orders: DocumentType<Order>[] | [] = await OrderDAO.getOrdersByRestaurant(restaurantId);
		this.loggerService.success(`Orders were fetched successfully (${restaurantId})`);
		if (orders.length === 0) {
			this.loggerService.warn(`This restaurant (${restaurantId}) has no order`);
			return [];
		}
		return OrderMapper.mapToDTOList(orders);
	}

	public async patchOrder(order: PatchOrder): Promise<OrderDTO> {
		const orderDAO: DocumentType<Order> | null = await OrderDAO.patchOrder(order);
		if (!orderDAO) {
			this.loggerService.error(`Order modify was no successfully`);
			throw new Error(`Order modify was no successfully`);
		}
		this.loggerService.success(`Order modify was successfully`);
		return OrderMapper.mapToDTO(orderDAO);
	}

	public async getOrdersByTable(table: string): Promise<OrderDTO[] | []> {
		const orders: DocumentType<Order>[] | [] = await OrderDAO.getOrdersByTable(table);
		if (orders.length === 0) {
			this.loggerService.error(`This ${table} table has no order`);
			return [];
		}
		this.loggerService.success(`This table ${table} fetched orders successfully`);
		return OrderMapper.mapToDTOList(orders);
	}

	public async deleteOrder(id: string): Promise<void> {
		await OrderDAO.deleteOrder(id);
		this.loggerService.success(`This order ${id} delete successfully`);
	}

	public async postOrder(postOrder: PostOrder): Promise<OrderDTO> {
		const order: DocumentType<Order> | null = await OrderDAO.postOrder(postOrder);
		if (!order) {
			this.loggerService.error(`New order added no successfully`);
			throw new Error(`New order added no successfully`);
		}
		this.loggerService.success(`New order added successfully`);
		return OrderMapper.mapToDTO(order);
	}
}
