import validationMiddleware from '../middlewares/validationMiddleware.js';

const customerCreate = (req, res, next) => {
  validationMiddleware(req, res, next, {
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
  })
};

const customerUpdate = (req, res, next) => {
  validationMiddleware(req, res, next, {
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
    required: [],
  })
}

export {
  customerCreate
}
