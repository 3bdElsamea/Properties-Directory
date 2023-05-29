import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import validationError from '../utils/validationError.js';
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export default (req, res, next, schema) => {
  const valid = ajv.validate(
    schema,
    req.body,
  );

  const errors = {};
  ajv.errors.forEach((error) => {
    errors[error.instancePath.replace('/','')] = error.message;
  });

  if (!valid) next(new validationError(errors));

  next();
};
