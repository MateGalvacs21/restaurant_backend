import express from 'express';
import { StatisticController } from '../controller/statistic.controller';

const controller = new StatisticController();
const router = express.Router();

router.get('/:restaurantId', controller.getStatistics);
router.post('/:id/:payWithCard', controller.backUpStatistics);

export { router as StatisticRoutes };
