import validationMiddleware from '../middlewares/validationMiddleware.js';
import Joi from 'joi';

const validationEmployeeCreate = (req, res, next) =>  {
  validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      name: Joi.string().min(3).required(),
      phone: Joi.number().min(1000000).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      username: Joi.string().min(3).required(),
      role_id: Joi.number().integer().required(),
    }),
  );
}

const validationEmployeeUpdate = (req, res, next) =>  {
  validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      name: Joi.string().min(3).allow(),
      phone: Joi.number().min(1000000).required(),
      email: Joi.string().email().allow(),
      password: Joi.string().min(8).allow(),
      username: Joi.string().min(3).allow(),
      blocked: Joi.boolean().allow(),
      role_id: Joi.number().integer().allow(),
    }),
  );
}

export { validationEmployeeCreate, validationEmployeeUpdate };