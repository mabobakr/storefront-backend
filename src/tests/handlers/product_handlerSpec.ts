import request from 'supertest';
import express from 'express';
import productsRoutes from '../../handlers/product_handler';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { ProductTable } from '../../models/product';

const app = express();
app.use(bodyParser.json());

productsRoutes(app);

const token = jwt.sign(
    { data: 'data' },
    process.env.TOKEN_SECRET as unknown as string
);

describe('Product routes', () => {
    afterAll(async () => {
        const table = new ProductTable();
        await table.delete();
    });
    describe('POST /products', () => {
        it('Should return 401 if token is not provided', async () => {
            const res = await request(app).post('/products');
            expect(res.statusCode).toBe(401);
        });

        it('Should return 400 if token is provided but not the body', async () => {
            const res = await request(app)
                .post('/products')
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toBe(400);
        });

        it('Should create a product if valid request and return 200', async () => {
            const res = await request(app)
                .post('/products')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'product name',
                    price: 3,
                    category: 'categ',
                });
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual({
                id: 1,
                name: 'product name',
                price: 3,
                category: 'categ',
            });
        });
    });

    describe('GET /products', () => {
        it('Should return 200 if valid', async () => {
            const res = await request(app).get('/products');
            expect(res.statusCode).toBe(200);
        });
    });

    describe('GET /products/:id', () => {
        it("Should return 404 if product doesn't exist", async () => {
            const res = await request(app).get('/products/4');
            expect(res.statusCode).toBe(404);
        });

        it('Should return 200 if product exists', async () => {
            const res = await request(app).get('/products/1');
            expect(res.statusCode).toBe(200);
        });
    });
});
