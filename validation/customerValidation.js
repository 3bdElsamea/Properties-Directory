import Ajv from 'ajv';
const ajv = new Ajv();

const customerSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 1 },
    image: { type: 'string' },
    username: { type: 'string', minLength: 1 },
    password_token: { type: 'string' },
    password_token_expires_at: { type: 'string', format: 'date-time' },
    created_at: { type: 'string', format: 'date-time' },
    updated_at: { type: 'string', format: 'date-time' },
  },
  required: ['name', 'email', 'password', 'username'],
};

const validateCustomer = ajv.compile(customerSchema);

module.exports = validateCustomer;
