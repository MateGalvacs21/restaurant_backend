import {RestaurantDAO} from "@root/restaurant/dao/restaurant.dao";
import {RestaurantMock} from "@root/shared/mocks/data-mocks/restaurant.mock";
import {RestaurantService} from "@root/restaurant/service/restaurant.service";
import {RestaurantMapper} from "@root/restaurant/mapper/restaurant/restaurant.mapper";
import {DrinkMapper} from "@root/restaurant/mapper/drink/drink.mapper";
import {MenuMapper} from "@root/restaurant/mapper/menu/menu.mapper";

describe('Restaurant Service',()=>{

    describe('getRestaurant',()=>{

        it('should return with restaurant if query found in database',async()=>{

            const daoSpy = jest.spyOn(RestaurantDAO,'getRestaurant').mockResolvedValue(RestaurantMock.restaurantDAO);
            const restaurant = await RestaurantService.getRestaurant(RestaurantMock.restaurantDAO._id.toString());

            expect(daoSpy).toHaveBeenCalledWith(RestaurantMock.restaurantDAO._id.toString());
            expect(restaurant).toEqual(RestaurantMapper.mapToDTO(RestaurantMock.restaurantDAO));
        });

        it('should return with null if query not found restaurant in database',async()=>{

            const daoSpy = jest.spyOn(RestaurantDAO,'getRestaurant').mockResolvedValue(null);
            const restaurant = await RestaurantService.getRestaurant(RestaurantMock.restaurantDAO._id.toString());

            expect(daoSpy).toHaveBeenCalledWith(RestaurantMock.restaurantDAO._id.toString());
            expect(restaurant).toEqual(null);
        });
    });

    describe('PatchMenu',()=>{

        it('should return with restaurant with updated menu if query found in database',async()=>{

            const daoSpy = jest.spyOn(RestaurantDAO,'patchRestaurantMenu').mockResolvedValue(RestaurantMock.restaurantDAO);
            const restaurant = await RestaurantService.patchMenu(RestaurantMock.restaurantDAO._id.toString(),RestaurantMock.editMenuMock);

            expect(daoSpy).toHaveBeenCalledWith(RestaurantMock.restaurantDAO._id.toString(),RestaurantMock.editMenuMock);
            expect(restaurant).toEqual(RestaurantMapper.mapToDTO(RestaurantMock.restaurantDAO));
        });

        it('should return with null if query not found restaurant in database and cannot update menu',async()=>{

            const daoSpy = jest.spyOn(RestaurantDAO,'patchRestaurantMenu').mockResolvedValue(null);
            const restaurant = await RestaurantService.patchMenu(RestaurantMock.restaurantDAO._id.toString(), RestaurantMock.editMenuMock);

            expect(daoSpy).toHaveBeenCalledWith(RestaurantMock.restaurantDAO._id.toString(),RestaurantMock.editMenuMock);
            expect(restaurant).toEqual(null);
        });
    });

    describe('PatchDrink',()=>{

        it('should return with restaurant with updated drinks if query found in database',async()=>{

            const daoSpy = jest.spyOn(RestaurantDAO,'patchRestaurantDrink').mockResolvedValue(RestaurantMock.restaurantDAO);
            const restaurant = await RestaurantService.patchDrinks(RestaurantMock.restaurantDAO._id.toString(),RestaurantMock.editDrinkMock);

            expect(daoSpy).toHaveBeenCalledWith(RestaurantMock.restaurantDAO._id.toString(),RestaurantMock.editDrinkMock);
            expect(restaurant).toEqual(RestaurantMapper.mapToDTO(RestaurantMock.restaurantDAO));
        });

        it('should return with null if query not found restaurant in database and cannot update drink',async()=>{

            const daoSpy = jest.spyOn(RestaurantDAO,'patchRestaurantDrink').mockResolvedValue(null);
            const restaurant = await RestaurantService.patchDrinks(RestaurantMock.restaurantDAO._id.toString(), RestaurantMock.editDrinkMock);

            expect(daoSpy).toHaveBeenCalledWith(RestaurantMock.restaurantDAO._id.toString(),RestaurantMock.editDrinkMock);
            expect(restaurant).toEqual(null);
        });
    });

    describe('PostRestaurant',()=>{

        it('should return with new restaurant',async()=>{

            const daoSpy = jest.spyOn(RestaurantDAO,'postRestaurant').mockResolvedValue(RestaurantMock.restaurantDAO);
            const restaurant = await RestaurantService.postRestaurant(RestaurantMock.postRestaurant);

            expect(daoSpy).toHaveBeenCalledWith(RestaurantMock.postRestaurant);
            expect(restaurant.drinks).toEqual(DrinkMapper.mapGroupToDTOList(RestaurantMock.restaurantDAO.drinks));
            expect(restaurant.menu).toEqual(MenuMapper.mapToDTOList(RestaurantMock.restaurantDAO.menu));
        });

        it('should return with null if query cannot be called',async()=>{

            const daoSpy = jest.spyOn(RestaurantDAO,'postRestaurant').mockResolvedValue(null);
            const restaurant = await RestaurantService.postRestaurant(RestaurantMock.postRestaurant);

            expect(daoSpy).toHaveBeenCalledWith(RestaurantMock.postRestaurant);
            expect(restaurant).toEqual(null);
        });
    });

    describe('deleteRestaurant',()=>{

        it('should call dao query',async()=>{

            const daoSpy = jest.spyOn(RestaurantDAO,'deleteRestaurant').mockResolvedValue(null);
            await RestaurantService.deleteRestaurant({id: RestaurantMock.restaurant.id});

            expect(daoSpy).toHaveBeenCalledWith({id: RestaurantMock.restaurant.id});
        });

        it('should throw an error if query was fail',async()=>{

            const daoSpy = jest.spyOn(RestaurantDAO,'deleteRestaurant').mockRejectedValue(new Error('fail'));
            try {
                await RestaurantService.deleteRestaurant({id: RestaurantMock.restaurant.id});
                expect(daoSpy).toHaveBeenCalledWith({id: RestaurantMock.restaurant.id});
            }catch (error){
                expect(error.message).toEqual('fail');
            }
        });
    });
});