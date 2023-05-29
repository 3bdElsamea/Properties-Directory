import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import router from './routes.js';
import { exec } from 'child_process';

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
