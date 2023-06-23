import Joi from 'joi';
import validationMiddleware from '../middlewares/validationMiddleware.js';

const employeeLogin = (req, res, next) => {
  validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
  );
};

const employeeForgetPassword = async (req, res, next) => {
  await validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      email: Joi.string().email().required(),
    }),
  );
};

const employeeResetPassword = (req, res, next) => {
  validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      token: Joi.string().required(),
      password: Joi.string().min(8).required(),
      password_confirmation: Joi.any()
        .equal(Joi.ref('password'))
        .required()
        .label('Confirm password')
        .options({ messages: { 'any.only': '{{#label}} does not match' } }),
    }),
  );
};

const employeeUpdateProfile = (req, res, next) => {
  validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      name: Joi.string().min(3).allow(),
      phone: Joi.number().min(1000000).allow(),
      password: Joi.string().min(8).allow(),
      email: Joi.string().email().allow(),
      password_confirmation: Joi.any()
        .equal(Joi.ref('password'))
        .allow()
        .label('Confirm password')
        .options({ messages: { 'any.only': '{{#label}} does not match' } }),
      username: Joi.string().allow(),
    }),
  );
};

export {
  employeeLogin,
  employeeForgetPassword,
  employeeResetPassword,
  employeeUpdateProfile,
};
