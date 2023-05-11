import { RestaurantModel } from '@root/restaurant/model/restaurant.model';
import { RestaurantMock } from '@root/shared/mocks/data-mocks/restaurant.mock';
import { RestaurantDAO } from '@root/restaurant/dao/restaurant.dao';
import { DeleteRestaurant } from '@root/shared/models/restaurant.dto';

describe('RestaurantDao', () => {
	describe('getRestaurant', () => {
		it('should return with restaurant by id', async () => {
			RestaurantModel.findOne = jest.fn().mockResolvedValue(RestaurantMock.restaurantDAO);
			const restaurant = await RestaurantDAO.getRestaurant(RestaurantMock.restaurant.id);

			expect(RestaurantModel.findOne).toHaveBeenCalledWith({ _id: RestaurantMock.restaurant.id });
			expect(restaurant).toEqual(RestaurantMock.restaurantDAO);
		});

		it('should return with null if restaurant not found', async () => {
			RestaurantModel.findOne = jest.fn().mockResolvedValue([]);
			const restaurant = await RestaurantDAO.getRestaurant(RestaurantMock.restaurant.id);

			expect(RestaurantModel.findOne).toHaveBeenCalledWith({ _id: RestaurantMock.restaurant.id });
			expect(restaurant).toEqual([]);
		});
	});

	describe('deleteRestaurant', () => {
		it('should delete and restaurant from db if we call mongo query', async () => {
			const deleteMock: DeleteRestaurant = {
				id: RestaurantMock.restaurant.id
			};
			RestaurantModel.findOneAndDelete = jest.fn().mockResolvedValue(null);
			await RestaurantDAO.deleteRestaurant(deleteMock);

			expect(RestaurantModel.findOneAndDelete).toHaveBeenCalledWith({ _id: deleteMock.id });
		});

		it('should throw an error if mongo query was fail', async () => {
			const deleteMock: DeleteRestaurant = {
				id: RestaurantMock.restaurant.id
			};
			RestaurantModel.findOneAndDelete = jest.fn().mockRejectedValue(new Error('fail'));
			try {
				await RestaurantDAO.deleteRestaurant(deleteMock);

				expect(RestaurantModel.findOneAndDelete).toHaveBeenCalledWith({ _id: deleteMock.id });
			} catch (error) {
				expect(error.message).toEqual('fail');
			}
		});
	});

	describe('PatchMenu', () => {
		it('should update menu if mongo query success and return with updated restaurant', async () => {
			RestaurantModel.findOneAndUpdate = jest.fn().mockResolvedValue(RestaurantMock.restaurantDAO);
			const restaurant = await RestaurantDAO.patchRestaurantMenu(RestaurantMock.restaurant.id, RestaurantMock.editMenuMock);

			expect(RestaurantModel.findOneAndUpdate).toHaveBeenCalledWith({ _id: RestaurantMock.restaurant.id }, { $set: { menu: RestaurantMock.menu } }, { new: true });
			expect(restaurant).toEqual(RestaurantMock.restaurantDAO);
		});

		it('should throw an error if update menu mongo query was fail', async () => {
			RestaurantModel.findOneAndUpdate = jest.fn().mockRejectedValue(new Error('fail'));
			try {
				await RestaurantDAO.patchRestaurantMenu(RestaurantMock.restaurant.id, RestaurantMock.editMenuMock);
				expect(RestaurantModel.findOneAndUpdate).toHaveBeenCalledWith({ _id: RestaurantMock.restaurant.id }, { $set: { menu: RestaurantMock.menu } }, { new: true });
			} catch (error) {
				expect(error.message).toEqual('fail');
			}
		});
	});

	describe('PatchDrink', () => {
		it('should update drink list if mongo query success and return with updated restaurant', async () => {
			RestaurantModel.findOneAndUpdate = jest.fn().mockResolvedValue(RestaurantMock.restaurantDAO);
			const restaurant = await RestaurantDAO.patchRestaurantDrink(RestaurantMock.restaurant.id, RestaurantMock.editDrinkMock);

			expect(RestaurantModel.findOneAndUpdate).toHaveBeenCalledWith({ _id: RestaurantMock.restaurant.id }, { $set: { drinks: RestaurantMock.drinkGroups } }, { new: true });
			expect(restaurant).toEqual(RestaurantMock.restaurantDAO);
		});

		it('should throw an error if update menu mongo query was fail', async () => {
			RestaurantModel.findOneAndUpdate = jest.fn().mockRejectedValue(new Error('fail'));
			try {
				await RestaurantDAO.patchRestaurantDrink(RestaurantMock.restaurant.id, RestaurantMock.editDrinkMock);
				expect(RestaurantModel.findOneAndUpdate).toHaveBeenCalledWith({ _id: RestaurantMock.restaurant.id }, { $set: { drinks: RestaurantMock.drinkGroups } }, { new: true });
			} catch (error) {
				expect(error.message).toEqual('fail');
			}
		});
	});

	describe('PostRestaurant', () => {
		it('should add new restaurant if mongo query success and return with new restaurant', async () => {
			RestaurantModel.create = jest.fn().mockResolvedValue(RestaurantMock.restaurantDAO);
			const restaurant = await RestaurantDAO.postRestaurant(RestaurantMock.postRestaurant);
			expect(RestaurantModel.create).toHaveBeenCalled();
			expect(restaurant.drinks).toEqual(RestaurantMock.restaurantDAO.drinks);
			expect(restaurant.menu).toEqual(RestaurantMock.restaurantDAO.menu);
		});

		it('should throw an error if update menu mongo query was fail', async () => {
			RestaurantModel.create = jest.fn().mockRejectedValue(new Error('fail'));
			try {
				await RestaurantDAO.postRestaurant(RestaurantMock.postRestaurant);
				expect(RestaurantModel.create).toHaveBeenCalledWith(RestaurantMock.restaurantDAO);
			} catch (error) {
				expect(error.message).toEqual('fail');
			}
		});
	});
});
