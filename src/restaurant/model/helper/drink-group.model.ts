import { DocumentType, getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose';
import { DrinkItem } from './drink-item.model';
import { Afa } from '@root/shared/models/coin.model';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class DrinkGroup {
	@prop({ required: true })
	public nameoftype: string;

	@prop({ required: true })
	public items: DocumentType<DrinkItem>[];

	@prop({ required: true })
	afa: Afa;

	@prop({required: true})
	name: string;
}

export const DrinkGroupModel = getModelForClass(DrinkGroup);
