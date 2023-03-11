import {Request, Response} from 'express';
import {StatisticService} from '../service/statistic.service';
import {StatusCodes} from 'http-status-codes';

export class StatisticController {
    public getStatistics = (req: Request, res: Response) => {
        StatisticService.getStatistics(req.params.restaurantId)
            .then((orders) => {
                res.status(StatusCodes.OK).json(orders);
            })
            .catch((error) => {
                res.status(StatusCodes.NOT_FOUND).json({error: error.message});
            });
    };
}
