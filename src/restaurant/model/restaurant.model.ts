import { DocumentType, getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { DrinkGroup } from './helper/drink-group.model';
import { Menu } from './helper/menu.model';

@modelOptions({ options: { allowMixed: Severity.ALLOW, customName: 'restaurant' } })
export class Restaurant {
	@prop()
	public _id?: Types.ObjectId;

	@prop()
	public drinks?: DocumentType<DrinkGroup[]>;

	@prop()
	public menu?: DocumentType<Menu[]>;

	@prop()
	public items?: string[];
}

export const RestaurantModel = getModelForClass(Restaurant);
