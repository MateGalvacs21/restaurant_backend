import { getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose';
import { Types } from 'mongoose';

@modelOptions({ options: { allowMixed: Severity.ALLOW, customName: 'users' } })
export class User {
	@prop({ required: true })
	public _id: Types.ObjectId;

	@prop({ required: true })
	public email: string;

	@prop({ required: true })
	public password: string;

	@prop({ required: true })
	public name: string;

	@prop()
	public restaurantId?: string;

	@prop({ required: true, default: false })
	public isAdmin: boolean;
}

export const AuthenticationModel = getModelForClass(User);
