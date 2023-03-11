import {CopyDataDAO} from "@root/copydata/dao/copy-data.dao";
import {CopyDataMapper} from "@root/copydata/mapper/copy-data.mapper";
import {OrderCollectionMock} from "@root/shared/mocks/data-mocks/order.mock";
import {CopyDataService} from "@root/copydata/service/copy-data.service";

describe('Copy-data Service', ()=>{

    const copiedData = CopyDataMapper.mapToCopyDAO(OrderCollectionMock.order);

    it('should copy data to order contains food ',  async ()=> {
        const copySpy = jest.spyOn(CopyDataDAO,'CopyData').mockResolvedValue(copiedData);
        const createdData = await CopyDataService.copyData(OrderCollectionMock.order);

        expect(copySpy).toHaveBeenCalledWith(OrderCollectionMock.order);
        expect(createdData).toEqual(CopyDataMapper.mapToDTO(copiedData));
    });

    it('should remove a copied if restaurant id and table are correct', async ()=>{
        const deleteSpy = jest.spyOn(CopyDataDAO,'deleteData').mockImplementation();
        await CopyDataService.deleteData(copiedData.restaurantId,copiedData.table);

        expect(deleteSpy).toHaveBeenCalledWith(copiedData.restaurantId,copiedData.table);
    });

    it('should get copied data by restaurant id',async ()=>{
        const getAllSpy = jest.spyOn(CopyDataDAO,'getAllData').mockResolvedValue([copiedData]);
        const dataList = await CopyDataService.getAllData(copiedData.restaurantId);

        expect(getAllSpy).toHaveBeenCalledWith(copiedData.restaurantId);
        expect(dataList[0]).toEqual(CopyDataMapper.mapToDTO(copiedData));
        expect(dataList.length).not.toEqual(0);
    });

    it('should return empty list if restaurant has not copied data',async ()=>{
        const getAllSpy = jest.spyOn(CopyDataDAO,'getAllData').mockResolvedValue([]);
        const dataList = await CopyDataService.getAllData(copiedData.restaurantId);

        expect(getAllSpy).toHaveBeenCalledWith(copiedData.restaurantId);
        expect(dataList.length).toEqual(0);
        expect(dataList).toEqual([]);
    });
});