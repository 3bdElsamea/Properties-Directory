import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import validationError from '../utils/validationError.js';
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export default (req, res, next) => {

  const valid = ajv.validate(
    {
      type: 'object',
      properties: {
        name: { type: 'string', minLength: 10 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 60 },
        image: { type: 'string' },
        username: { type: 'string', minLength: 1 },
        password_token: { type: 'string' },
        password_token_expires_at: { type: 'string', format: 'date-time' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
      required: ['name', 'email', 'password', 'username'],
    },
    req.body,
  );

  const errors = {};
  ajv.errors.forEach((error) => {
    errors[error.instancePath.replace('/','')] = error.message;
  });

  if (!valid) next(new validationError(errors));

  next();
};
