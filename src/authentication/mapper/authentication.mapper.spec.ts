import {UserCollectionMock} from "@root/shared/mocks/data-mocks/user-data.mock";
import {AuthenticationMapper} from "@root/authentication/mapper/authentication.mapper";
import {DocumentType} from "@typegoose/typegoose";
import {LoggedUser} from "@root/authentication/model/loged-user.model";

describe('Authentication Mapper',()=>{
    it('should return with DTO data from DAO data',()=>{
        const user = UserCollectionMock.user;
        const mappedUser = AuthenticationMapper.mapToDTO(user);

        expect(mappedUser.id).toEqual(user._id.toString());
        expect(mappedUser.email).toEqual(user.email);
        expect(mappedUser.password).toEqual(user.password);
        expect(mappedUser.name).toEqual(user.name);
        expect(mappedUser.isAdmin).toEqual(user.isAdmin);
        expect(mappedUser.restaurantId).toEqual(user.restaurantId);
    });

    it('should return with DAO data from registered data',()=>{
        const user = UserCollectionMock.registeredUser;
        const mappedUser = AuthenticationMapper.mapToDAO(user);

        expect(mappedUser._id).toBeTruthy();
        expect(mappedUser.password).toEqual(user.password);
        expect(mappedUser.email).toEqual(user.email);
        expect(mappedUser.name).toEqual(user.name);
        expect(mappedUser.isAdmin).toEqual(user.isAdmin);
        expect(mappedUser.restaurantId).toEqual(user.restaurantId);
    });

    it('should return with DTO data from logged user data',()=>{
        const user = {_id: UserCollectionMock.user._id, date: new Date()} as DocumentType<LoggedUser>;
        const mappedUser = AuthenticationMapper.mapLoggedUserDTO(user);

        expect(mappedUser.id).toEqual(user._id.toString());
        expect(mappedUser.date).toEqual(user.date);
    });
})