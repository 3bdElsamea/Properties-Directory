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

export const validationUpdateContactUs = (req, res, next) => {
  validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      name: Joi.string().min(3).allow(),
      email: Joi.string().email().allow(),
      phone: Joi.number().allow(),
      message: Joi.string().allow(),
    }),
  );
};

export const validationUpdateContactUsStatus = (req, res, next) => {
  validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      status: Joi.string().valid('pending', 'active', 'rejected').allow(),
    }),
  );
};
