import { Schema } from 'express-validator';

export const createSchema: Schema = {
    name: {
        in: ['body'],
        errorMessage:
            'Body should contain name that is at least 3 characters long',
        isLength: {
            options: {
                min: 3,
                max: 256,
            },
        },
    },
    price: {
        in: ['body'],
        errorMessage: 'Body should price, it must be a number',
        isFloat: true,
    },
    category: {
        in: 'body',
        errorMessage:
            'Body should containt category that is at least 3 characters long',
        isLength: {
            options: {
                min: 3,
                max: 40,
            },
        },
    },
};

export const showSchema: Schema = {
    id: {
        in: 'params',
        errorMessage: 'Invalid id',
        isInt: true,
    },
};
