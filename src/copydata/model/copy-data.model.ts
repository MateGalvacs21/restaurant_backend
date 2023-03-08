import { DocumentType, getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose';
import { OrderItem } from '../../order/model/helper/order-item.model';

@modelOptions({ options: { allowMixed: Severity.ALLOW, customName: 'copy-data' } })
export class CopyData {
	@prop({ required: true })
	public table: string;

	@prop({ required: true })
	public restaurantId: string;

	@prop({ required: true })
	public items: DocumentType<OrderItem>[];
}

export const CopyDataModel = getModelForClass(CopyData);
