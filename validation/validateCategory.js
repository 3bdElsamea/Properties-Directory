import Joi from 'joi';
import validationMiddleware from '../middlewares/validationMiddleware.js';

export const validationCreateCategory = (req, res, next) => {
  validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      name: Joi.string().min(3).required(),
    }),
  );
};

export const validationUpdateCategory = (req, res, next) => {
  validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      name: Joi.string().min(3).allow(),
      active: Joi.number().valid(0,1).allow(),
    }),
  );
};

