import joi from 'joi';
import validationMiddleware from '../middlewares/validationMiddleware.js';


const validatePageCreate = (req, res, next) => {
  validationMiddleware(req, res, next, joi.object({
      name: joi.string().min(3).max(255).required(),
      content: joi.string().min(3).required(),
    }),
  );
};

const validatePageUpdate = (req, res, next) => {
  validationMiddleware(req, res, next, joi.object({
    name: joi.string().min(3).max(255).allow(),
    content: joi.string().min(3).allow(),
    }),
  );
};

export { validatePageCreate, validatePageUpdate };
