import {OrderItemDTO} from "./order-item.dto";

export type CopyDataDTO = {
    restaurantId: string;
    items: OrderItemDTO[],
    table: string;

 }