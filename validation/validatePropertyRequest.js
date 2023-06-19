import Joi from 'joi';
import validationMiddleware from '../middlewares/validationMiddleware.js';

export const validationCreatePropertyRequest = (req, res, next) => {
  validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      customer_id: Joi.number().required(),
      property_id: Joi.number().required(),
      status: Joi.string().valid('pending', 'active', 'rejected').required(),
    }),
  );
};

export const validationUpdatePropertyRequest = (req, res, next) => {
  validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      customer_id: Joi.number().allow(),
      property_id: Joi.number().allow(),
      status: Joi.string().valid('pending', 'active', 'rejected').allow(),
    }),
  );
};
