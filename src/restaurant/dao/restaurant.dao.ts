import { DocumentType } from '@typegoose/typegoose';
import { Restaurant, RestaurantModel } from '../model/restaurant.model';
import { Logger } from '../../services/logger/logger.service';
import { DeleteRestaurant, EditDrinksRestaurant, EditMenuRestaurant, PostRestaurant } from '../../shared/models/restaurant.dto';
import { RestaurantMapper } from '../mapper/restaurant/restaurant.mapper';

export class RestaurantDAO {
	private static loggerService = new Logger();
	public static async getRestaurant(id: string): Promise<DocumentType<Restaurant> | null> {
		this.loggerService.info(`[GET] restaurant with ${id} restaurant id...`);
		return RestaurantModel.findOne({ _id: id });
	}

	public static async patchRestaurantMenu(id: string, newMenu: EditMenuRestaurant): Promise<DocumentType<Restaurant> | null> {
		this.loggerService.info(`[PATCH] restaurant with ${id} restaurant id and modify its menu...`);
		return RestaurantModel.findOneAndUpdate({ _id: id }, { $set: { menu: newMenu.menu } }, { new: true });
	}

	public static async patchRestaurantDrink(id: string, newDrink: EditDrinksRestaurant): Promise<DocumentType<Restaurant> | null> {
		this.loggerService.info(`[PATCH] restaurant with ${id} restaurant id and modify its drinks...`);
		return RestaurantModel.findOneAndUpdate({ _id: id }, { $set: { drinks: newDrink.drinks } }, { new: true });
	}

	public static async postRestaurant(newRestaurant: PostRestaurant): Promise<DocumentType<Restaurant> | null> {
		this.loggerService.info(`[POST] add new restaurant...`);
		const restaurant = await RestaurantModel.create(RestaurantMapper.mapToDAO(newRestaurant));
		await restaurant.save();
		return restaurant;
	}

	public static async deleteRestaurant(deletedRestaurant: DeleteRestaurant): Promise<void> {
		await RestaurantModel.findOneAndDelete({ _id: deletedRestaurant.id });
		this.loggerService.info('[DELETE] remove restaurant...');
	}
}
