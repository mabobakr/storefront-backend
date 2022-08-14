import request from 'supertest';
import express from 'express';
import userRoutes from '../../handlers/user_handler';
import jwt from 'jsonwebtoken';

const app = express();

userRoutes(app);

const token = jwt.sign(
    { data: 'data' },
    process.env.TOKEN_SECRET as unknown as string
);

describe('User routes', () => {
    it('Should return 200 on Get /users with token', async () => {
        const res = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });

    it('Should return 404 on GET /users/:id with token', async () => {
        const res = await request(app)
            .get('/users/4')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(404);
    });

    it('Should return 400 on POST /users with token and without body', async () => {
        const res = await request(app)
            .post('/users')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(400);
    });

    it('Should return 401 on GET /users/:id/orders without token', async () => {
        const res = await request(app).get('/users/1/orders');
        expect(res.statusCode).toBe(401);
    });
});
