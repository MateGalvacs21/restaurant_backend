import { DocumentType } from '@typegoose/typegoose';
import { Order, OrderModel } from '../model/order.model';
import { Logger } from '../../services/logger/logger.service';
import { PatchOrder, PostOrder } from '../../shared/models/order.dto';
import { OrderMapper } from '../mapper/order/order.mapper';
import { CopyDataService } from '../../copydata/service/copy-data.service';
import { CopyDataMapper } from '../../copydata/mapper/copy-data.mapper';
import { OrderItemDTO } from "@root/shared/models/order-item.dto";

export class OrderDAO {
	private static loggerService = new Logger();
	private static filteredArray: OrderItemDTO[] = [];
	public static async getOrdersByRestaurant(restaurantId: string): Promise<DocumentType<Order>[]> {
		this.loggerService.info(`[GET] orders by ${restaurantId}....`);
		return OrderModel.find({ restaurantId: restaurantId });
	}

	public static async getOrdersByTable(table: string): Promise<DocumentType<Order>[]> {
		this.loggerService.info(`[GET] order to ${table} table....`);
		return OrderModel.find({ table: table });
	}

	public static async postOrder(order: PostOrder): Promise<DocumentType<Order>> {
		this.loggerService.info(`[POST] order to ${order.table} table....`);
		const orderDAO = OrderMapper.mapToDAO(order);
		const orderCopy = CopyDataMapper.mapToCopyDAO(orderDAO);
		if (orderCopy.items.length !== 0) {
			await CopyDataService.copyData(orderDAO);
		}
		return OrderModel.create(orderDAO);
	}

	public static async deleteOrder(id: string): Promise<void> {
		await OrderModel.findOneAndDelete({ _id: id });
		this.loggerService.info(`[DELETE] order with ${id} id....`);
	}

	public static async patchOrder(order: PatchOrder): Promise<DocumentType<Order>> {
		this.loggerService.info(`[PATCH] order with ${order.id} id....`);
		const originalOrder = await OrderModel.findOne({_id: order.id});
		let ids: number[];
		if (order.items.length >= originalOrder.items.length) {
			originalOrder.items.forEach(item => ids.push(item.id))
			this.filteredArray = order.items.filter(item => !ids.includes(item.id));
		}
		else {
			order.items.forEach(item => ids.push(item.id))
			this.filteredArray = originalOrder.items.filter(item => !ids.includes(item.id));
		}
		let amount = 0;
		this.filteredArray.forEach(item => amount += item.price)
		const postOrder: PostOrder = {
			table: originalOrder.table,
			restaurantId: originalOrder.restaurantId,
			items: this.filteredArray,
			amount: amount
		}
		const orderDAO = OrderMapper.mapToDAO(postOrder);
		const orderCopy = CopyDataMapper.mapToCopyDAO(orderDAO);
		if (orderCopy.items.length !== 0) {
			await CopyDataService.copyData(orderDAO);
		}
		return OrderModel.findOneAndUpdate(
			{ _id: order.id },
			{
				$set: {
					amount: order.amount,
					items: order.items,
					afa5: order.afa5,
					afa27: order.afa27
				}
			},
			{ new: true }
		);
	}
}
