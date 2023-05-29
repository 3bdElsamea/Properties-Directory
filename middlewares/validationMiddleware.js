import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import validationError from '../utils/validationError.js';
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export default (req, res, next, schema) => {
  const valid = ajv.validate(schema, req.body);

  if (!valid) {
    const errors = {};

    const errorsRequired = ajv.errors
      .filter((error) => {
        if (error.keyword === 'required') {
          return error;
        }
      })
      .map((error) => {
        return error.message;
      });

    if (errorsRequired.length > 0) {
      errors.required = errorsRequired;
    }

    ajv.errors.forEach((error) => {
      const key = error.instancePath.replace('/', '');
      if (error.keyword !== 'required') {
        errors[key] = error.message;
      }
    });

    next(new validationError(errors));
  }

  next();
};
