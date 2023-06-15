import { Logger } from '../../services/logger/logger.service';
import { StatisticDAO } from '../dao/statistic.dao';
import { StatisticMapper } from '../../statistics/mapper/statistic.mapper';

export class StatisticService {
	private static loggerService = new Logger();
	public static async BackUp(id: string, payWithCard: boolean): Promise<void> {
		await StatisticDAO.BackUp(id, payWithCard);
		this.loggerService.success(`Store was successfully`);
	}

	public static async getStatistics(restaurantId: string, date: string): Promise<any[] | []> {
		const statistics = await StatisticDAO.getStatistics(restaurantId);
		if (statistics.length === 0) return [];
		const filteredStats = statistics.filter(
			stat => this.createDateString(new Date(stat.date)) === this.createDateString(new Date(date)));
		this.loggerService.success(`${restaurantId} statistics fetched successfully`);
		return StatisticMapper.mapToDTOList(filteredStats);
	}

	private static createDateString(date: Date): string {
		return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' :''}${date.getMonth() + 1}-${date.getDate()}`;
	}
}
