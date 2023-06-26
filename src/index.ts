/* eslint-disable no-console */
/* eslint-disable import/first */
import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import methodOverride from 'method-override';

dotenv.config();

// routers
import router from './router';

// controllers
import errorHandler from './controllers/errorHandler';

// services
import dbConnection from './services/dbConnection';
import './global';

// Boot express
const app: Application = express();

app.use(cors({ origin: '*', credentials: true, allowedHeaders: '*' }));
app.use(express.json());
app.use(express.text());
app.use(methodOverride());
app.use(router);
app.use(errorHandler);

// Start server
function afterAppStart() {
  dbConnection.initialize()
    .then(() => console.log('Data Source has been initialized!'))
    .catch((error) => console.error('Error during Data Source initialization:', error));

  console.log(`Server is listening on port ${process.env.EXPRESS_APP_PORT}!`);
}

app.listen(process.env.EXPRESS_APP_PORT, afterAppStart);
