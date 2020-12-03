import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';

import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
	it('should be able to authenticate', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();

		const createUserService = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		const authenticateUser = new AuthenticateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		const user = await createUserService.execute({
			name: 'John Doe',
			email: 'john@gmail.com',
			password: '123456',
		});

		const appointment = await authenticateUser.execute({
			email: 'john@gmail.com',
			password: '123456',
		});

		expect(appointment).toHaveProperty('token');
		expect(appointment.user).toEqual(user);
	});

	it('should not be able to authenticate with non existing user', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();

		const authenticateUser = new AuthenticateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		expect(
			authenticateUser.execute({
				email: 'john@gmail.com',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create two user at the same email', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();

		const createUserService = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		const authenticateUser = new AuthenticateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		await createUserService.execute({
			name: 'John Doe',
			email: 'john@gmail.com',
			password: '123456',
		});

		expect(
			authenticateUser.execute({
				email: 'john@gmail.com',
				password: 'wrong-password',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
