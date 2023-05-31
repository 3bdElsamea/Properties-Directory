import validationMiddleware from '../middlewares/validationMiddleware.js';
import Joi from 'joi';

const employeeCreate = (req, res, next) =>  {
  validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      name: Joi.string().min(3).required(),
      phone: Joi.number().min(10).max(10).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      username: Joi.string().min(3).required(),
      role_id: Joi.number().integer().required(),
    }),
  );
}

const employeeUpdate = (req, res, next) =>  {
  validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      name: Joi.string().min(3).allow(),
      phone: Joi.number().min(7).allow(),
      email: Joi.string().email().allow(),
      password: Joi.string().min(8).allow(),
      username: Joi.string().min(3).allow(),
      blocked: Joi.boolean().allow(),
      role_id: Joi.number().integer().allow(),
    }),
  );
}

export { employeeCreate, employeeUpdate };