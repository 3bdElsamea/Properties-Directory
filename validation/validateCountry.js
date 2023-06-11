import joi from 'joi';
import validationMiddleware from '../middlewares/validationMiddleware.js';

const validateCountryCreate = (req, res, next) => {
  validationMiddleware(
    req,
    res,
    next,
    joi.object({
      name: joi.string().min(3).max(255).required(),
    }),
  );
};

//Update
const validateCountryUpdate = (req, res, next) => {
  validationMiddleware(
    req,
    res,
    next,
    joi.object({
      name: joi.string().min(3).max(255).allow(),
      active: joi.number().valid(0, 1).allow(),
    }),
  );
};

export { validateCountryCreate, validateCountryUpdate };
