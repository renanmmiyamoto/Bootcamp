import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

class UserAvatarController {
	public async update(req: Request, res: Response): Promise<Response> {
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
	}
}

export default UserAvatarController;
