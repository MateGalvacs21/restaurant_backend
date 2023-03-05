import express from "express";
import {RestaurantController} from "../controller/restaurant.controller";

const controller = new RestaurantController();
const router = express.Router();

router.get("/:id",controller.getRestaurant);
router.patch("/:id/drink",controller.patchDrink);
router.patch("/:id/menu",controller.patchDrink);
router.post("/",controller.postRestaurant);
router.delete("/:id",controller.deleteRestaurant);


export {router as RestaurantRoutes};
