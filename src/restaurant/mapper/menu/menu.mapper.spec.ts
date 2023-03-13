import { RestaurantMock } from '@root/shared/mocks/data-mocks/restaurant.mock';
import { MenuMapper } from '@root/restaurant/mapper/menu/menu.mapper';

describe('Menu Mapper', () => {
	it('should create menu item dto from menu item dao', () => {
		const dao = RestaurantMock.restaurantDAO.menu[0];
		const dto = MenuMapper.mapToDTOFromDAO(dao);

		expect(dto).toEqual(dao);
	});

	it('should create menu item dao from menu item dto', () => {
		const dto = RestaurantMock.restaurant.menu[0];
		const dao = MenuMapper.mapToDAOFromDTO(dto);

		expect(dto).toEqual(dao);
	});

	it('should create menu dto list from menu dao list', () => {
		const dao = RestaurantMock.restaurantDAO.menu;
		const dto = MenuMapper.mapToDTOList(dao);

		expect(dto).toEqual(dao);
	});

	it('should create menu dao list from menu dto list', () => {
		const dto = RestaurantMock.restaurant.menu;
		const dao = MenuMapper.mapToDAOList(dto);

		expect(dto).toEqual(dao);
	});
});
