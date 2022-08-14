import request from 'supertest';
import express from 'express';
import orderRoutes from '../../handlers/order_handler';
import jwt from 'jsonwebtoken';

const app = express();

orderRoutes(app);

const token = jwt.sign(
    { data: 'data' },
    process.env.TOKEN_SECRET as unknown as string
);

describe('Order routes', () => {
    describe('GET /orders', () => {
        it('Should return 200 on Get /orders', async () => {
            const res = await request(app)
                .get('/orders')
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toBe(200);
        });
    });

    describe('POST /orders', () => {
        it('Should return 400 on POST /orders with token', async () => {
            const res = await request(app)
                .post('/orders')
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toBe(400);
        });
    });

    describe('POST /orders/products', () => {
        it('Should return 401 on POST /orders/products without token', async () => {
            const res = await request(app).post('/orders/products');
            expect(res.statusCode).toBe(401);
        });
    });
});
