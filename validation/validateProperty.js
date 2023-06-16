import Joi from 'joi';
import validationMiddleware from '../middlewares/validationMiddleware.js';

const validatePropertyCreate = (req, res, next) => {
  validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      title: Joi.string().min(3).required(),
      description: Joi.string().min(3).required(),
      price: Joi.number().min(1).required(),
      area: Joi.number().min(1).required(),
      slug: Joi.string().min(3).allow(),
      bathrooms: Joi.number().min(1).required(),
      bedrooms: Joi.number().min(1).required(),
      garage: Joi.number().min(0).required(),
      floors: Joi.number().min(0).required(),
      year_built: Joi.number().min(1600).required(),
      address: Joi.string().min(3).required(),
      status: Joi.string().valid('active', 'inactive').required(),
      category_id: Joi.number().min(1).required(),
      city_id: Joi.number().min(1).required(),
      owner_id: Joi.number().min(1).required(),
      employee_id: Joi.number().min(1).required(),
    })
  );
};

const validatePropertyUpdate = (req, res, next) => {
  validationMiddleware(req, res, next, Joi.object({
    title: Joi.string().min(3).allow(),
    description: Joi.string().min(3).allow(),
    price: Joi.number().min(1).allow(),
    area: Joi.number().min(1).allow(),
    slug: Joi.string().min(3).allow(),
    bathrooms: Joi.number().min(1).allow(),
    bedrooms: Joi.number().min(1).allow(),
    garage: Joi.number().min(0).allow(),
    floors: Joi.number().min(0).allow(),
    year_built: Joi.number().min(1600).allow(),
    address: Joi.string().min(3).allow(),
    status: Joi.string().valid('active', 'inactive').allow(),
    category_id: Joi.number().min(1).allow(),
    city_id: Joi.number().min(1).allow(),
    owner_id: Joi.number().min(1).allow(),
    employee_id: Joi.number().min(1).allow(),
  }));
};

export { validatePropertyCreate, validatePropertyUpdate };
