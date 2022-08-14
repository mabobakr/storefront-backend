import request from 'supertest';
import express from 'express';
import orderRoutes from '../../handlers/order_handler';
import jwt from 'jsonwebtoken';
import { UserTable } from '../../models/user';
import { OrderTable } from '../../models/order';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
orderRoutes(app);

const userTable = new UserTable();
const orderTable = new OrderTable();

const token = jwt.sign(
    { data: 'data' },
    process.env.TOKEN_SECRET as unknown as string
);

describe('Order routes', () => {
    afterAll(async () => {
        await orderTable.delete();
        await userTable.delete();
    });

    describe('GET /orders', () => {
        it('Should return 200 if valid', async () => {
            const res = await request(app)
                .get('/orders')
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toBe(200);
        });
    });

    describe('POST /orders', () => {
        it('Should return 200 if valid', async () => {
            // Create user for integrity constraints
            const user = await userTable.create({
                first_name: 'user name',
                last_name: 'user last name',
                password: 'pass123',
            });

            const res = await request(app)
                .post('/orders')
                .set('Authorization', `Bearer ${token}`)
                .send({ user_id: user.id });
            expect(res.statusCode).toBe(200);
        });
    });

    describe('POST /orders/products', () => {
        it('Should return 200 if valid', async () => {
            const res = await request(app)
                .post('/orders/products')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    product_id: 1,
                    order_id: 1,
                    quantity: 4,
                });
            expect(res.statusCode).toBe(200);
        });
    });
});
