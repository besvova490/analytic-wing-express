/* eslint-disable no-console */
import { Response, Request } from 'express';

function errorHandler(err: unknown, _: Request, res: Response) {
  console.error(err);

  res.status(500).send('Internet server error');
}

export default errorHandler;
