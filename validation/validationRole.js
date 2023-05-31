import Joi from 'joi';
import validationMiddleware from '../middlewares/validationMiddleware.js';

const validationCreateRole = (req, res, next) => {
  validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      name: Joi.string().invalid('super-admin').min(3).required(),
      permissions: Joi.array().items(Joi.number().integer()).min(1).required(),
    }),
  );
};

const validationUpdateRole = (req, res, next) => {
  validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      name: Joi.string().invalid('super-admin').min(3).allow(),
      permissions: Joi.array().items(Joi.number().integer()).min(1).allow(),
    }),
  );
};

export { validationCreateRole, validationUpdateRole };
