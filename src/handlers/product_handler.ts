import { ProductTable } from '../models/products';
import { Request, Response, Application, NextFunction } from 'express';
import { checkSchema, validationResult, matchedData } from 'express-validator';
import { createSchema, showSchema } from '../validators/product_schema';
import createError from 'http-errors';

async function productsHandler(app: Application) {
    app.get('/products', indexMiddleware);
    app.get('/products/:id', checkSchema(showSchema), showMiddleware);
    app.post('/products', checkSchema(createSchema), createMiddleware); // todo add authentication
}

const indexMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const table = new ProductTable();
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
        const table = new ProductTable();
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
        const table = new ProductTable();
        const { name, price, category } = bodyData;
        const result = await table.create(
            name as string,
            parseInt(price as string),
            category as string
        );
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return next(createError(500, "Couldn't create the product"));
    }
};

export default productsHandler;
