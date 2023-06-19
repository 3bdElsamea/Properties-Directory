import validationMiddleware from '../middlewares/validationMiddleware.js';
import Joi from 'joi';

export default (req, res, next) => {
  validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      title: Joi.string().min(3).allow(),
      phone: Joi.number().min(10).allow(),
      email: Joi.string().email().allow(),
      address: Joi.string().allow(),
      description: Joi.string().allow(),
      facebook: Joi.string().allow(),
      twitter: Joi.string().allow(),
      instagram: Joi.string().allow(),
      youtube: Joi.string().allow(),
    }),
  );
};
