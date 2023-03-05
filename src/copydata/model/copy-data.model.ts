import { DocumentType, getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose';
import { OrderItem } from '../../order/model/helper/order-item.model';

@modelOptions({ options: { allowMixed: Severity.ALLOW, customName: 'copy-data' } })
export class CopyData {
	@prop()
	public table?: string;

	@prop()
	public restaurantId?: string;

	@prop()
	public items?: DocumentType<OrderItem[]>;
}

export const CopyDataModel = getModelForClass(CopyData);
