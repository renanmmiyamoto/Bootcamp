// import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
	it('should be able to recover the password using email', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeMailProvider = new FakeMailProvider();

		const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
			fakeUsersRepository,
			fakeMailProvider,
		);

		const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

		await fakeUsersRepository.create({
			name: 'John Dow',
			email: 'john@gmail.com',
			password: '123456',
		});

		await sendForgotPasswordEmailService.execute({
			email: 'john@gmail.com',
		});

		expect(sendMail).toHaveBeenCalled();
	});

	it('should not be able to recover a non-existing user password', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeMailProvider = new FakeMailProvider();

		const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
			fakeUsersRepository,
			fakeMailProvider,
		);

		await expect(
			sendForgotPasswordEmailService.execute({
				email: 'john@gmail.com',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
