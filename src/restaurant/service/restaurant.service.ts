import { RestaurantDAO } from '../dao/restaurant.dao';
import { DeleteRestaurant, EditDrinksRestaurant, EditMenuRestaurant, PostRestaurant, RestaurantDTO } from '../../shared/models/restaurant.dto';
import { RestaurantMapper } from '../mapper/restaurant/restaurant.mapper';
import { DocumentType } from '@typegoose/typegoose';
import { Restaurant } from '../model/restaurant.model';
import { Logger } from '../../services/logger/logger.service';

export class RestaurantService {
	private static loggerService = new Logger();
	public static async getRestaurant(id: string): Promise<RestaurantDTO | null> {
		const restaurant: DocumentType<Restaurant> | null = await RestaurantDAO.getRestaurant(id);
		if (!restaurant) return null;
		this.loggerService.success(`Restaurant (${id}) getting was successfully`);
		return RestaurantMapper.mapToDTO(restaurant);
	}

	public static async patchMenu(id: string, newMenu: EditMenuRestaurant): Promise<RestaurantDTO | null> {
		const restaurant: DocumentType<Restaurant> | null = await RestaurantDAO.patchRestaurantMenu(id, newMenu);
		if (!restaurant) return null;
		this.loggerService.success(`Restaurant (${id}) modify its menu was successfully`);
		return RestaurantMapper.mapToDTO(restaurant);
	}

	public static async patchDrinks(id: string, newDrinks: EditDrinksRestaurant): Promise<RestaurantDTO | null> {
		const restaurant: DocumentType<Restaurant> | null = await RestaurantDAO.patchRestaurantDrink(id, newDrinks);
		if (!restaurant) return null;
		this.loggerService.success(`Restaurant (${id}) modify its drinks were successfully`);
		return RestaurantMapper.mapToDTO(restaurant);
	}

	public static async deleteRestaurant(deletedRestaurant: DeleteRestaurant): Promise<void> {
		await RestaurantDAO.deleteRestaurant(deletedRestaurant);
		this.loggerService.success(`Restaurant (${deletedRestaurant.id}) was deleted successfully`);
	}

	public static async postRestaurant(newRestaurant: PostRestaurant): Promise<RestaurantDTO | null> {
		const restaurant: DocumentType<Restaurant> | null = await RestaurantDAO.postRestaurant(newRestaurant);
		if (!restaurant) return null;
		this.loggerService.success(`New restaurant added successfully`);
		return RestaurantMapper.mapToDTO(restaurant);
	}
}
