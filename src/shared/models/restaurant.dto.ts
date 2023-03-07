import { DrinkGroupDTO } from './drink-group.dto';
import { MenuDTO } from './menu.dto';

export type RestaurantDTO = PostRestaurant & DeleteRestaurant;

export type EditDrinksRestaurant = {
	drinks: DrinkGroupDTO[];
};
export type EditMenuRestaurant = {
	menu: MenuDTO[];
};
export type PostRestaurant = EditDrinksRestaurant & EditMenuRestaurant;
export type DeleteRestaurant = {
	id: string;
};
