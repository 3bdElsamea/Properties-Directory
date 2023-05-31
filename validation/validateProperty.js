import Joi from 'joi';
import validationMiddleware from '../middlewares/validationMiddleware.js';

const schema = Joi.object({
  title: Joi.string()
    .label('Title')
    .min(3)
    .when('$operation', {
      is: 'create',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'string.min': 'Title must be at least 3 characters long',
    }),
  description: Joi.string()
    .label('Description')
    .min(10)
    .when('$operation', {
      is: 'create',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'string.min': 'Description must be at least 10 characters long',
    }),
  price: Joi.number()
    .label('Price')
    .min(10000)
    .when('$operation', {
      is: 'create',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'number.min': 'Price must be at least 10000',
    }),
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
  area: Joi.number()
    .label('Area')
    .min(50)
    .when('$operation', {
      is: 'create',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'number.min': 'Area must be at least 50 square meters',
    }),
  bathrooms: Joi.number()
    .label('Bathrooms')
    .min(1)
    .when('$operation', {
      is: 'create',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'number.min': 'Bathrooms must be at least 1',
    }),
  bedrooms: Joi.number()
    .label('Bedrooms')
    .min(1)
    .when('$operation', {
      is: 'create',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'number.min': 'Bedrooms must be at least 1',
    }),
  garage: Joi.number().label('Garage').when('$operation', {
    is: 'create',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  floors: Joi.number()
    .label('Floors')
    .min(1)
    .when('$operation', {
      is: 'create',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'number.min': 'Floors must be at least 1',
    }),
  year_built: Joi.number()
    .label('Year Built')
    .min(1980)
    .max(new Date().getFullYear())
    .when('$operation', {
      is: 'create',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'number.min': 'Year Built must be at least 1980',
    }),
  status: Joi.string()
    .label('Status')
    .valid('active', 'inactive')
    .when('$operation', {
      is: 'create',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'any.only': 'Status must be active or inactive',
    }),
  category_id: Joi.number().label('Category Id').when('$operation', {
    is: 'create',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  city_id: Joi.number().label('City Id').when('$operation', {
    is: 'create',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  owner_id: Joi.number().label('Employee Id').when('$operation', {
    is: 'create',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  employee_id: Joi.number().label('Employee Id').when('$operation', {
    is: 'create',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
});

//Property Create Validation
const validatePropertyCreate = (req, res, next) => {
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

//Property Update Validation
const validatePropertyUpdate = (req, res, next) => {
  validationMiddleware(req, res, next, schema, 'update');
};

// export
export { validatePropertyCreate, validatePropertyUpdate };
