import { DrinkItemDTO } from '@root/shared/models/drink-item.dto';
import { DrinkGroupDTO } from '@root/shared/models/drink-group.dto';
import { DrinkGroup } from '../../model/helper/drink-group.model';
import { DrinkItem } from '../../model/helper/drink-item.model';
import { DocumentType } from '@typegoose/typegoose';

export class DrinkMapper {
	public static mapItemToDAO(itemDTO: DrinkItemDTO): DocumentType<DrinkItem> {
		return {
			id: itemDTO.id,
			name: itemDTO.name,
			price: itemDTO.price
		} as DocumentType<DrinkItem>;
	}

	public static mapItemToDAOList(itemDTOList: DrinkItemDTO[]): DocumentType<DrinkItem>[] {
		return itemDTOList.map((dto) => this.mapItemToDAO(dto));
	}

	public static mapGroupToDAO(groupDTO: DrinkGroupDTO): DocumentType<DrinkGroup> {
		return {
			nameoftype: groupDTO.nameoftype,
			afa: groupDTO.afa,
			items: this.mapItemToDAOList(groupDTO.items)
		} as DocumentType<DrinkGroup>;
	}

	public static mapGroupToDAOList(groupDTOList: DrinkGroupDTO[]): DocumentType<DrinkGroup>[] {
		return groupDTOList.map((dto) => this.mapGroupToDAO(dto));
	}

	public static mapItemToDTO(itemDAO: DocumentType<DrinkItem>): DrinkItemDTO {
		return {
			id: itemDAO.id,
			name: itemDAO.name,
			price: itemDAO.price
		};
	}

	public static mapItemToDTOList(itemDAOList: DocumentType<DrinkItem>[]): DrinkItemDTO[] {
		return itemDAOList.map((dao) => this.mapItemToDAO(dao));
	}

	public static mapGroupToDTO(groupDAO: DocumentType<DrinkGroup>): DrinkGroupDTO {
		return {
			nameoftype: groupDAO.nameoftype,
			afa: groupDAO.afa,
			items: this.mapItemToDTOList(groupDAO.items)
		};
	}

	public static mapGroupToDTOList(groupDAOList: DocumentType<DrinkGroup>[]): DrinkGroupDTO[] {
		return groupDAOList.map((dao) => this.mapGroupToDTO(dao));
	}
}
