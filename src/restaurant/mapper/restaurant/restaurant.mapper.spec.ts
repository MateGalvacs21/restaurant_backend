import {RestaurantMock} from "@root/shared/mocks/data-mocks/restaurant.mock";
import {RestaurantMapper} from "@root/restaurant/mapper/restaurant/restaurant.mapper";
import {DrinkMapper} from "@root/restaurant/mapper/drink/drink.mapper";
import {MenuMapper} from "@root/restaurant/mapper/menu/menu.mapper";

describe('Restaurant Mapper',()=>{

    it('should return dto if use mapToDTO method',()=>{
        const dao = RestaurantMock.restaurantDAO;
        const dto = RestaurantMapper.mapToDTO(dao);
        expect(dao._id.toString()).toEqual(dto.id);
        expect(DrinkMapper.mapGroupToDTOList(dao.drinks)).toEqual(dto.drinks);
        expect(MenuMapper.mapToDTOList(dao.menu)).toEqual(dto.menu);
    });

    it('should return dao if use mapToDAO method',()=>{
        const dto = RestaurantMock.postRestaurant;
        const dao = RestaurantMapper.mapToDAO(dto);
        expect(DrinkMapper.mapGroupToDAOList(dto.drinks)).toEqual(dao.drinks);
        expect(MenuMapper.mapToDAOList(dto.menu)).toEqual(dao.menu);
    });
});