import { OrderDTO } from '../../shared/models/order.dto';
import { CopyDataDTO } from '../../shared/models/copy-data.dto';
import { CopyDataDAO } from '../dao/copy-data.dao';
import { CopyDataMapper } from '../mapper/copy-data.mapper';
import { CopyData } from '../model/copy-data.model';
import { Logger } from '../../services/logger/logger.service';
import { DocumentType } from '@typegoose/typegoose';

export class CopyDataService {
	public static loggerService = new Logger();
	public static async copyData(order: OrderDTO): Promise<CopyDataDTO | null> {
		const data: CopyData = await CopyDataDAO.CopyData(order);
		this.loggerService.success(`Order with ${order.id} id copied successfully`);
		return CopyDataMapper.mapToDTO(data as DocumentType<CopyData>);
	}

	public static async deleteData(restaurantId: string, table: string): Promise<void> {
		await CopyDataDAO.deleteData(restaurantId, table);
		this.loggerService.success('Data print successfully');
	}

	public static async getAllData(restaurantId: string): Promise<CopyDataDTO[]> {
		const data: CopyData[] = await CopyDataDAO.getAllData(restaurantId);
		this.loggerService.success(`Getting print data for ${restaurantId}`);
		return CopyDataMapper.mapToDTOList(data as DocumentType<CopyData[]>);
	}
}
