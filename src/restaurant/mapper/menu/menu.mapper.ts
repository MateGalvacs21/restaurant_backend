import { MenuDTO } from '../../../models/menu.dto';
import { DocumentType } from '@typegoose/typegoose';
import { Menu } from '../../model/helper/menu.model';

export class MenuMapper {
	public static mapToDTOFromDAO(dao: DocumentType<Menu>): MenuDTO {
		return {
			id: dao.id,
			items: dao.items ? dao.items : [],
			name: dao.name ? dao.name : '',
			nickname: dao.nickname ? dao.nickname : '',
			price: dao.price ? dao.price : 0,
			type: dao.type ? dao.type : '',
			afa: dao.afa === 27 ? 27 : 5
		};
	}

	public static mapToDAOFromDTO(dto: MenuDTO): DocumentType<Menu> {
		return {
			id: dto.id,
			items: dto.items ? dto.items : [],
			name: dto.name,
			nickname: dto.nickname,
			price: dto.price,
			type: dto.type,
			afa: dto.afa
		} as DocumentType<Menu>;
	}

	public static mapToDTOList(daoList: DocumentType<Menu[]>): MenuDTO[] {
		const dtoList: MenuDTO[] = [];
		daoList.forEach((dao) => {
			const dto = this.mapToDTOFromDAO(dao as DocumentType<Menu>);
			if (!dto) return null;
			dtoList.push(dto);
		});
		return dtoList;
	}

	public static mapToDAOList(dtoList: MenuDTO[]): DocumentType<Menu[]> {
		const daoList: Menu[] = [];
		dtoList.forEach((dto) => {
			const dao = this.mapToDAOFromDTO(dto);
			if (!dao) return null;
			daoList.push(dao);
		});
		return daoList as DocumentType<Menu[]>;
	}
}
