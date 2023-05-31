import joi from 'joi';
import validationMiddleware from '../middlewares/validationMiddleware.js';

const schema = joi.object({
  image: joi
    .string()
    .label('Image')
    .pattern(/.(jpg|jpeg|png|JPG|JPEG|PNG)$/)
    .when('$operation', {
      is: 'create',
      then: joi.required(),
      otherwise: joi.optional(),
    })
    .messages({
      'string.pattern.base': 'Image must be in the format jpg, jpeg, png',
    }),
  property_id: joi.number().label('Property ID').when('$operation', {
    is: 'create',
    then: joi.required(),
    otherwise: joi.optional(),
  }),
});

const validatePropertyImageCreate = (req, res, next) => {
  validationMiddleware(
    req,
    res,
    next,
    schema.messages({
      'any.required': '{{#label}} is required',
    }),
    'create',
  );
};

const validatePropertyImageUpdate = (req, res, next) => {
  validationMiddleware(req, res, next, schema, 'update');
};
