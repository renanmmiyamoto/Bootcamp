import { Router } from 'express';
import { container } from 'tsyringe';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
	const { name, email, password } = req.body;

	const createUser = container.resolve(CreateUserService);

	const user = await createUser.execute({ name, email, password });

	const userWithoutPassword = {
		id: user.id,
		name: user.name,
		email: user.email,
		created_at: user.created_at,
		updated_at: user.updated_at,
	};

	return res.json(userWithoutPassword);
});

usersRouter.patch(
	'/avatar',
	ensureAuthenticated,
	upload.single('avatar'),
	async (req, res) => {
		const { filename } = req.file;
		const { id } = req.user;

		const updateUserAvatar = container.resolve(UpdateUserAvatarService);

		const user = await updateUserAvatar.execute({
			user_id: id,
			filename,
		});

		const userWithoutPassword = {
			id: user.id,
			name: user.name,
			email: user.email,
			avatar: user.avatar,
			created_at: user.created_at,
			updated_at: user.updated_at,
		};

		return res.json(userWithoutPassword);
	},
);

export default usersRouter;
