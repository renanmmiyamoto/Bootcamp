import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typorm/entities/User';

interface Request {
	user_id: string;
	filename: string;
}

class UpdateUserAvatarService {
	public async execute({ user_id, filename }: Request): Promise<User> {
		const usersRepository = getRepository(User);

		const user = await usersRepository.findOne(user_id);

		if (!user)
			throw new AppError('Only authenticate users can change avatar.', 401);

		if (user.avatar) {
			// delete older avatar
			const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
			const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

			if (userAvatarFileExists) {
				await fs.promises.unlink(userAvatarFilePath);
			}
		}

		user.avatar = filename;

		await usersRepository.save(user);

		return user;
	}
}

export default UpdateUserAvatarService;
