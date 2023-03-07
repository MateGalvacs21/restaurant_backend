import { getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose';
import { Afa } from '@root/shared/models/coin.model';

@modelOptions({ options: { allowMixed: Severity.ALLOW, customName: 'orders' } })
export class OrderItem {
	@prop()
	public name?: string;

	@prop()
	public price?: number;

	@prop()
	public afa?: Afa;

	@prop()
	public items?: string[];

	@prop()
	public itemsOriginalCount?: number;

	@prop({ default: [] })
	public extraItems?: string[];

	@prop({ default: [] })
	public removedItems?: string[];

	@prop()
	public type?: string;
}

export const OrderItemModel = getModelForClass(OrderItem);
