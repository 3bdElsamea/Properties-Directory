import Joi from 'joi';
import validationMiddleware from '../middlewares/validationMiddleware.js';

export const validationCreateContactUs = (req, res, next) => {
  validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      phone: Joi.number().required(),
      message: Joi.string().required(),
    }),
  );
};
