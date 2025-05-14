import 'color';

import path from 'path';
import http from 'http';

import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import APM from 'elastic-apm-node';

import setupSwagger from './shared/docs';
import config from './config';
import routes from './API/routes';
import { handleAppProcessExists } from './shared/helpers/process.helpers';

const app = express();

// enable cors
app.use(cors(config.corsOptions));

app.use(morgan('tiny'));

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/')));

// mount routes index with app
app.use(routes);

// mount swagger documentations with current running app
setupSwagger(app, '/api-docs');

APM.start(config.startupConfig.apmConfig);

handleAppProcessExists();

export { app };
export const server = http.createServer({}, app);
