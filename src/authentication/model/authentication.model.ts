import {getModelForClass, modelOptions, prop, Severity} from "@typegoose/typegoose";
import {Types} from "mongoose";

@modelOptions({options: {allowMixed: Severity.ALLOW, customName: 'users'}})
export class User {
    @prop()
    public _id?: Types.ObjectId

    @prop()
    public email?: string

    @prop()
    public password?: string;

    @prop()
    public name?: string;

    @prop()
    public restaurantId?: string;

    @prop()
    public isAdmin?: boolean;

}

export const AuthenticationModel = getModelForClass(User);