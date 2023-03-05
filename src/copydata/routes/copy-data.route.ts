import express from 'express';
import { CopyDataController } from '../controller/copy-data.controller';

const controller = new CopyDataController();
const router = express.Router();

router.get('/:restaurantId', controller.getAllData);
router.delete('/:restaurantId/:id', controller.deleteData);

export { router as PrintDataRoutes };
