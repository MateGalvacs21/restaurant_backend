import { AuthenticationsDAO } from '@root/authentication/dao/authentications.dao';
import { UserCollectionMock } from '@root/shared/mocks/data-mocks/user-data.mock';
import { LoginDTO } from '@root/shared/models/authentication.dto';
import { AuthenticationService } from '@root/authentication/service/authentication.service';
import { AuthenticationMapper } from '@root/authentication/mapper/authentication.mapper';
import { DocumentType } from '@typegoose/typegoose';
import { LoggedUser } from '@root/authentication/model/loged-user.model';
import { User } from '@root/authentication/model/authentication.model';

describe('Authentication Service', () => {
	describe('Login', () => {
		const loginData: LoginDTO = {
			email: UserCollectionMock.user.email,
			password: UserCollectionMock.user.password
		};

		it('should login and user if date is correct', async () => {
			const loginDaoMock = jest.spyOn(AuthenticationsDAO, 'login').mockResolvedValue(UserCollectionMock.user);
			const user = await AuthenticationService.login(loginData);

			expect(loginDaoMock).toHaveBeenCalled();
			expect(user).toEqual(AuthenticationMapper.mapToDTO(UserCollectionMock.user));
			expect(loginData.email).toEqual(UserCollectionMock.user.email);
			expect(loginData.password).toEqual(UserCollectionMock.user.password);
		});

		it('should throw error if data not correct', async () => {
			const loginDaoMock = jest.spyOn(AuthenticationsDAO, 'login').mockResolvedValue(null);
			try {
				await AuthenticationService.login(loginData);
				fail();
			} catch (error) {
				expect(loginDaoMock).toHaveBeenCalled();
				expect(error.message).toEqual('Password or email was wrong');
			}
		});
	});

	describe('LogOut', () => {
		it('should delete logged user data from db', async () => {
			const logoutDaoMock = jest.spyOn(AuthenticationsDAO, 'logOut').mockImplementation();
			await AuthenticationService.logOut(UserCollectionMock.user._id.toString());
			expect(logoutDaoMock).toHaveBeenCalled();
		});
	});

	describe('getLoggedUser', () => {
		it('should return searched user if logged', async () => {
			const getDaoMock = jest.spyOn(AuthenticationsDAO, 'getLoggedUser').mockResolvedValue({
				_id: UserCollectionMock.user._id,
				date: new Date()
			} as DocumentType<LoggedUser>);
			const user = await AuthenticationService.getLoggedUser(UserCollectionMock.user._id.toString());

			expect(getDaoMock).toHaveBeenCalled();
			expect(user.id).toEqual(UserCollectionMock.user._id.toString());
		});

		it('should throw error, if this user not logged', async () => {
			const getDaoMock = jest.spyOn(AuthenticationsDAO, 'getLoggedUser').mockResolvedValue(null);
			try {
				await AuthenticationService.getLoggedUser(UserCollectionMock.user._id.toString());
				fail();
			} catch (error) {
				expect(getDaoMock).toHaveBeenCalled();
				expect(error.message).toEqual('Not found.');
			}
		});
	});

	describe('addRestaurant', () => {
		it('should return user with restaurant', async () => {
			const addRestaurantMock = jest.spyOn(AuthenticationsDAO, 'addRestaurant').mockResolvedValue({
				...UserCollectionMock.user,
				restaurantId: 'test'
			} as DocumentType<User>);
			const user = await AuthenticationService.addRestaurant(UserCollectionMock.user._id.toString(), 'test');

			expect(addRestaurantMock).toHaveBeenCalled();
			expect(user).toEqual(
				AuthenticationMapper.mapToDTO({
					...UserCollectionMock.user,
					restaurantId: 'test'
				} as DocumentType<User>)
			);
		});

		it('should throw error if not have user', async () => {
			const addRestaurantMock = jest.spyOn(AuthenticationsDAO, 'addRestaurant').mockResolvedValue(null);
			try {
				await AuthenticationService.addRestaurant(UserCollectionMock.user._id.toString(), 'test');
				fail();
			} catch (error) {
				expect(addRestaurantMock).toHaveBeenCalled();
				expect(error.message).toEqual('Invalid user data');
			}
		});
	});

	describe('register', () => {
		it('should add new user if every data is correct', async () => {
			const registerMock = jest.spyOn(AuthenticationsDAO, 'signUp').mockResolvedValue(UserCollectionMock.user);
			const user = await AuthenticationService.registration(UserCollectionMock.registeredUser);

			expect(registerMock).toHaveBeenCalled();
			expect(user).toEqual(AuthenticationMapper.mapToDTO(UserCollectionMock.user));
		});

		it('should throw error something is a problem', async () => {
			const registerMock = jest.spyOn(AuthenticationsDAO, 'signUp').mockResolvedValue(null);
			try {
				await AuthenticationService.registration(UserCollectionMock.registeredUser);
				fail();
			} catch (error) {
				expect(registerMock).toHaveBeenCalled();
				expect(error.message).toEqual('Registration was failed');
			}
		});
	});

	describe('Expired', () => {
		it('should remove users if they token expired', async () => {
			const getAllMock = jest.spyOn(AuthenticationsDAO, 'getAllLogged').mockResolvedValue(UserCollectionMock.logged);
			const expiredMock = jest.spyOn(AuthenticationsDAO, 'expired').mockImplementation();
			await AuthenticationService.expired(new Date('2023-03-10'));

			expect(getAllMock).toHaveBeenCalled();
			expect(expiredMock).toHaveBeenCalled();
			jest.resetAllMocks();
		});

		it('should not run if no have token', async () => {
			const getAllMock = jest.spyOn(AuthenticationsDAO, 'getAllLogged').mockResolvedValue([]);
			const expiredMock = jest.spyOn(AuthenticationsDAO, 'expired').mockImplementation();
			await AuthenticationService.expired(new Date('2023-03-10'));

			expect(getAllMock).toHaveBeenCalled();
			expect(expiredMock).not.toHaveBeenCalled();
		});

		it('should not run if no have expired token', async () => {
			const getAllMock = jest.spyOn(AuthenticationsDAO, 'getAllLogged').mockResolvedValue([UserCollectionMock.logged[0]]);
			const mapperSpy = jest.spyOn(AuthenticationMapper, 'mapExpiredIds').mockReturnValue([]);
			const expiredMock = jest.spyOn(AuthenticationsDAO, 'expired').mockImplementation();
			await AuthenticationService.expired(new Date('2023-03-10'));

			expect(getAllMock).toHaveBeenCalled();
			expect(mapperSpy).toHaveBeenCalled();
			expect(expiredMock).not.toHaveBeenCalled();
		});

		it('should run with default date property', async () => {
			const getAllMock = jest.spyOn(AuthenticationsDAO, 'getAllLogged').mockResolvedValue([]);
			const expiredMock = jest.spyOn(AuthenticationsDAO, 'expired').mockImplementation();
			await AuthenticationService.expired();

			expect(getAllMock).toHaveBeenCalled();
			expect(expiredMock).not.toHaveBeenCalled();
		});
	});
});
