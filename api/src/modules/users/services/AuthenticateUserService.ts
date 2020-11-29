import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	token: string;
	user: User;
}

@injectable()
class AuthenticateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	public async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) throw new AppError('Incorrect email/password combination.', 401);

		const passwordMatched = await compare(password, user.password);

		if (!passwordMatched)
			throw new AppError('Incorrect email/password combination.', 401);

		const { key, expiresIn } = authConfig;

		const token = sign({}, key, {
			subject: user.id,
			expiresIn,
		});

		return { user, token };
	}
}

export default AuthenticateUserService;
