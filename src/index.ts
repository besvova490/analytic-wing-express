/* eslint-disable no-console */
/* eslint-disable import/first */
import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import methodOverride from 'method-override';
import http from 'http';
import promBundle from 'express-prom-bundle';

dotenv.config();

// routers
import router from './router';

// controllers
import errorHandler from './controllers/errorHandler';
import onConnection from './controllers/socketControllers';

// services
import dbConnection from './services/dbConnection';
import socketServer from './services/socketServer';
import './global';

// metrics settings
const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: { project_name: 'analytic-wing-express', project_type: 'express' },
  promClient: {
    collectDefaultMetrics: {
    },
  },
});

// Boot express
const app: Application = express();

app.use(metricsMiddleware);
app.use(cors({ origin: '*', credentials: true, allowedHeaders: '*' }));
app.use(express.json());
app.use(express.text());
app.use(methodOverride());
app.use(router);
app.use(errorHandler);

// server init
const server = http.createServer(app);

// Start server
function afterAppStart() {
  dbConnection.initialize()
    .then(() => console.log('Data Source has been initialized!'))
    .catch((error) => console.error('Error during Data Source initialization:', error));

  const io = socketServer(server);
  (global as any).io = io;
  io.on('connection', (socket) => onConnection(io, socket));

  console.log(`Server is listening on port ${process.env.EXPRESS_APP_PORT}!`);
}

server.listen(process.env.EXPRESS_APP_PORT, afterAppStart);
