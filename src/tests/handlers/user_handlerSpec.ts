import request from 'supertest';
import express from 'express';
import userRoutes from '../../handlers/user_handler';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import { UserTable } from '../../models/user';

const app = express();
app.use(bodyParser.json());
userRoutes(app);

const token = jwt.sign(
    { data: 'data' },
    process.env.TOKEN_SECRET as unknown as string
);

describe('User routes', () => {
    afterAll(async () => {
        const table = new UserTable();
        await table.delete();
    });
    describe('POST /users', () => {
        it('Should return 400 on POST /users without body', async () => {
            const res = await request(app).post('/users');
            expect(res.statusCode).toBe(400);
        });

        it('Should return 200 on POST /users with token and with body', async () => {
            const res = await request(app)
                .post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    first_name: 'first_name',
                    last_name: 'last_name',
                    password: 'password123',
                });
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual({
                user: {
                    id: 1,
                    first_name: 'first_name',
                    last_name: 'last_name',
                },
                token: jwt.sign(
                    { id: 1, first_name: 'first_name' },
                    process.env.TOKEN_SECRET as unknown as string
                ),
            });
        });
    });

    describe('GET /users', () => {
        it('Should return 200 on Get /users with token', async () => {
            const res = await request(app)
                .get('/users')
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toBe(200);
        });
    });

    describe('GET /users/:id', () => {
        it('Should return 200 if user exits', async () => {
            const res = await request(app)
                .get('/users/1')
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toBe(200);
        });
        it("Should return 404 if user doesn't exit with token", async () => {
            const res = await request(app)
                .get('/users/4')
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toBe(404);
        });
    });

    describe('GET /users/:id/orders', () => {
        it('Should return 401 on GET /users/:id/orders without token', async () => {
            const res = await request(app).get('/users/1/orders');
            expect(res.statusCode).toBe(401);
        });

        it('Should return 200 if token is provided', async () => {
            const res = await request(app)
                .get('/users/1/orders')
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toBe(200);
        });
    });
});
