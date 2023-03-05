import {DocumentType, getModelForClass, modelOptions, prop, Severity} from "@typegoose/typegoose";
import {DrinkItem} from "./drink-item.model";


@modelOptions({options: {allowMixed: Severity.ALLOW}})
export class DrinkGroup {
    @prop()
    public nameoftype?: string;

    @prop()
    public items?: DocumentType<DrinkItem[]>;

    @prop()
    afa?: number;

}
export const DrinkGroupModel = getModelForClass(DrinkGroup);
