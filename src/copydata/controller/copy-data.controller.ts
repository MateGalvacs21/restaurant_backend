import { Request, Response } from 'express';
import { CopyDataService } from '../service/copy-data.service';
import { StatusCodes } from 'http-status-codes';

export class CopyDataController {
	public getAllData = (req: Request, res: Response) => {
		CopyDataService.getAllData(req.params.restaurantId)
			.then((data) => {
				res.status(StatusCodes.OK).json(data);
			})
			.catch((error) => {
				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:error.message});
			});
	};

	public deleteData = (req: Request, res: Response) => {
		CopyDataService.deleteData(req.params.restaurantId, req.params.table)
			.then(() => {
				res.status(StatusCodes.OK).json({ deletedTable: req.params.table });
			})
			.catch((error) => {
				res.status(StatusCodes.NOT_FOUND).json({error:error.message});
			});
	};
}
