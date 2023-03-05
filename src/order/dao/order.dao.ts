import { DocumentType } from '@typegoose/typegoose';
import { Order, OrderModel } from '../model/order.model';
import { Logger } from '../../services/logger/logger.service';
import { PatchOrder, PostOrder } from '../../models/order.dto';
import { OrderMapper } from '../mapper/order/order.mapper';
import { CopyDataService } from '../../copydata/service/copy-data.service';
import { CopyDataMapper } from '../../copydata/mapper/copy-data.mapper';

export class OrderDAO {
	public static async getOrdersByRestaurant(restaurantId: string): Promise<Order[] | []> {
		Logger.info(`[GET] orders by ${restaurantId}....`);
		return OrderModel.find({ restaurantId: restaurantId });
	}

	public static async getOrdersByTable(table: string): Promise<Order[] | []> {
		Logger.info(`[GET] order to ${table} table....`);
		return OrderModel.find({ table: table });
	}

	public static async postOrder(order: PostOrder): Promise<DocumentType<Order>> {
		Logger.info(`[POST] order to ${order.table} table....`);
		const orderDAO = OrderMapper.mapToDTOFromPost(order);
		const orderCopy = CopyDataMapper.mapToCopyData(orderDAO);
		if (orderCopy.items.length !== 0) {
			await CopyDataService.copyData(orderDAO);
		}
		return OrderModel.create(OrderMapper.mapToDAO(orderDAO));
	}

	public static async deleteOrder(id: string): Promise<void> {
		OrderModel.findOneAndDelete({ _id: id });
		Logger.info(`[DELETE] order with ${id} id....`);
	}

	public static async patchOrder(order: PatchOrder): Promise<DocumentType<Order> | null> {
		Logger.info(`[PATCH] order with ${order.id} id....`);
		return OrderModel.findOneAndUpdate(
			{ _id: order.id },
			{
				$set: {
					amount: order.amount,
					items: order.items
				}
			},
			{ new: true }
		);
	}
}
