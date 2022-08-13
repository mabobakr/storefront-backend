import { Application, Request, Response, NextFunction } from 'express';
import { OrderTable } from '../models/orders';
import { UserTable } from '../models/users';
import { OrderProductTable } from '../models/orders_products';
import { verifyAuth } from '../middlewares/auth';
import { checkSchema, validationResult, matchedData } from 'express-validator';
import { createSchema } from '../validators/order_schema';
import { order_product_Schema } from '../validators/orders_products_schema';
import createError from 'http-errors';

export default function ordersRoutes(app: Application) {
    app.get('/orders', indexMiddleware);
    app.post(
        '/orders',
        verifyAuth,
        checkSchema(createSchema),
        createMiddleware
    );
    app.post('/orders/products', verifyAuth, checkSchema(order_product_Schema), addProduct)
}

const table = new OrderTable();

const indexMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await table.index();
        res.status(200).json({ orders: result });
    } catch (err) {
        console.log(err);
        return next(createError(500, "couldn't get the products"));
    }
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
        const userId = bodyData.userId;

        // Check if user exists
        const userTable = new UserTable();
        const user = await userTable.show(parseInt(userId));
        if (user == undefined) {
            return res.status(404).json({ error: 'User is not found' });
        }

        const result = await table.create(userId);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return next(createError(500, "Couldn't create the product"));
    }
};

const addProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    const bodyData = matchedData(req, { locations: ['body']})

    const table = new OrderProductTable()
    const result = await table.addProduct(bodyData.productId, bodyData.orderId, bodyData.quantity)
    res.status(200).json(result)

}