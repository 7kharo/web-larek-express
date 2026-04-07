import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

mongoose.connect ('mongodb://127.0.0.1:27017/weblarek');

app.use(cors());
app.listen (3000, () => {console.log('server run at PORT 3000')});