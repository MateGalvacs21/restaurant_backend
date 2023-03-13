import { getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose';
import { Order } from '../../order/model/order.model';

@modelOptions({ options: { allowMixed: Severity.ALLOW, customName: 'statistics' } })
export class Statistic extends Order {
	@prop({ required: true, default: false })
	payWithCard: boolean;
}

export const StatisticModel = getModelForClass(Statistic);
