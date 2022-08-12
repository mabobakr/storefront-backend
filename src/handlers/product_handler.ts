import { ProductTable } from '../models/products';
import { Request, Response, Application, NextFunction } from 'express';
import { checkSchema, validationResult, matchedData } from 'express-validator';
import { createSchema, showSchema } from '../validators/product_schema';


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
    const table = new ProductTable();
    const result = await table.index();
    res.status(200).json({ products: result });
};

const showMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = parseInt(req.params.id);
    const table = new ProductTable();
    const result = await table.show(id);
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

    const table = new ProductTable();
    const { name, price, category } = bodyData;
    const result = await table.create(
        name as string,
        parseInt(price as string),
        category as string
    );
    res.status(200).json(result);
};

export default productsHandler;
