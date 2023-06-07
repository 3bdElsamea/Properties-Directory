import Joi from 'joi';
import validationMiddleware from '../middlewares/validationMiddleware.js';

export const validationCreateImage = (req, res, next) => {
  validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      image: Joi.string().required(),
    }),
  );
};
