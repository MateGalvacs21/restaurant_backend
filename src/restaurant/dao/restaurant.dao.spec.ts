import {RestaurantModel} from "@root/restaurant/model/restaurant.model";
import {RestaurantMock} from "@root/shared/mocks/data-mocks/restaurant.mock";
import {RestaurantDAO} from "@root/restaurant/dao/restaurant.dao";

describe('RestaurantDao',()=>{

    describe('getRestaurant',()=>{

        it('should return with restaurant by id',async ()=>{

            RestaurantModel.findOne= jest.fn().mockResolvedValue(RestaurantMock.restaurantDAO);
            const restaurant = await RestaurantDAO.getRestaurant(RestaurantMock.restaurant.id);

            expect(RestaurantModel.findOne).toHaveBeenCalledWith({_id:RestaurantMock.restaurant.id});
            expect(restaurant).toEqual(RestaurantMock.restaurantDAO);

        });

        it('should return with null if restaurant not found',async ()=>{

            RestaurantModel.findOne = jest.fn().mockResolvedValue([]);
            const restaurant = await RestaurantDAO.getRestaurant(RestaurantMock.restaurant.id);

            expect(RestaurantModel.findOne).toHaveBeenCalledWith({_id:RestaurantMock.restaurant.id});
            expect(restaurant).toEqual([]);
        });



    });








});