import request from 'supertest';
import express from 'express';
import productsRoutes from '../../handlers/product_handler';

const app = express();

productsRoutes(app);

describe('Product routes', () => {
    describe('GET /products', () => {
        it('Should return 200 on Get /products', async () => {
            const res = await request(app).get('/products');
            expect(res.statusCode).toBe(200);
        });
    });

    describe('GET /products/:id', () => {
        it('Should return 404 on GET /products/:id', async () => {
            const res = await request(app).get('/products/4');
            expect(res.statusCode).toBe(404);
        });
    });

    describe('POST /products', () => {
        it('Should return 401 on POST /products without token', async () => {
            const res = await request(app).post('/products');
            expect(res.statusCode).toBe(401);
        });
    });
});
