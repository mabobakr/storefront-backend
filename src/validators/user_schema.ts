import { Schema } from 'express-validator';

export const createSchema: Schema = {
    first_name: {
        in: 'body',
        errorMessage:
            'Body should containt first_name that is at least 3 characters long',
        isLength: {
            options: { min: 3, max: 256 },
        },
    },
    last_name: {
        in: 'body',
        errorMessage:
            'Body should containt last_name that is at least 3 characters long',
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
