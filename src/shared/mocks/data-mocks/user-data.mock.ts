import { DocumentType } from '@typegoose/typegoose';
import { User } from '@root/authentication/model/authentication.model';
import { Types } from 'mongoose';
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
	}
};
