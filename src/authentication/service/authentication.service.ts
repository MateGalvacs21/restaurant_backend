import { LoggedUserDTO, LoginDTO, RegisterDTO, UserDTO } from '../../shared/models/authentication.dto';
import { AuthenticationsDAO } from '../dao/authentications.dao';
import { AuthenticationMapper } from '../mapper/authentication.mapper';
import { Logger } from '../../services/logger/logger.service';
import { DocumentType } from '@typegoose/typegoose';
import { LoggedUser } from '../model/loged-user.model';

export class AuthenticationService {
	public static loggerService = new Logger();
	public static async login(loginData: LoginDTO): Promise<UserDTO> {
		const user = await AuthenticationsDAO.login(loginData);
		if (!user) throw new Error('Password or email was wrong');
		this.loggerService.success('Login was successfully');
		return AuthenticationMapper.mapToDTO(user);
	}

	public static async registration(registerData: RegisterDTO): Promise<UserDTO> {
		const user = await AuthenticationsDAO.signUp(registerData);
		if (!user) throw new Error('Registration was failed');
		this.loggerService.success('Registration was successfully');
		return AuthenticationMapper.mapToDTO(user);
	}

	public static async logOut(id: string): Promise<void> {
		await AuthenticationsDAO.logOut(id);
		this.loggerService.success(`Logout was successfully id: ${id}`);
	}

	public static async expired(): Promise<void> {
		this.loggerService.warn('Logout expired user');
		const loggedUsers = await AuthenticationsDAO.getAllLogged();
		const date = new Date();
		if (loggedUsers.length === 0) return;
		loggedUsers.forEach((user) => {
			if (!user._id || !user.date) return;
			if (date.getFullYear() !== user.date.getFullYear() && date.getMonth() + 1 !== user.date.getMonth() + 1 && date.getDate() !== user.date.getDate()) {
				const userDTO = AuthenticationMapper.mapLoggedUserDTO(user as DocumentType<LoggedUser>);
				this.logOut(userDTO.id);
			}
		});
	}

	public static async getLoggedUser(id: string): Promise<LoggedUserDTO | null> {
		const user = await AuthenticationsDAO.getLoggedUser(id);
		this.loggerService.success(`Get logged user with ${id} successfully`);
		if (!user) return null;
		return AuthenticationMapper.mapLoggedUserDTO(user);
	}

	public static async addRestaurant(id: string, restaurantId: string): Promise<UserDTO> {
		const user = await AuthenticationsDAO.addRestaurant(id, restaurantId);
		if (!user) throw new Error('Invalid user data');
		return AuthenticationMapper.mapToDTO(user);
	}
}
