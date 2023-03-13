import { RestaurantMock } from '@root/shared/mocks/data-mocks/restaurant.mock';
import { DrinkMapper } from '@root/restaurant/mapper/drink/drink.mapper';

describe('Drink Mapper', () => {
	it('should create item dao from item dto', () => {
		const dto = RestaurantMock.restaurant.drinks[0].items[0];
		const dao = DrinkMapper.mapItemToDAO(dto);

		expect(dto).toEqual(dao);
	});

	it('should create item dto from item dao', () => {
		const dao = RestaurantMock.restaurantDAO.drinks[0].items[0];
		const dto = DrinkMapper.mapItemToDTO(dao);

		expect(dto).toEqual(dao);
	});

	it('should create group dao from group dto', () => {
		const dto = RestaurantMock.restaurant.drinks[0];
		const dao = DrinkMapper.mapGroupToDAO(dto);

		expect(dto).toEqual(dao);
	});

	it('should create group dto from group dao', () => {
		const dao = RestaurantMock.restaurantDAO.drinks[0];
		const dto = DrinkMapper.mapGroupToDTO(dao);

		expect(dto).toEqual(dao);
	});

	it('should create item dao list from item dto list', () => {
		const dto = RestaurantMock.restaurant.drinks[0].items;
		const dao = DrinkMapper.mapItemToDAOList(dto);

		expect(dto).toEqual(dao);
	});

	it('should create item dto list from item dao list', () => {
		const dao = RestaurantMock.restaurantDAO.drinks[0].items;
		const dto = DrinkMapper.mapItemToDTOList(dao);

		expect(dto).toEqual(dao);
	});

	it('should create group dao list from group dto list', () => {
		const dto = RestaurantMock.restaurant.drinks;
		const dao = DrinkMapper.mapGroupToDAOList(dto);

		expect(dto).toEqual(dao);
	});

	it('should create group dto list from group dao list', () => {
		const dao = RestaurantMock.restaurantDAO.drinks;
		const dto = DrinkMapper.mapGroupToDTOList(dao);

		expect(dto).toEqual(dao);
	});
});
