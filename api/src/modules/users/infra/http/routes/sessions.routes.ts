import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
	const usersRepository = new UsersRepository();

	const { email, password } = req.body;

	const authenticateUser = new AuthenticateUserService(usersRepository);

	const { user, token } = await authenticateUser.execute({
		email,
		password,
	});

	const userWithoutPassword = {
		id: user.id,
		name: user.name,
		email: user.email,
		created_at: user.created_at,
		updated_at: user.updated_at,
	};

	return res.json({ user: userWithoutPassword, token });
});

export default sessionsRouter;
