import {DocumentType, getModelForClass, modelOptions, prop, Severity} from "@typegoose/typegoose";
import {Types} from "mongoose";
import {OrderItem} from "./helper/order-item.model";

@modelOptions({options: {allowMixed: Severity.ALLOW, customName: 'orders'}})
export class Order {
    @prop()
    public _id?: Types.ObjectId;

    @prop()
    public amount?: number;

    @prop()
    public afa27?: number;

    @prop()
    public afa5?: number;

    @prop()
    public items?: DocumentType<OrderItem[]>;

    @prop()
    public table?: string;

    @prop()
    public restaurantId?: string;

    @prop()
    public date?: string;

}

export const OrderModel = getModelForClass(Order);
