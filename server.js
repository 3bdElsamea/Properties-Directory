import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import router from './routes.js';
import connectDB from './config/dbConfig.js';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js' ;

config({ path: './.env' });
const app = express();
app.use(cors());

connectDB();

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});

app.use('/api', limiter);

app.use('/api', router);

app.use(express.json({limit: '10kb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '10kb'}));

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}...`);
});

