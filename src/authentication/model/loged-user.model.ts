import { getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose';
import { Types } from 'mongoose';

@modelOptions({ options: { allowMixed: Severity.ALLOW, customName: 'logged-in' } })
export class LoggedUser {
	@prop({ required: true })
	public _id: Types.ObjectId;

	@prop({ required: true, default: new  Date()})
	public date: Date;
}

export const LoggedUserModel = getModelForClass(LoggedUser);
