import { DocumentType } from '@typegoose/typegoose';
import { User } from '../model/authentication.model';
import { LoggedUserDTO, RegisterDTO, UserDTO } from '../../shared/models/authentication.dto';
import { Types } from 'mongoose';
import { LoggedUser } from '../model/loged-user.model';

export class AuthenticationMapper {
	public static mapToDTO(dao: DocumentType<User>): UserDTO {
		return {
			id: dao._id.toString(),
			password: dao.password,
			email: dao.email,
			name: dao.name,
			isAdmin: dao.isAdmin,
			restaurantId: dao.restaurantId
		};
	}

	public static mapExpiredIds(loggedList: DocumentType<LoggedUser>[], date: Date): Types.ObjectId[] {
		return loggedList
			.filter((user) => date.getFullYear() !== user.date.getFullYear() || date.getMonth() + 1 !== user.date.getMonth() + 1 || date.getDate() !== user.date.getDate())
			.map((expired) => expired._id);
	}

	public static mapToDAO(dto: RegisterDTO): DocumentType<User> {
		return {
			_id: new Types.ObjectId(),
			password: dto.password,
			email: dto.email,
			name: dto.name,
			isAdmin: dto.isAdmin,
			restaurantId: dto.restaurantId
		} as DocumentType<User>;
	}

	public static mapLoggedUserDTO(user: DocumentType<LoggedUser>): LoggedUserDTO {
		return {
			id: user._id.toString(),
			date: user.date
		};
	}
}
