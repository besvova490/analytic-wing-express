import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';

// Boot express
dotenv.config();
const app: Application = express();

// Application routing
app.use('/', (req: Request, res: Response) => res.status(200).send({ data: 'Hello from Ornio AS!' }));

// Start server
app.listen(process.env.EXPRESS_APP_PORT, () => console.log(`Server is listening on port ${process.env.EXPRESS_APP_PORT}!`));
