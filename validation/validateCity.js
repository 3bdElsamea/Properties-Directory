import joi from 'joi';
import validationMiddleware from '../middlewares/validationMiddleware.js';


const validateCityCreate = (req, res, next) => {
  validationMiddleware(req, res, next, joi.object({
      name: joi.string().min(3).max(255).required(),
      country_id: joi.number().required(),
    }),
  );
};

const validateCityUpdate = (req, res, next) => {
  validationMiddleware(req, res, next, joi.object({
      name: joi.string().min(3).max(255).allow(),
      country_id: joi.number().allow(),
      active: joi.number().valid(0, 1).allow(),
    }),
  );
};

export { validateCityCreate, validateCityUpdate };
