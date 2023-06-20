import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import router from './routes.js';
import refresh from './github_refresh/refresh.js';
// import morgan from 'morgan';

const app = express();
app.use(cors());
config();

app.use('/', router);
app.use('/refresh', refresh);

// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}...`);
});

export default app;
