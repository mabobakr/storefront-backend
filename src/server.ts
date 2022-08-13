import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import errorMiddleware from './error';
import productsRoutes from './handlers/product_handler';
import userRoutes from './handlers/user_handler';

dotenv.config();

const app: express.Application = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
});

app.listen(process.env.PORT, function () {
    console.log(`starting app on: port ${process.env.PORT}`);
});

productsRoutes(app);
userRoutes(app);

app.use(errorMiddleware);
export default app;
