import { getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';
import { Order } from '../../order/model/order.model';

@modelOptions({ options: { allowMixed: Severity.ALLOW, customName: 'statistics' } })
export class Statistic extends Order {}

export const StatisticModel = getModelForClass(Statistic);
