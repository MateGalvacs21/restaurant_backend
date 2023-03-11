import { CopyDataDTO } from '../../shared/models/copy-data.dto';
import { CopyDataDAO } from '../dao/copy-data.dao';
import { CopyDataMapper } from '../mapper/copy-data.mapper';
import { CopyData } from '../model/copy-data.model';
import { Logger } from '../../services/logger/logger.service';
import { DocumentType } from '@typegoose/typegoose';
import { Order } from '@root/order/model/order.model';

export class CopyDataService {
	public static loggerService = new Logger();

	public static async copyData(order: DocumentType<Order>): Promise<CopyDataDTO> {
		const data: DocumentType<CopyData> = await CopyDataDAO.CopyData(order);
		this.loggerService.success(`Order with ${order.id} id copied successfully`);
		return CopyDataMapper.mapToDTO(data);
	}

	public static async deleteData(restaurantId: string, table: string): Promise<void> {
		await CopyDataDAO.deleteData(restaurantId, table);
		this.loggerService.success('Data print successfully');
	}

	public static async getAllData(restaurantId: string): Promise<CopyDataDTO[] | []> {
		const data: DocumentType<CopyData>[] = await CopyDataDAO.getAllData(restaurantId);
		if (data.length===0) return [];
		this.loggerService.success(`Getting print data for ${restaurantId}`);
		return CopyDataMapper.mapToDTOList(data);
	}
}
