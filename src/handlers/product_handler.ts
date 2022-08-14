import { ProductTable } from '../models/product';
import { Request, Response, Application, NextFunction } from 'express';
import { checkSchema, validationResult, matchedData } from 'express-validator';
import { createSchema, showSchema } from '../validators/product_schema';
import createError from 'http-errors';
import { verifyAuth } from '../middlewares/auth';

export default function productsRoutes(app: Application) {
    app.get('/products', indexMiddleware);
    app.get('/products/:id', checkSchema(showSchema), showMiddleware);
    app.post(
        '/products',
        verifyAuth,
        checkSchema(createSchema),
        createMiddleware
    );
}

const table = new ProductTable();

const indexMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await table.index();
        res.status(200).json({ products: result });
    } catch (err) {
        console.log(err);
        return next(createError(500, "couldn't get the products"));
    }
};

const showMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let result;
    try {
        const id = parseInt(req.params.id);
        result = await table.show(id);
    } catch (err) {
        console.log(err);
        return next(createError(500, "couldn't get the product"));
    }

    if (result === undefined) {
        return next(createError(404, 'product is not found'));
    }

    res.status(200).json(result);
};

const createMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const bodyData = matchedData(req, { locations: ['body'] });

    try {
        const prod = {
            name: bodyData.name,
            price: bodyData.price,
            category: bodyData.category,
        };

        const result = await table.create(prod);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return next(createError(500, "Couldn't create the product"));
    }
};
