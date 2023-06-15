import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import router from './routes.js';
const morgan = require('morgan');

const app = express();
app.use(cors());
config();

app.use('/', router);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}...`);
});

export default app;

