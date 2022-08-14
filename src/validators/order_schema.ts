import { Schema } from "express-validator";


export const createSchema: Schema = {
  user_id: {
      in: ['body'],
      errorMessage: 'Body should contain user_id',
      isInt: true,
  },
};
