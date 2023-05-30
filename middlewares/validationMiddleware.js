import joi from 'joi';
import validationError from '../utils/validationError.js';

export default (req, res, next, schema) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const validationErrors = error.details.map((err) => err.message);
    next(new validationError(validationErrors));
  }

  next();
};
