import { Schema } from "express-validator";


export const createSchema: Schema = {
  user_id: {
      in: ['body'],
      errorMessage: 'Body should contain userId',
      isInt: true,
  },
};
