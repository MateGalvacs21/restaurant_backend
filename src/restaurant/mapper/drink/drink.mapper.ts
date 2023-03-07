import { DrinkItemDTO } from '@root/shared/models/drink-item.dto';
import { DrinkGroupDTO } from '@root/shared/models/drink-group.dto';
import { DrinkGroup } from '../../model/helper/drink-group.model';
import { DrinkItem } from '../../model/helper/drink-item.model';
import { DocumentType } from '@typegoose/typegoose';

export class DrinkMapper {
	public static mapToDrinkGroupDTO(dao: DocumentType<DrinkGroup[]>): DrinkGroupDTO[] {
		const dtoList: DrinkGroupDTO[] = [];
		dao.forEach((daoData) => {
			dtoList.push({
				nameoftype: daoData.nameoftype ? daoData.nameoftype : '',
				afa: daoData.afa === 27 ? 27 : 5,
				items: this.mapDrinkItemDTO(daoData.items as DocumentType<DrinkItem[]>)
			});
		});
		return dtoList;
	}

	public static mapDrinkItemDTO(dao: DocumentType<DrinkItem[]>): DrinkItemDTO[] | [] {
		const dtoList: DrinkItemDTO[] = [];
		dao.forEach((daoData) => {
			if (!daoData.id || !daoData.price || !daoData.name) return [];
			dtoList.push({ id: daoData.id, price: daoData.price, name: daoData.name });
		});
		return dtoList;
	}

	public static mapToDrinkGroupDAO(dto: DrinkGroupDTO[]): DocumentType<DrinkGroup[]> {
		const daoList: DrinkGroup[] = [];
		dto.forEach((dtoData) => {
			if (!dtoData.nameoftype || !dtoData.afa || !dtoData.items) return null;
			daoList.push({
				nameoftype: dtoData.nameoftype,
				afa: dtoData.afa === 27 ? 27 : 5,
				items: this.mapDrinkItemDAO(dtoData.items)
			});
		});
		return daoList as DocumentType<DrinkGroup[]>;
	}

	public static mapDrinkItemDAO(dto: DrinkItemDTO[]): DocumentType<DrinkItem[]> {
		const daoList: DrinkItem[] = [];
		dto.forEach((dtoData) => {
			if (!dtoData.id || !dtoData.name || !dtoData.price) return null;
			daoList.push({ id: dtoData.id, price: dtoData.price, name: dtoData.name });
		});
		return daoList as DocumentType<DrinkItem[]>;
	}
}
