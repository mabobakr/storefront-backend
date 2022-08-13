import { Schema } from "express-validator";


export const createSchema: Schema = {
  userId: {
      in: ['body'],
      errorMessage: 'Body should contain userId',
      isInt: true,
  },
};
