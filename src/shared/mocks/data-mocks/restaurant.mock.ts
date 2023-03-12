import {DrinkItemDTO} from "@root/shared/models/drink-item.dto";
import {DrinkGroupDTO} from "@root/shared/models/drink-group.dto";
import {MenuDTO} from "@root/shared/models/menu.dto";
import {RestaurantDTO} from "@root/shared/models/restaurant.dto";
import {DocumentType} from "@typegoose/typegoose";
import {Restaurant} from "@root/restaurant/model/restaurant.model";
import {Types} from "mongoose";
import {MenuMapper} from "@root/restaurant/mapper/menu/menu.mapper";
import {DrinkMapper} from "@root/restaurant/mapper/drink/drink.mapper";

export const RestaurantMock = {
    get drinkItemsMock():DrinkItemDTO[]{
        return [
            {
                id: "almaSzorp3dl",
                name: "alma szörp 3 dl",
                price: 800
            },
            {
                id: "almaSzorp5dl",
                name: "alma szörp 5 dl",
                price: 1200
            }
        ]
    },
    get drinkGroups(): DrinkGroupDTO[]{
        return [
            {
                afa:5,
                nameoftype: "almaSzorp",
                items: this.drinkItemsMock
            }
        ]
    },
    get menu(): MenuDTO[]{
        return [
            {
                afa:5,
                name:"Csülök",
                items:['bulgur'],
                price:5000,
                id:"csulok",
                type:'foetel',
                nickname:'csülök'
            },
            {
                afa:5,
                name:"csirkemell",
                items:['bulgur'],
                price:4000,
                id:"csik",
                type:'foetel',
                nickname:'csik'
            }
        ]
    },
    get restaurant():RestaurantDTO {
        return {
            menu: this.menu,
            drinks:this.drinkGroups,
            id: "63cc776b9c1f72057706a601"
        }
    },
    get restaurantDAO():DocumentType<Restaurant> {
        return {
            menu: MenuMapper.mapToDAOList(this.menu),
            drinks:DrinkMapper.mapGroupToDAOList(this.drinkGroups),
            _id: new Types.ObjectId("63cc776b9c1f72057706a601")
        } as DocumentType<Restaurant>
    }
}