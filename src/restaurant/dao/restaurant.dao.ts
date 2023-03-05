import { DocumentType } from '@typegoose/typegoose';
import { Restaurant, RestaurantModel } from '../model/restaurant.model';
import { Logger } from '../../services/logger/logger.service';
import { DeleteRestaurant, EditDrinksRestaurant, EditMenuRestaurant, PostRestaurant, RestaurantDTO } from '../../models/restaurant.dto';
import { RestaurantMapper } from '../mapper/restaurant/restaurant.mapper';

export class RestaurantDAO {
	public static async getRestaurant(id: string): Promise<DocumentType<Restaurant> | null> {
		Logger.info(`[GET] restaurant with ${id} restaurant id...`);
		return RestaurantModel.findOne({ _id: id });
	}

	public static async patchRestaurantMenu(id: string, newMenu: EditMenuRestaurant): Promise<DocumentType<Restaurant> | null> {
		Logger.info(`[PATCH] restaurant with ${id} restaurant id and modify its menu...`);
		return RestaurantModel.findOneAndUpdate({ _id: id }, { $set: { menu: newMenu.menu } }, { new: true });
	}

	public static async patchRestaurantDrink(id: string, newDrink: EditDrinksRestaurant): Promise<DocumentType<Restaurant> | null> {
		Logger.info(`[PATCH] restaurant with ${id} restaurant id and modify its drinks...`);
		return RestaurantModel.findOneAndUpdate({ _id: id }, { $set: { drinks: newDrink.drinks } }, { new: true });
	}

	public static async postRestaurant(newRestaurant: PostRestaurant): Promise<DocumentType<Restaurant> | null> {
		Logger.info(`[POST] add new restaurant...`);
		const restaurantDTO: RestaurantDTO = RestaurantMapper.mapToDTOFromPost(newRestaurant);
		const restaurant = await RestaurantModel.create(RestaurantMapper.mapToDAO(restaurantDTO));
		await restaurant.save();
		return restaurant;
	}

	public static async deleteRestaurant(deletedRestaurant: DeleteRestaurant): Promise<void> {
		await RestaurantModel.findOneAndDelete({ _id: deletedRestaurant.id });
		Logger.info('[DELETE] remove restaurant...');
	}
}
