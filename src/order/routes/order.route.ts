import express from 'express';
import { OrderController } from '../controller/order.controller';

const controller = new OrderController();
const router = express.Router();

router.get('/restaurant/:restaurantId', controller.getOrdersByRestaurant);
router.get('/table/:table', controller.getOrdersByTable);
router.patch('/:id', controller.patchOrder);
router.post('/', controller.postOrder);
router.delete('/:id', controller.deleteOrder);

export { router as OrderRoutes };
