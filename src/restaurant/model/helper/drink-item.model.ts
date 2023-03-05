import { getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class DrinkItem {
	@prop()
	public id?: string;

	@prop()
	public name?: string;

	@prop()
	public price?: number;
}
export const DrinkItemModel = getModelForClass(DrinkItem);
