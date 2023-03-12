import {DocumentType} from "@typegoose/typegoose";
import {Order} from "@root/order/model/order.model";
import {OrderItemMapper} from "@root/order/mapper/order/helper/order-item.mapper";
import {Types} from "mongoose";
import {OrderItemDTO} from "@root/shared/models/order-item.dto";

export const OrderCollectionMock = {
    get order(): DocumentType<Order> {
        return {
            _id: new Types.ObjectId("640cf2c4fa1c6aae619f8494"),
            table: "B1",
            date: new Date("2023-03-10").toString(),
            restaurantId: "63cc776b9c1f72057706a601",
            amount: 15000,
            afa27: 0,
            afa5: 15000,
            items: OrderItemMapper.mapItemToDAOList([{
                    name: "TestEtel",
                    price: 3000,
                    afa: 5,
                    items: ["example"],
                    itemsOriginalCount: 1,
                    extraItems: [],
                    removedItems: [],
                    type: "Leves",
                    nickname: "asd"
            },
                {
                    name: "TestEtel",
                    price: 2000,
                    afa: 5,
                    items: ["example"],
                    itemsOriginalCount: 1,
                    extraItems: [],
                    removedItems: [],
                    type: "Leves",
                    nickname: "asd"
                },
                {
                    name: "TestEtel",
                    price: 3000,
                    afa: 5,
                    items: ["example"],
                    itemsOriginalCount: 1,
                    extraItems: [],
                    removedItems: [],
                    type: "desszert",
                    nickname: "asd"
                },
                {
                    name: "TestEtel",
                    price: 2000,
                    afa: 5,
                    items: ["example"],
                    itemsOriginalCount: 1,
                    extraItems: [],
                    removedItems: [],
                    type: "martas",
                    nickname: "asd"
                },
                {
                    name: "TestEtel",
                    price: 3000,
                    afa: 5,
                    items: ["example"],
                    itemsOriginalCount: 1,
                    extraItems: [],
                    removedItems: [],
                    type: "salata",
                    nickname: "asd"
                },
                {
                    name: "TestEtel",
                    price: 2000,
                    afa: 5,
                    items: ["example"],
                    itemsOriginalCount: 1,
                    extraItems: [],
                    removedItems: [],
                    type: "foetel",
                    nickname: "asd"
                }
            ])
        } as DocumentType<Order>
    },
    get orderItemDTO(): OrderItemDTO{
        return {
            name:"test",
            nickname:"test nickname",
            price:5000,
            afa:5,
            items:["ex"],
            itemsOriginalCount:1,
            extraItems:[],
            type:"foetel",
            removedItems:[]
        }
    }
}