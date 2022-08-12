import { NextFunction, Response, Request } from 'express';
import { HttpError } from 'http-errors';

const errorMiddleware = (
    err: HttpError,
    req: Request,
    res: Response,
    _next: NextFunction
): void => {
    res.status(err.status).json({ message: err.message });
};

export default errorMiddleware;
