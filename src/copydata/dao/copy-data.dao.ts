import { DocumentType } from '@typegoose/typegoose';
import { CopyData, CopyDataModel } from '../model/copy-data.model';
import { CopyDataMapper } from '../mapper/copy-data.mapper';
import { Logger } from '../../services/logger/logger.service';
import { Order } from '@root/order/model/order.model';

export class CopyDataDAO {
	public static loggerService = new Logger();
	public static async CopyData(order: DocumentType<Order>): Promise<DocumentType<CopyData>> {
		const data = CopyDataMapper.mapToCopyDAO(order);
		this.loggerService.info(`[POST] copy order with ${order.id} to print...`);
		return CopyDataModel.create(data);
	}

	public static async deleteData(restaurantId: string, table: string): Promise<void> {
		CopyDataModel.findOneAndDelete({ table: table, restaurantId: restaurantId });
		this.loggerService.info('[DELETE] data printing....');
	}

	public static async getAllData(restaurantId: string): Promise<DocumentType<CopyData>[]> {
		this.loggerService.info(`[GET] print data to ${restaurantId}`);
		return CopyDataModel.find({ restaurantId: restaurantId });
	}
}
