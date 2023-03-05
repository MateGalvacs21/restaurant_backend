import { getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose';
import { Types } from 'mongoose';

@modelOptions({ options: { allowMixed: Severity.ALLOW, customName: 'logged-in' } })
export class LoggedUser {
	@prop()
	public _id?: Types.ObjectId;

	@prop()
	public date?: Date;
}

export const LoggedUserModel = getModelForClass(LoggedUser);
