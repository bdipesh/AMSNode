import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import userRoutes from './routes/userRoute'
// import batchRoutes from './routes/batchRoute'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger'


const app = express();
app.use('/api/v1/root', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/batch', batchRoutes);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/static', express.static('public'));
export default app;
