import { getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class DrinkItem {
	@prop({ required: true })
	public id: string;

	@prop({ required: true })
	public name: string;

	@prop({ required: true })
	public price: number;
}
export const DrinkItemModel = getModelForClass(DrinkItem);
