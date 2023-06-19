import Joi from 'joi';
import validationMiddleware from '../middlewares/validationMiddleware.js';

const validateCustomerUpdate = (req, res, next) => {
  validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      name: Joi.string().min(3).allow(),
      phone: Joi.number().min(1000000).allow(),
      username: Joi.string().allow(),
    }),
  );
};

export { validateCustomerUpdate };
