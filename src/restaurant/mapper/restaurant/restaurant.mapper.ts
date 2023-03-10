import { DocumentType } from '@typegoose/typegoose';
import { Restaurant } from '../../model/restaurant.model';
import { PostRestaurant, RestaurantDTO } from '@root/shared/models/restaurant.dto';
import { DrinkMapper } from '../drink/drink.mapper';
import { MenuMapper } from '../menu/menu.mapper';
import { Types } from 'mongoose';
export class RestaurantMapper {
	public static mapToDTO(dao: DocumentType<Restaurant>): RestaurantDTO {
		return {
			id: dao._id.toString(),
			drinks: DrinkMapper.mapGroupToDTOList(dao.drinks),
			menu: MenuMapper.mapToDTOList(dao.menu)
		};
	}

	public static mapToDAO(dto: PostRestaurant): DocumentType<Restaurant> {
		return {
			_id: new Types.ObjectId(),
			drinks: DrinkMapper.mapGroupToDAOList(dto.drinks),
			menu: MenuMapper.mapToDAOList(dto.menu)
		} as DocumentType<Restaurant>;
	}
}
