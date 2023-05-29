import validationMiddleware from '../middlewares/validationMiddleware.js';

const schema = {
  name: { type: 'string', minLength: 3 },
  email: { type: 'string', format: 'email' },
  password: { type: 'string', minLength: 8 },
  phone: { type: 'integer' },
  image: { type: 'string' },
  username: { type: 'string', minLength: 3 },
  password_token: { type: 'string' },
  password_token_expires_at: { type: 'string', format: 'date-time' },
  created_at: { type: 'string', format: 'date-time' },
  updated_at: { type: 'string', format: 'date-time' },
};

const customerCreate = (req, res, next) => {
  validationMiddleware(req, res, next, {
    type: 'object',
    properties: schema,
    required: ['name', 'email', 'password', 'username', "phone"],
  });
};

const customerUpdate = (req, res, next) => {
  validationMiddleware(req, res, next, {
    type: 'object',
    properties: schema,
    required: [],
  });
};

export { customerCreate, customerUpdate };
