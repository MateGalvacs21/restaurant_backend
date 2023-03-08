import { MenuDTO } from '@root/shared/models/menu.dto';
import { DocumentType } from '@typegoose/typegoose';
import { Menu } from '../../model/helper/menu.model';

export class MenuMapper {
	public static mapToDTOFromDAO(dao: DocumentType<Menu>): MenuDTO {
		return {
			id: dao.id,
			items: dao.items,
			name: dao.name,
			nickname: dao.nickname,
			price: dao.price,
			type: dao.type,
			afa: dao.afa
		};
	}

	public static mapToDAOFromDTO(dto: MenuDTO): DocumentType<Menu> {
		return {
			id: dto.id,
			items: dto.items,
			name: dto.name,
			nickname: dto.nickname,
			price: dto.price,
			type: dto.type,
			afa: dto.afa
		} as DocumentType<Menu>;
	}

	public static mapToDTOList(daoList: DocumentType<Menu>[]): MenuDTO[] {
		return daoList.map((dao) => this.mapToDTOFromDAO(dao));
	}

	public static mapToDAOList(dtoList: MenuDTO[]): DocumentType<Menu>[] {
		return dtoList.map((dto) => this.mapToDAOFromDTO(dto));
	}
}
