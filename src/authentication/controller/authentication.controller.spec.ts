import { AuthenticationService } from '@root/authentication/service/authentication.service';
import { AuthenticationMapper } from '@root/authentication/mapper/authentication.mapper';
import { UserCollectionMock } from '@root/shared/mocks/data-mocks/user-data.mock';
import { AuthenticationController } from '@root/authentication/controller/authentication.controller';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

describe('Authentication controller', () => {
	const authenticationController = new AuthenticationController();

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe('Login', () => {
		const reqMock = {
			body: {
				email: UserCollectionMock.loginData.email,
				password: UserCollectionMock.loginData.password
			}
		} as Request;

		it('should return user and 202 status if data is correct', async () => {
			const serviceSpy = jest.spyOn(AuthenticationService, 'login').mockResolvedValue(AuthenticationMapper.mapToDTO(UserCollectionMock.user));
			const resMock = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			} as unknown as Response;
			await authenticationController.login(reqMock, resMock);

			expect(resMock.status).toHaveBeenCalledWith(StatusCodes.ACCEPTED);
			expect(serviceSpy).toHaveBeenCalled();
			expect(resMock.json).toHaveBeenCalledWith(AuthenticationMapper.mapToDTO(UserCollectionMock.user));
		});

		it('should return 400 if data is correct', async () => {
			const serviceSpy = jest.spyOn(AuthenticationService, 'login').mockRejectedValue(new Error('Password or email was wrong'));
			const resMock = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			} as unknown as Response;

			try {
				await authenticationController.login(reqMock, resMock);
				expect(serviceSpy).toHaveBeenCalled();
			} catch (error) {
				expect(resMock.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
				expect(resMock.json).toHaveBeenCalledWith({ error: error.message });
			}
		});
	});

	describe('LogOut', () => {
		const reqMock = {
			params: {
				id: UserCollectionMock.logged[0]._id.toString()
			}
		} as unknown as Request;

		it('should sent 202 status and remove element from database', async () => {
			const resMock = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			} as unknown as Response;
			const serviceSpy = jest.spyOn(AuthenticationService, 'logOut').mockResolvedValue(null);

			await authenticationController.loginOut(reqMock, resMock);

			expect(serviceSpy).toHaveBeenCalled();
			expect(resMock.status).toHaveBeenCalledWith(StatusCodes.ACCEPTED);
			expect(resMock.json).toHaveBeenCalledWith({ logOut: reqMock.params.id });
		});

		it('should return 400 if service thrown anything error', async () => {
			const serviceSpy = jest.spyOn(AuthenticationService, 'logOut').mockRejectedValue(new Error('Test Error'));

			const resMock = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			} as unknown as Response;

			try {
				await authenticationController.loginOut(reqMock, resMock);
				expect(serviceSpy).toHaveBeenCalled();
			} catch (error) {
				expect(resMock.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
				expect(resMock.json).toHaveBeenCalledWith({ error: error.message });
			}
		});
	});

	describe('getLoggedUser', () => {
		const reqMock = {
			params: {
				id: UserCollectionMock.logged[0]._id.toString()
			}
		} as unknown as Request;

		it('should sent 202 status and remove element from database', async () => {
			const resMock = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			} as unknown as Response;
			const serviceSpy = jest.spyOn(AuthenticationService, 'getLoggedUser').mockResolvedValue(UserCollectionMock.loggedDTO[0]);

			await authenticationController.getLoggedUser(reqMock, resMock);

			expect(serviceSpy).toHaveBeenCalled();
			expect(resMock.status).toHaveBeenCalledWith(StatusCodes.OK);
			expect(resMock.json).toHaveBeenCalledWith(UserCollectionMock.loggedDTO[0]);
		});

		it('should return 404 if service throw error', async () => {
			const serviceSpy = jest.spyOn(AuthenticationService, 'getLoggedUser').mockRejectedValue(new Error('Test Error'));

			const resMock = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			} as unknown as Response;

			try {
				await authenticationController.getLoggedUser(reqMock, resMock);
				expect(serviceSpy).toHaveBeenCalled();
			} catch (error) {
				expect(resMock.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
				expect(resMock.json).toHaveBeenCalledWith({ error: error.message });
			}
		});
	});

	describe('Register', () => {
		const reqMock = {
			body: UserCollectionMock.registeredUser
		} as Request;

		it('should return user and 201 status if data is correct', async () => {
			const serviceSpy = jest.spyOn(AuthenticationService, 'registration').mockResolvedValue(AuthenticationMapper.mapToDTO(UserCollectionMock.user));
			const resMock = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			} as unknown as Response;

			await authenticationController.signUp(reqMock, resMock);

			expect(resMock.status).toHaveBeenCalledWith(StatusCodes.CREATED);
			expect(serviceSpy).toHaveBeenCalled();
			expect(resMock.json).toHaveBeenCalledWith(AuthenticationMapper.mapToDTO(UserCollectionMock.user));
		});

		it('should return 500 if anything error catch', async () => {
			const serviceSpy = jest.spyOn(AuthenticationService, 'registration').mockRejectedValue(new Error('Registration was failed'));
			const resMock = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			} as unknown as Response;

			try {
				await authenticationController.signUp(reqMock, resMock);
				expect(serviceSpy).toHaveBeenCalled();
			} catch (error) {
				expect(resMock.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
				expect(resMock.json).toHaveBeenCalledWith({ error: error.message });
			}
		});
	});

	describe('AddRestaurant', () => {
		const reqMock = {
			params: {
				restaurantId: 'Test',
				id: UserCollectionMock.user._id.toString()
			}
		} as unknown as Request;

		it('should return user with restaurantId and 202 status if data is correct', async () => {
			const user = AuthenticationMapper.mapToDTO(UserCollectionMock.user);
			const serviceSpy = jest.spyOn(AuthenticationService, 'addRestaurant').mockResolvedValue({ ...user, restaurantId: 'Test' });
			const resMock = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			} as unknown as Response;

			await authenticationController.addRestaurant(reqMock, resMock);

			expect(resMock.status).toHaveBeenCalledWith(StatusCodes.ACCEPTED);
			expect(serviceSpy).toHaveBeenCalled();
			expect(resMock.json).toHaveBeenCalledWith({ ...user, restaurantId: 'Test' });
		});

		it('should return 400 if anything error catch', async () => {
			const serviceSpy = jest.spyOn(AuthenticationService, 'addRestaurant').mockRejectedValue(new Error('Invalid user data'));
			const resMock = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			} as unknown as Response;

			try {
				await authenticationController.addRestaurant(reqMock, resMock);
				expect(serviceSpy).toHaveBeenCalled();
			} catch (error) {
				expect(resMock.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
				expect(resMock.json).toHaveBeenCalledWith({ error: error.message });
			}
		});
	});
});
