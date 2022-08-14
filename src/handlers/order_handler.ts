import { Application, Request, Response, NextFunction } from 'express';
import { OrderTable } from '../models/order';
import { UserTable } from '../models/user';
import { OrderProductTable } from '../models/order_product';
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
        const user_id = bodyData.user_id;

        // Check if user exists
        const userTable = new UserTable();
        const user = await userTable.show(parseInt(user_id));
        if (user == undefined) {
            return res.status(404).json({ error: 'User is not found' });
        }

        const result = await table.create(user_id);
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