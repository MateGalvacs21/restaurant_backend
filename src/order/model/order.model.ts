import { DocumentType, getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { OrderItem } from './helper/order-item.model';

@modelOptions({ options: { allowMixed: Severity.ALLOW, customName: 'orders' } })
export class Order {
	@prop({ required: true })
	public _id: Types.ObjectId;

	@prop({ required: true })
	public amount: number;

	@prop({ required: true })
	public afa27: number;

	@prop({ required: true })
	public afa5: number;

	@prop({ required: true })
	public items: DocumentType<OrderItem>[];

	@prop({ required: true })
	public table: string;

	@prop({ required: true })
	public restaurantId: string;

	@prop({ required: true })
	public date: string;
}

export const OrderModel = getModelForClass(Order);
