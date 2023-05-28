import Customer from '../../models/Customer.js';

const login = async (req, res) => {
  const jane = await Customer.create({
    name: 'Jane',
    email: 'x24web@gmail.com',
    phone: '1234567890',
    password: '123456',
    image:
      'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    username: 'x24web',
  });
};

export { login };
