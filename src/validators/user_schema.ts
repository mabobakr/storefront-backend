import { Schema } from 'express-validator';

export const createSchema: Schema = {
    firstName: {
        in: 'body',
        errorMessage:
            'Body should containt firstName that is at least 3 characters long',
        isLength: {
            options: { min: 3, max: 256 },
        },
    },
    lastName: {
        in: 'body',
        errorMessage:
            'Body should containt lastName that is at least 3 characters long',
        isLength: {
            options: { min: 3, max: 256 },
        },
    },
    password: {
        in: 'body',
        errorMessage:
            'Body should containt password that is at least 8 characters long',
        isLength: {
            options: { min: 8, max: 256 },
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
