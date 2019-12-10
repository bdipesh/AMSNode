import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes';
const router = express.Router();


var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../swagger');




const app = express();
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', router);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../public')));


app.use('/', indexRouter);
export default app;
