import { DocumentType } from '@typegoose/typegoose';
import { User } from '@root/authentication/model/authentication.model';
import { Types } from 'mongoose';
import {LoggedUserDTO, LoginDTO, RegisterDTO} from '@root/shared/models/authentication.dto';
import { LoggedUser } from '@root/authentication/model/loged-user.model';
export const UserCollectionMock = {
	get user(): DocumentType<User> {
		return {
			_id: new Types.ObjectId('6407bf629bd120245fbc0b10'),
			restaurantId: '',
			email: 'test@example.com',
			password: '$2b$10$hbAxVr2GNeYJT2u6dRY4iu0s3pVH/6KGHhbLwS8CW0R1wGqf8Y49O',
			name: 'Tester',
			isAdmin: false
		} as DocumentType<User>;
	},

	get loginData(): LoginDTO {
		return {
			email: 'test@example.com',
			password: '$2b$10$hbAxVr2GNeYJT2u6dRY4iu0s3pVH/6KGHhbLwS8CW0R1wGqf8Y49O',
		} as LoginDTO;
	},

	get userList(): DocumentType<User>[] {
		return [
			{
				_id: new Types.ObjectId('6407bf629bd120245fbc0b10'),
				restaurantId: '',
				email: 'test@example.com',
				password: '$2b$10$hbAxVr2GNeYJT2u6dRY4iu0s3pVH/6KGHhbLwS8CW0R1wGqf8Y49O',
				name: 'Tester',
				isAdmin: false
			},
			{
				_id: new Types.ObjectId('6407bf629bd120245fbc0b11'),
				restaurantId: '',
				email: 'test2@example.com',
				password: '$2b$10$hbAxVr2GNeYJT2u6dRY4iu0s3pVH/6KGHhbLwS8CW0R1wGqf8Y69O',
				name: 'Tester2',
				isAdmin: true
			}
		] as DocumentType<User>[];
	},
	get registeredUser(): RegisterDTO {
		return {
			restaurantId: '',
			email: 'test@example.com',
			password: '$2b$10$hbAxVr2GNeYJT2u6dRY4iu0s3pVH/6KGHhbLwS8CW0R1wGqf8Y49O',
			name: 'Tester',
			isAdmin: false
		};
	},

	get logged(): DocumentType<LoggedUser>[] {
		return [
			{
				_id: new Types.ObjectId('6407bf629bd120245fbc0b10'),
				date: new Date('2023-03-10')
			},
			{
				_id: new Types.ObjectId('6407bf629bd120245fbc0b11'),
				date: new Date('2023-03-09')
			}
		] as DocumentType<LoggedUser>[];
	},

	get loggedDTO(): LoggedUserDTO[] {
		return [
			{
				id: new Types.ObjectId('6407bf629bd120245fbc0b10').toString(),
				date: new Date('2023-03-10')
			},
			{
				id: new Types.ObjectId('6407bf629bd120245fbc0b11').toString(),
				date: new Date('2023-03-09')
			}
		];
	}
};
