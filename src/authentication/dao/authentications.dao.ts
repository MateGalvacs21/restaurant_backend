import { LoginDTO, RegisterDTO } from '../../shared/models/authentication.dto';
import { DocumentType } from '@typegoose/typegoose';
import { AuthenticationModel, User } from '../model/authentication.model';
import { compare, genSaltSync, hash } from 'bcrypt';
import { Logger } from '../../services/logger/logger.service';
import { AuthenticationMapper } from '../mapper/authentication.mapper';
import { LoggedUser, LoggedUserModel } from '../model/loged-user.model';

export class AuthenticationsDAO {
	public static loggerService = new Logger();
	public static async login(authentication: LoginDTO): Promise<DocumentType<User> | null> {
		const user = await AuthenticationModel.findOne({ email: authentication.email });
		if (!user) return null;
		if (!user.password) return null;
		const logged = await LoggedUserModel.findOne({ _id: user._id });
		if (logged) return null;
		if (user && (await compare(authentication.password, user.password))) {
			this.loggerService.info(`[LOGIN] ${user.email}...`);
			await LoggedUserModel.insertMany({ _id: user._id, date: new Date() });
			return user as DocumentType<User>;
		} else {
			return null;
		}
	}

	public static async signUp(registerData: RegisterDTO): Promise<DocumentType<User> | null> {
		const user = await AuthenticationModel.findOne({ email: registerData.email });
		if (user) return null;
		const salt = genSaltSync(10);
		const userHash: RegisterDTO = { ...registerData, password: await hash(registerData.password, salt) };
		this.loggerService.info(`[REGISTER] new user ${registerData.email}...`);
		return AuthenticationModel.create(AuthenticationMapper.mapToDAO(userHash));
	}

	public static async logOut(id: string): Promise<void> {
		await LoggedUserModel.findOneAndDelete({ _id: id });
		this.loggerService.info(`[LOGOUT] ${id}`);
	}

	public static async getAllLogged(): Promise<LoggedUser[]> {
		this.loggerService.info('[GET] all logged user...');
		return LoggedUserModel.find();
	}

	public static async getLoggedUser(id: string): Promise<DocumentType<LoggedUser> | null> {
		this.loggerService.info(`[GET] logged user id: ${id} ...`);
		return LoggedUserModel.findOne({ _id: id });
	}

	public static async addRestaurant(id: string, restaurantId: string): Promise<DocumentType<User> | null> {
		this.loggerService.info(`[PATCH] add restaurant to user id: ${id} ...`);
		return AuthenticationModel.findOneAndUpdate({ _id: id }, { $set: { restaurantId: restaurantId } }, { new: true });
	}
}
