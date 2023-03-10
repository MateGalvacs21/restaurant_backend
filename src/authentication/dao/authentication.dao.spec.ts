import {AuthenticationsDAO} from '@root/authentication/dao/authentications.dao';
import SpyInstance = jest.SpyInstance;
import {DocumentType} from '@typegoose/typegoose';
import {AuthenticationModel, User} from '@root/authentication/model/authentication.model';
import {UserCollectionMock} from '@root/shared/mocks/data-mocks/user-data.mock';
import {LoggedUserModel} from '@root/authentication/model/loged-user.model';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthenticationDao', () => {
    let userMock: DocumentType<User>;
    let consoleSpy: SpyInstance;
    let compareSpy: SpyInstance;
    beforeEach(() => {
        userMock = UserCollectionMock.user as DocumentType<User>;
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Login', () => {
        beforeEach(async () => {
            compareSpy = jest.spyOn(bcrypt, 'compareSync');
        });
        it('should be login if user data is correct', async () => {
            compareSpy.mockReturnValue(true);
            AuthenticationModel.findOne = jest.fn().mockResolvedValue(userMock);
            LoggedUserModel.findOne = jest.fn().mockResolvedValue(null);
            LoggedUserModel.insertMany = jest.fn().mockResolvedValue({_id: userMock._id, date: new Date()});

            const user = await AuthenticationsDAO.login({email: userMock.email, password: userMock.password});

            expect(consoleSpy).toBeCalled();
            expect(user).toEqual(userMock);
            expect(AuthenticationModel.findOne).toHaveBeenCalledWith({email: userMock.email});
            expect(LoggedUserModel.findOne).toHaveBeenCalledWith({_id: user._id});
            expect(LoggedUserModel.insertMany).toHaveBeenCalled();
            expect(compareSpy).toHaveBeenCalled();
        });

        it('should be null user value if no have user in database', async () => {
            AuthenticationModel.findOne = jest.fn().mockResolvedValue(null);

            const user = await AuthenticationsDAO.login({email: userMock.email, password: userMock.password});

            expect(user).toEqual(null);
            expect(AuthenticationModel.findOne).toHaveBeenCalledWith({email: userMock.email});
        });

        it('should be return null if user already logged', async () => {
            AuthenticationModel.findOne = jest.fn().mockResolvedValue(userMock);
            LoggedUserModel.findOne = jest.fn().mockResolvedValue({_id: userMock._id});

            const user = await AuthenticationsDAO.login({email: userMock.email, password: userMock.password});

            expect(user).toEqual(null);
            expect(AuthenticationModel.findOne).toHaveBeenCalledWith({email: userMock.email});
            expect(LoggedUserModel.findOne).toHaveBeenCalledWith({_id: userMock._id});
        });

        it('should be return null if user data is incorrect', async () => {
            compareSpy.mockReturnValue(false);
            AuthenticationModel.findOne = jest.fn().mockResolvedValue(userMock);
            LoggedUserModel.findOne = jest.fn().mockResolvedValue(null);

            const user = await AuthenticationsDAO.login({email: userMock.email, password: userMock.password});

            expect(compareSpy).toBeCalled();
            expect(user).toEqual(undefined);
            expect(AuthenticationModel.findOne).toHaveBeenCalledWith({email: userMock.email});
            expect(LoggedUserModel.findOne).toHaveBeenCalled();
        });
    });

    describe('LogOut', () => {
        it('should delete user from logged database if user want logging out', async () => {
            LoggedUserModel.findOneAndDelete = jest.fn().mockResolvedValue(userMock);
            LoggedUserModel.findOne = jest.fn().mockResolvedValue(null);

            await AuthenticationsDAO.logOut(userMock._id.toString());

            expect(LoggedUserModel.findOneAndDelete).toHaveBeenCalledWith({_id: userMock._id.toString()});

            const user = await LoggedUserModel.findOne({_id: userMock._id});

            expect(user).toBe(null);
        });
    });

    describe('GetAllLogger', () => {
        it('should return all logger user', async () => {
            const userListCollection = UserCollectionMock.userList;
            LoggedUserModel.find = jest.fn().mockResolvedValue(userListCollection);
            const userList = await AuthenticationsDAO.getAllLogged();

            expect(LoggedUserModel.find).toHaveBeenCalled();
            expect(userList).toEqual(userListCollection);
        });

        it('should return empty list if nobody logged in', async () => {
            LoggedUserModel.find = jest.fn().mockResolvedValue([]);
            const userList = await AuthenticationsDAO.getAllLogged();

            expect(LoggedUserModel.find).toHaveBeenCalled();
            expect(userList).toEqual([]);
            expect(userList.length).toEqual(0);
        });
    });

    describe('GetLoggedUser', () => {
        it('should look an user logged and return with user if yes', async () => {
            LoggedUserModel.findOne = jest.fn().mockResolvedValue(userMock);
            const user = await AuthenticationsDAO.getLoggedUser(userMock._id.toString());

            expect(LoggedUserModel.findOne).toHaveBeenCalledWith({_id: userMock._id.toString()});
            expect(user).toEqual(userMock);
        });

        it('should be return null if user not logged', async () => {
            LoggedUserModel.findOne = jest.fn().mockResolvedValue(null);
            const user = await AuthenticationsDAO.getLoggedUser(userMock._id.toString());

            expect(LoggedUserModel.findOne).toHaveBeenCalledWith({_id: userMock._id.toString()});
            expect(user).toEqual(null);
        });
    });

    describe('AddRestaurant', () => {
        it('should add restaurant id to user and return with user', async () => {
            AuthenticationModel.findOneAndUpdate = jest.fn().mockResolvedValue({
                ...userMock,
                restaurantId: "test restaurant"
            });
            const user = await AuthenticationsDAO.addRestaurant(userMock._id.toString(), "test restaurant");

            expect(AuthenticationModel.findOneAndUpdate).toHaveBeenCalled();
            expect(user).toEqual({...userMock, restaurantId: "test restaurant"});
            expect(user.restaurantId).toEqual("test restaurant");
        });
    });

    describe('SignUp', () => {
        it('should add an new user if user data not exist', async () => {
            AuthenticationModel.findOne = jest.fn().mockResolvedValue(null);
            AuthenticationModel.create = jest.fn().mockResolvedValue(userMock);
            const genSpy = jest.spyOn(bcrypt, 'genSaltSync').mockReturnValue("test");
            const hashSpy = jest.spyOn(bcrypt, 'hashSync').mockReturnValue(userMock.password);
            const user = await AuthenticationsDAO.signUp(userMock);

            expect(AuthenticationModel.create).toHaveBeenCalled();
            expect(AuthenticationModel.findOne).toHaveBeenCalled();
             expect(genSpy).toHaveBeenCalled();
             expect(hashSpy).toHaveBeenCalled()
             expect(user).toEqual(userMock);
        });

        it('should return null if email already exist', async () => {
            AuthenticationModel.findOne = jest.fn().mockResolvedValue(userMock);
            const user = await AuthenticationsDAO.signUp(userMock);

            expect(AuthenticationModel.findOne).toHaveBeenCalled();
            expect(user).toEqual(null);
        });
    });
});
