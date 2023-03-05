import express from 'express';
import { AuthenticationController } from '../controller/authentication.controller';

const controller = new AuthenticationController();
const router = express.Router();

router.get('/:id', controller.getLoggedUser);
router.delete('/logout/:id', controller.loginOut);
router.post('/login', controller.login);
router.post('/registration', controller.signUp);
router.patch('/:id/:restaurantId', controller.addRestaurant);

export { router as AuthenticationRoutes };
