import { NextFunction, Response, Request } from 'express';
import { HttpError } from 'http-errors';

export default async function errorMiddleware(
    err: HttpError,
    req: Request,
    res: Response,
    _next: NextFunction
): Promise<void> {
    res.status(err.status).json({ message: err.message });
}
