import joi from 'joi';
import validationMiddleware from '../middlewares/validationMiddleware.js';

const schema = joi.object({
  name: joi.string().min(3).when('&operation', {
    is: 'create',
    then: joi.required(),
    otherwise: joi.optional(),
  }),
});

const validateCityCreate = (req, res, next) => {
  validationMiddleware(req, res, next, schema, 'create');
};

const validateCityUpdate = (req, res, next) => {
  validationMiddleware(req, res, next, schema, 'update');
};

export { validateCityCreate, validateCityUpdate };
