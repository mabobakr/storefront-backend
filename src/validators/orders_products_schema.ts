import { Schema } from 'express-validator';

export const order_product_Schema: Schema = {
    productId: {
        in: ['body'],
        errorMessage: 'Body should contain productId',
        isInt: true,
    },
    orderId: {
        in: ['body'],
        errorMessage: 'Body should contain orderId',
        isInt: true,
    },
    quantity: {
        in: ['body'],
        errorMessage: 'Body should contain quantity',
        isInt: true,
    },
};
