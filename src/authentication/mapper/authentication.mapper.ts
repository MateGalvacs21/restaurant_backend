import {DocumentType} from "@typegoose/typegoose";
import {User} from "../model/authentication.model";
import {RegisterDTO, UserDTO} from "../../models/authentication.dto";
import {Types} from "mongoose";

export class AuthenticationMapper {

    public static mapToDTO(dao: DocumentType<User>): UserDTO {
        return {
            id: dao._id,
            password: dao.password ? dao.password : "",
            email: dao.email ? dao.email : "",
            name: dao.name ? dao.name : "",
            isAdmin: dao.isAdmin ? dao.isAdmin : false,
            restaurantId: dao.restaurantId ? dao.restaurantId : ""
        }
    }

    public static mapToDAO(dto: RegisterDTO): DocumentType<User> {
        return {
            _id: new Types.ObjectId(),
            password: dto.password,
            email: dto.email,
            name: dto.name,
            isAdmin: dto.isAdmin,
            restaurantId: dto.restaurantId ? dto.restaurantId : ""
        } as DocumentType<User>
    }
}