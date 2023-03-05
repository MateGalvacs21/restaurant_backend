import {getModelForClass, modelOptions, prop, Severity} from "@typegoose/typegoose";

@modelOptions({options: {allowMixed: Severity.ALLOW}})
export class Menu {
    @prop()
    public id?: string;

    @prop()
    public name?: string;

    @prop()
    public nickname?: string;

    @prop()
    public items?: string[];

    @prop()
    public price?: number;

    @prop()
    public type?: string;

    @prop()
    public afa?: number;
}

export const MenuModel = getModelForClass(Menu);
