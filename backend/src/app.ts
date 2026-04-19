import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import router from './routes/';
import errorHandler from './middlewares/error-handler';
import { errorLogger, requestLogger } from './middlewares/logger';

const app = express();

mongoose.connect ('mongodb://127.0.0.1:27017/weblarek');

app.use(cors());
app.use(json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errorHandler);

app.listen (3000, () => {console.log('server run at PORT 3000')});