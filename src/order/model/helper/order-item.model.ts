import { getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose';
import { Afa } from '@root/shared/models/coin.model';

@modelOptions({ options: { allowMixed: Severity.ALLOW, customName: 'orders' } })
export class OrderItem {
	@prop({ required: true })
	public name: string;

	@prop({ required: true })
	public nickname: string;

	@prop({ required: true })
	public price: number;

	@prop({ required: true })
	public afa: Afa;

	@prop({ required: true })
	public items: string[];

	@prop({ required: true })
	public itemsOriginalCount: number;

	@prop({ required: true, default: [] })
	public extraItems: string[];

	@prop({ required: true, default: [] })
	public removedItems: string[];

	@prop({ required: true })
	public type: string;
}

export const OrderItemModel = getModelForClass(OrderItem);
