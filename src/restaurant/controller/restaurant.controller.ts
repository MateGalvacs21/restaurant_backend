import {RestaurantService} from "../service/restaurant.service";
import {Request, Response} from "express";
import {
    DeleteRestaurant,
    EditDrinksRestaurant,
    EditMenuRestaurant,
    PostRestaurant
} from "../../models/restaurant.dto";
import {Types} from "mongoose";
import {StatusCodes} from "http-status-codes";

export class RestaurantController {
    private readonly restaurantService = new RestaurantService();
    public getRestaurant = (req: Request, res: Response) => {
        this.restaurantService.getRestaurant(req.params.id)
            .then((restaurant) => {
                res.status(StatusCodes.OK).json(restaurant);
            })
            .catch((error) => {
                res.status(StatusCodes.NOT_FOUND).json(error);
            })
    }

    public patchMenu = (req: Request, res: Response) => {
        const restaurant: EditMenuRestaurant = {
            menu: req.body.menu,
        }
        this.restaurantService.patchMenu(req.params.id, restaurant)
            .then((restaurant) => {
                res.status(StatusCodes.ACCEPTED).json(restaurant);
            })
            .catch((error) => {
                res.status(StatusCodes.NOT_FOUND).json(error);
            })
    }

    public patchDrink = (req: Request, res: Response) => {
        const restaurant: EditDrinksRestaurant = {
            drinks: req.body.drinks,
        }
        this.restaurantService.patchDrinks(req.params.id, restaurant)
            .then((restaurant) => {
                res.status(StatusCodes.ACCEPTED).json(restaurant);
            })
            .catch((error) => {
                res.status(StatusCodes.NOT_FOUND).json(error);
            })
    }

    public deleteRestaurant = (req: Request, res: Response) => {
        const restaurant: DeleteRestaurant = {
            id: new Types.ObjectId(req.params.id).toString(),
        }
        this.restaurantService.deleteRestaurant(restaurant)
            .then(() => {
                res.status(StatusCodes.OK).json({deletedId: restaurant.id});
            })
            .catch((error) => {
                res.status(StatusCodes.NOT_FOUND).json(error);
            })
    }

    public postRestaurant = (req: Request, res: Response) => {
        const restaurant: PostRestaurant = {
            drinks: req.body.drinks,
            menu: req.body.menu
        }

        this.restaurantService.postRestaurant(restaurant)
            .then((restaurant) => {
                res.status(StatusCodes.CREATED).json(restaurant);
            })
            .catch((error) => {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
            })
    }
}