import express from 'express';
import { StatisticController } from '../controller/statistic.controller';

const controller = new StatisticController();
const router = express.Router();

router.get('/:restaurantId', controller.getStatistics);

export { router as StatisticRoutes };
