import { Application, Response, Request, NextFunction } from 'express';
import { UserTable } from '../models/users';
import createError from 'http-errors';
import { showSchema, createSchema } from '../validators/user_schema';
import { checkSchema, validationResult, matchedData } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { verifyAuth } from '../middlewares/auth';

export default function userRoutes(app: Application) {
    app.get('/users', verifyAuth, indexMiddleware);
    app.get('/users/:id', verifyAuth, checkSchema(showSchema), showMiddleware);
    app.post('/users', checkSchema(createSchema), createMiddleware);
}

const table = new UserTable();

const indexMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const result = await table.index();
        res.status(200).json({ users: result });
    } catch (err) {
        console.log(err);
        return next(createError(500, "couldn't get users"));
    }
};

const showMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    let result;
    try {
        const id = parseInt(req.params.id);
        result = await table.show(id);
    } catch (err) {
        console.log(err);
        return next(createError(500, "couldn't get user"));
    }

    if (result === undefined) {
        return next(createError(404, 'user is not found'));
    }

    res.status(200).json(result);
};

const createMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    // Return only matched properties
    const bodyData = matchedData(req, { locations: ['body'] });

    // Get salt and pepper from env
    const pepper = process.env.BCRYPT_PASSWORD;
    const saltRounds = process.env.SALT_ROUNDS;

    const hashedPassword = await bcrypt.hash(
        bodyData.password + pepper,
        parseInt(saltRounds as unknown as string)
    );

    const user = {
        firstName: bodyData.firstName,
        lastName: bodyData.lastName,
        password: hashedPassword,
    };

    try {
        const result = await table.create(user);

        const jwtSecret = process.env.TOKEN_SECRET;
        const token = jwt.sign(
            { id: result.id, firstName: result.firstName },
            jwtSecret as unknown as string
        );

        res.status(200).json({ user: result, token: token });
    } catch (err) {
        return next(createError(500, "Couldn't create user"));
    }
};
