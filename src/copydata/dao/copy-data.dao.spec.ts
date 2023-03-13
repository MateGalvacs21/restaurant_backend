import { CopyDataModel } from '@root/copydata/model/copy-data.model';
import { OrderCollectionMock } from '@root/shared/mocks/data-mocks/order.mock';
import { CopyDataMapper } from '@root/copydata/mapper/copy-data.mapper';
import { CopyDataDAO } from '@root/copydata/dao/copy-data.dao';

describe('CopyDataDao', () => {
	describe('CopyData', () => {
		it('should copy data if list contains food', async () => {
			CopyDataModel.create = jest.fn().mockResolvedValue(CopyDataMapper.mapToCopyDAO(OrderCollectionMock.order));
			const copiedData = await CopyDataDAO.CopyData(OrderCollectionMock.order);

			expect(CopyDataModel.create).toHaveBeenCalledWith(CopyDataMapper.mapToCopyDAO(OrderCollectionMock.order));
			expect(copiedData).toEqual(CopyDataMapper.mapToCopyDAO(OrderCollectionMock.order));
		});
	});

	describe('deleteData', () => {
		it('should delete copied data', async () => {
			const copiedData = CopyDataMapper.mapToCopyDAO(OrderCollectionMock.order);
			CopyDataModel.findOneAndDelete = jest.fn().mockResolvedValue({
				restaurantId: copiedData.restaurantId,
				table: copiedData.table
			});
			await CopyDataDAO.deleteData(copiedData.restaurantId, copiedData.table);

			expect(CopyDataModel.findOneAndDelete).toHaveBeenCalledWith({
				restaurantId: copiedData.restaurantId,
				table: copiedData.table
			});
		});
	});

	describe('getAllData', () => {
		it('should get all copied data by restaurant id', async () => {
			const copiedData = CopyDataMapper.mapToCopyDAO(OrderCollectionMock.order);
			CopyDataModel.find = jest.fn().mockResolvedValue([copiedData]);
			const dataList = await CopyDataDAO.getAllData(copiedData.restaurantId);

			expect(CopyDataModel.find).toHaveBeenCalledWith({ restaurantId: copiedData.restaurantId });
			expect(dataList).toEqual([copiedData]);
		});

		it('should return empty list if restaurant has not copied data', async () => {
			const copiedData = CopyDataMapper.mapToCopyDAO(OrderCollectionMock.order);
			CopyDataModel.find = jest.fn().mockResolvedValue([]);
			const dataList = await CopyDataDAO.getAllData(copiedData.restaurantId);

			expect(CopyDataModel.find).toHaveBeenCalledWith({ restaurantId: copiedData.restaurantId });
			expect(dataList).toEqual([]);
		});
	});
});
