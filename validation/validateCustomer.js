import Ajv from 'ajv';
import addFormats from 'ajv-formats';
const ajv = new Ajv();

export default (req, res, next) => {
  addFormats(ajv);

  const valid = ajv.validate(
    {
      type: 'object',
      properties: {
        name: { type: 'string', minLength: 10 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 },
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

  if (!valid) console.log(ajv.errors);
  next();
};
