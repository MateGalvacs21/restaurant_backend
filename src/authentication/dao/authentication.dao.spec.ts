import { AuthenticationsDAO } from '@root/authentication/dao/authentications.dao';
import SpyInstance = jest.SpyInstance;
import { DocumentType } from '@typegoose/typegoose';
import { AuthenticationModel, User } from '@root/authentication/model/authentication.model';
import { UserCollectionMock } from '@root/shared/mocks/data-mocks/user-data.mock';
import { LoggedUserModel } from '@root/authentication/model/loged-user.model';
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
			LoggedUserModel.insertMany = jest.fn().mockResolvedValue({ _id: userMock._id, date: new Date() });

			const user = await AuthenticationsDAO.login({ email: userMock.email, password: userMock.password });

			expect(consoleSpy).toBeCalled();
			expect(user).toEqual(userMock);
			expect(AuthenticationModel.findOne).toHaveBeenCalledWith({ email: userMock.email });
			expect(LoggedUserModel.findOne).toHaveBeenCalledWith({ _id: user._id });
			expect(LoggedUserModel.insertMany).toHaveBeenCalled();
			expect(compareSpy).toHaveBeenCalled();
		});

		it('should be null user value if no have user in database', async () => {
			AuthenticationModel.findOne = jest.fn().mockResolvedValue(null);

			const user = await AuthenticationsDAO.login({ email: userMock.email, password: userMock.password });

			expect(user).toEqual(null);
			expect(AuthenticationModel.findOne).toHaveBeenCalledWith({ email: userMock.email });
		});

		it('should be return null if user already logged', async () => {
			AuthenticationModel.findOne = jest.fn().mockResolvedValue(userMock);
			LoggedUserModel.findOne = jest.fn().mockResolvedValue({ _id: userMock._id });

			const user = await AuthenticationsDAO.login({ email: userMock.email, password: userMock.password });

			expect(user).toEqual(null);
			expect(AuthenticationModel.findOne).toHaveBeenCalledWith({ email: userMock.email });
			expect(LoggedUserModel.findOne).toHaveBeenCalledWith({ _id: userMock._id });
		});

		it('should be return null if user data is incorrect', async () => {
			compareSpy.mockReturnValue(false);
			AuthenticationModel.findOne = jest.fn().mockResolvedValue(userMock);
			LoggedUserModel.findOne = jest.fn().mockResolvedValue(null);

			const user = await AuthenticationsDAO.login({ email: userMock.email, password: userMock.password });

			expect(compareSpy).toBeCalled();
			expect(user).toEqual(undefined);
			expect(AuthenticationModel.findOne).toHaveBeenCalledWith({ email: userMock.email });
			expect(LoggedUserModel.findOne).toHaveBeenCalled();
		});
	});
});
