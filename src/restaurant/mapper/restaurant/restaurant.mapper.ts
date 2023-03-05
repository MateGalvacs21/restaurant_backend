import { DocumentType } from '@typegoose/typegoose';
import { Restaurant } from '../../model/restaurant.model';
import { PostRestaurant, RestaurantDTO } from '../../../models/restaurant.dto';
import { DrinkMapper } from '../drink/drink.mapper';
import { MenuMapper } from '../menu/menu.mapper';
import { Types } from 'mongoose';
export class RestaurantMapper {
	public static mapToDTO(dao: DocumentType<Restaurant>): RestaurantDTO | null {
		if (!dao.drinks || !dao.menu) return null;
		return {
			id: dao._id,
			drinks: DrinkMapper.mapToDrinkGroupDTO(dao.drinks),
			menu: MenuMapper.mapToDTOList(dao.menu)
		};
	}

	public static mapToDTOFromPost(postDTO: PostRestaurant): RestaurantDTO {
		return { ...postDTO, id: new Types.ObjectId().toString() };
	}

	public static mapToDAO(dto: RestaurantDTO): DocumentType<Restaurant> {
		return {
			_id: dto.id,
			drinks: DrinkMapper.mapToDrinkGroupDAO(dto.drinks),
			menu: MenuMapper.mapToDAOList(dto.menu)
		} as DocumentType<Restaurant>;
	}
}
