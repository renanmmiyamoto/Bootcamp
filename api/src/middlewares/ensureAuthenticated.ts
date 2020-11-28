import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';
import AppError from '../erros/AppError';

interface TokenPayload {
	iat: number;
	exp: number;
	sub: string;
}

export default function ensureAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) throw new AppError('JWT Token is missing.', 401);

		const [, token] = authHeader.split(' ');

		const teste = verify(token, authConfig.key) as TokenPayload;

		if (!teste) throw new AppError('Invalid JWT token.', 401);

		req.user = {
			id: teste.sub,
		};

		return next();
	} catch (err) {
		throw new AppError('Invalid JWT token.', 401);
	}
}
