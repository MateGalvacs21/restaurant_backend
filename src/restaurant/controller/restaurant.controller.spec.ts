import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import {RestaurantController} from "@root/restaurant/controller/restaurant.controller";
import {RestaurantMock} from "@root/shared/mocks/data-mocks/restaurant.mock";
import {RestaurantService} from "@root/restaurant/service/restaurant.service";

describe('Restaurant controller', () => {

    const restaurantController = new RestaurantController();

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("GetRestaurant", () => {

        const reqMock = ({
            params: {
                id: RestaurantMock.restaurant.id,
            }
        } as unknown) as Request;

        it('should return restaurant and 200 status if data is correct', async () => {
            const serviceSpy = jest.spyOn(RestaurantService, 'getRestaurant').mockResolvedValue(RestaurantMock.restaurant);
            const resMock = ({
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as unknown) as Response;
            await restaurantController.getRestaurant(reqMock, resMock);

            expect(serviceSpy).toHaveBeenCalled();
            expect(resMock.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(resMock.json).toHaveBeenCalledWith(RestaurantMock.restaurant);
        });

        it('should return 400 if restaurant query drop error', async () => {
            const serviceSpy = jest.spyOn(RestaurantService, 'getRestaurant').mockRejectedValue(new Error('error'));
            const resMock = ({
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as unknown) as Response;

            try {
                await restaurantController.getRestaurant(reqMock, resMock);
                expect(serviceSpy).toHaveBeenCalled();
            } catch (error) {
                expect(resMock.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
                expect(resMock.json).toHaveBeenCalledWith({error: error.message});
            }
        });
    });

    describe('patchRestaurantMenu', () => {
        const reqMock = ({
            params:{
                id: RestaurantMock.restaurant.id
            },
            body: {
                menu: RestaurantMock.editMenuMock
            }
        } as unknown) as Request;

        it('should sent 202 status and return with patchedRestaurant', async () => {
            const resMock = ({
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as unknown) as Response;
            const serviceSpy = jest.spyOn(RestaurantService, 'patchMenu').mockResolvedValue(RestaurantMock.restaurant);

            await restaurantController.patchMenu(reqMock, resMock);

            expect(serviceSpy).toHaveBeenCalled();
            expect(resMock.status).toHaveBeenCalledWith(StatusCodes.ACCEPTED);
            expect(resMock.json).toHaveBeenCalledWith(RestaurantMock.restaurant)
        });

        it('should return 404 if service throw anything error', async () => {
            const serviceSpy = jest.spyOn(RestaurantService, 'patchMenu').mockRejectedValue(new Error('Test Error'));

            const resMock = ({
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as unknown) as Response;

            try {
                await restaurantController.patchMenu(reqMock, resMock);
                expect(serviceSpy).toHaveBeenCalled();
            } catch (error) {
                expect(resMock.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
                expect(resMock.json).toHaveBeenCalledWith({error: error.message});
            }
        });
    });

    describe('deleteRestaurant', () => {
        const reqMock = ({
            params: {
                id: RestaurantMock.restaurant.id
            }
        } as unknown) as Request;

        it('should sent 200 status and remove restaurant from database', async () => {
            const resMock = ({
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as unknown) as Response;
            const serviceSpy = jest.spyOn(RestaurantService, 'deleteRestaurant').mockResolvedValue(null);

            await restaurantController.deleteRestaurant(reqMock, resMock);

            expect(serviceSpy).toHaveBeenCalled();
            expect(resMock.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(resMock.json).toHaveBeenCalledWith({deletedId: reqMock.params.id})
        });

        it('should return 404 if service throw error and not found restaurant', async () => {
            const serviceSpy = jest.spyOn(RestaurantService, 'deleteRestaurant').mockRejectedValue(new Error('Test Error'));

            const resMock = ({
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as unknown) as Response;

            try {
                await restaurantController.deleteRestaurant(reqMock, resMock);
                expect(serviceSpy).toHaveBeenCalled();
            } catch (error) {
                expect(resMock.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
                expect(resMock.json).toHaveBeenCalledWith({error: error.message});
            }
        });
    });

    describe("PostRestaurant", () => {

        const reqMock = ({
            body: {
                drinks: RestaurantMock.restaurant.drinks,
                menu: RestaurantMock.restaurant.menu
            }
        } as unknown) as Request;

        it('should return new restaurant and 201 status if data is correct', async () => {
            const serviceSpy = jest.spyOn(RestaurantService, 'postRestaurant').mockResolvedValue(RestaurantMock.restaurant);
            const resMock = ({
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as unknown) as Response;

            await restaurantController.postRestaurant(reqMock, resMock);

            expect(resMock.status).toHaveBeenCalledWith(StatusCodes.CREATED);
            expect(serviceSpy).toHaveBeenCalled();
            expect(resMock.json).toHaveBeenCalledWith(RestaurantMock.restaurant);
        });

        it('should return 500 if anything error catch in service', async () => {
            const serviceSpy = jest.spyOn(RestaurantService, 'postRestaurant').mockRejectedValue(new Error('error catch'));
            const resMock = ({
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as unknown) as Response;

            try {
                await restaurantController.postRestaurant(reqMock, resMock);
                expect(serviceSpy).toHaveBeenCalled();
            } catch (error) {
                expect(resMock.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
                expect(resMock.json).toHaveBeenCalledWith({error: error.message});
            }
        });
    });

    describe("patchRestaurantDrinks", () => {

        const reqMock = ({
            params:{
                id: RestaurantMock.restaurant.id
            },
            body: {
                drinks: RestaurantMock.editDrinkMock
            }
        } as unknown) as Request;

        it('should return with updated restaurant and 202 status if data is correct', async () => {
            const serviceSpy = jest.spyOn(RestaurantService, 'patchDrinks').mockResolvedValue(RestaurantMock.restaurant);
            const resMock = ({
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as unknown) as Response;

            await restaurantController.patchDrink(reqMock, resMock);

            expect(resMock.status).toHaveBeenCalledWith(StatusCodes.ACCEPTED);
            expect(serviceSpy).toHaveBeenCalled();
            expect(resMock.json).toHaveBeenCalledWith(RestaurantMock.restaurant);
        });

        it('should return 404 if anything error catch in service', async () => {
            const serviceSpy = jest.spyOn(RestaurantService, 'patchDrinks').mockRejectedValue(new Error('Some error'));
            const resMock = ({
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as unknown) as Response;

            try {
                await restaurantController.patchDrink(reqMock, resMock);
                expect(serviceSpy).toHaveBeenCalled();
            } catch (error) {
                expect(resMock.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
                expect(resMock.json).toHaveBeenCalledWith({error: error.message});
            }
        });
    });

});