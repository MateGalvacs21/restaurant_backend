import {DocumentType} from "@typegoose/typegoose";
import {Order} from "@root/order/model/order.model";
import {OrderItemMapper} from "@root/order/mapper/order/helper/order-item.mapper";

export const OrderCollectionMock = {
    get order(): DocumentType<Order> {
        return {
            table: "B1",
            date: new Date().toString(),
            restaurantId: "63cc776b9c1f72057706a601",
            amount: 5000,
            afa27: 2000,
            afa5: 3000,
            items: OrderItemMapper.mapItemToDAOList([{
                    name: "TestEtel",
                    price: 3000,
                    afa: 5,
                    items: ["example"],
                    itemsOriginalCount: 1,
                    extraItems: [],
                    removedItems: [],
                    type: "Leves"
            },
                {
                    name: "TestEtel",
                    price: 2000,
                    afa: 5,
                    items: ["example"],
                    itemsOriginalCount: 1,
                    extraItems: [],
                    removedItems: [],
                    type: "Leves"
                },
                {
                    name: "TestEtel",
                    price: 3000,
                    afa: 5,
                    items: ["example"],
                    itemsOriginalCount: 1,
                    extraItems: [],
                    removedItems: [],
                    type: "desszert"
                },
                {
                    name: "TestEtel",
                    price: 2000,
                    afa: 5,
                    items: ["example"],
                    itemsOriginalCount: 1,
                    extraItems: [],
                    removedItems: [],
                    type: "martas"
                },
                {
                    name: "TestEtel",
                    price: 3000,
                    afa: 5,
                    items: ["example"],
                    itemsOriginalCount: 1,
                    extraItems: [],
                    removedItems: [],
                    type: "salata"
                },
                {
                    name: "TestEtel",
                    price: 2000,
                    afa: 5,
                    items: ["example"],
                    itemsOriginalCount: 1,
                    extraItems: [],
                    removedItems: [],
                    type: "foetel"
                }
            ])
        } as DocumentType<Order>
    }
}