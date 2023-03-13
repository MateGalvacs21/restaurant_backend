import { OrderService } from '../service/order.service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PatchOrder, PostOrder } from '../../shared/models/order.dto';

export class OrderController {
	public getOrdersByTable = (req: Request, res: Response) => {
		OrderService.getOrdersByTable(req.params.table)
			.then((orders) => {
				res.status(StatusCodes.OK).json(orders);
			})
			.catch((error) => {
				res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
			});
	};

	public getOrdersByRestaurant = (req: Request, res: Response) => {
		OrderService.getOrdersByRestaurant(req.params.restaurantId)
			.then((orders) => {
				res.status(StatusCodes.OK).json(orders);
			})
			.catch((error) => {
				res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
			});
	};

	public deleteOrder = (req: Request, res: Response) => {
		OrderService.deleteOrder(req.params.id)
			.then(() => {
				res.status(StatusCodes.OK).json({ deleteId: req.params.id });
			})
			.catch((error) => {
				res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
			});
	};

	public patchOrder = (req: Request, res: Response) => {
		const patchOrder: PatchOrder = {
			id: req.params.id,
			items: req.body.items,
			amount: req.body.amount
		};

		OrderService.patchOrder(patchOrder)
			.then((order) => {
				res.status(StatusCodes.ACCEPTED).json(order);
			})
			.catch((error) => {
				res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
			});
	};

	public postOrder = (req: Request, res: Response) => {
		const postedOrder: PostOrder = req.body;

		OrderService.postOrder(postedOrder)
			.then((order) => {
				res.status(StatusCodes.CREATED).json(order);
			})
			.catch((error) => {
				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
			});
	};
}
