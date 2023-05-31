import Joi from 'joi';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import { DataTypes } from 'sequelize';

const validationOwnerCreate = (req, res, next) =>  {
  validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      name: Joi.string().min(3).required(),
      phone: Joi.number().min(7).required(),
      slug: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      status: Joi.string().valid('pending', 'active', 'rejected').required(),
      national_id: Joi.string().min(3).required(),
    }),
  );
}

const validationOwnerUpdate = (req, res, next) =>  {
  validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      name: Joi.string().min(3).allow(),
      phone: Joi.number().min(7).allow(),
      slug: Joi.string().min(3).allow(),
      email: Joi.string().email().allow(),
      status: Joi.string().valid('pending', 'active', 'rejected').allow(),
      national_id: Joi.string().min(3).allow(),
    }),
  );
}

export { validationOwnerCreate, validationOwnerUpdate };