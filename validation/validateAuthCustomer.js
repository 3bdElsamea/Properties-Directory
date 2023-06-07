import Joi from 'joi';
import validationMiddleware from '../middlewares/validationMiddleware.js';

const customerLogin = (req, res, next) => {
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

const customerForgetPassword = async (req, res, next) => {
  await validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      email: Joi.string().email().required(),
    }),
  );
};

const customerResetPassword = (req, res, next) => {
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

const customerUpdateProfile = (req, res, next) => {
  validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      name: Joi.string().min(3).allow(),
      phone: Joi.number().min(1000000).required(),
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

const customerRegister = (req, res, next) => {
  validationMiddleware(
    req,
    res,
    next,
    Joi.object({
      name: Joi.string().min(3).required(),
      phone: Joi.number().min(1000000).required(),
      password: Joi.string().min(8).required(),
      email: Joi.string().email().required(),
      password_confirmation: Joi.any()
        .equal(Joi.ref('password'))
        .required()
        .label('Confirm password')
        .options({ messages: { 'any.only': '{{#label}} does not match' } }),
      username: Joi.string().required(),
    }),
  );
}

export {
  customerLogin,
  customerRegister,
  customerForgetPassword,
  customerResetPassword,
  customerUpdateProfile,
};
