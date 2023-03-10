import { getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose';
import { Afa } from '@root/shared/models/coin.model';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Menu {
	@prop({ required: true })
	public id: string;

	@prop({ required: true })
	public name: string;

	@prop({ required: true })
	public nickname: string;

	@prop({ required: true })
	public items: string[];

	@prop({ required: true })
	public price: number;

	@prop({ required: true })
	public type: string;

	@prop({ required: true })
	public afa: Afa;
}

export const MenuModel = getModelForClass(Menu);
