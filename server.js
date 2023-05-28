import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import router from './routes.js';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';
import { exec } from 'child_process';

const app = express();
app.use(cors());
config();

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});


app.use(express.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10kb' }));

app.use('/', limiter);
app.use('/', router);
app.get('/excused-git-pull', (req, res) => {
  exec('git pull origin backend', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing git pull: ${error.message}`);
      return res.status(500).send('Failed to execute git pull');
    }

    console.log('Git pull successful');
    res.send('Git pull successful');
  });
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}...`);
});

export default app;
