import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const auth = req.headers.authorization;
        const token = (auth || 'default token').split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET as unknown as string);
        next();
    } catch (err) {
        res.status(401);
    }
};
