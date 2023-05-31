import Joi from 'joi';
import validationMiddleware from '../middlewares/validationMiddleware.js';
const schema = Joi.object({
  name: Joi.string().label('Name').min(3).when('$operation', {
    is: 'create',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  email: Joi.string().label('Email').email().when('$operation', {
    is: 'create',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  phone: Joi.string()
    .label('Phone')
    .pattern(/^\+[0-9]{10,12}$/)
    .when('$operation', {
      is: 'create',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'string.pattern.base': 'Phone number must be in the format +XXXXXXXXXXX',
    }),
  password: Joi.string()
    .label('Password')
    .min(8)
    .when('$operation', {
      is: 'create',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'string.min': 'Password must be at least 8 characters long',
    }),
  //   Password Confirmation Reference to Password
  // password_confirmation: Joi.any()
  //   .equal(Joi.ref('password'))
  //   .required()
  //   .label('Confirm password')
  //   .options({ messages: { 'any.only': '{{#label}} does not match' } }),
  image: Joi.string()
    .label('Image')
    .allow('')
    .pattern(/.(jpg|jpeg|png|JPG|JPEG|PNG)$/)
    .when('$operation', {
      is: 'create',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'string.pattern.base': 'Image must be in the format jpg, jpeg, png',
    }),

  username: Joi.string().when('$operation', {
    is: 'create',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
});

const validateCustomerCreate = (req, res, next) => {
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

const validateCustomerUpdate = (req, res, next) => {
  validationMiddleware(req, res, next, schema, 'update');
};

export { validateCustomerCreate, validateCustomerUpdate };
