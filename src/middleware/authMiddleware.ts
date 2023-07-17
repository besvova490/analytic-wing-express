import { Response, NextFunction, Request } from 'express';
import JWT from 'jsonwebtoken';

// types
import { UserProfileBase } from '../types/UserProfile.type';
import WepApp from '../types/WebApp.type';

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.headers.authorization;
  const webAppToken = req.headers['web-app-token'];
  const token = authToken && authToken.split(' ')[1];

  if (!token && !webAppToken) {
    res.status(401).json({ detail: 'No access token has been provided' });
  }

  if (webAppToken) {
    JWT.verify(
      webAppToken as string,
      process.env.EXPRESS_APP_JWT_ACCESS_SECRET as string,
      (error, webApp) => {
        if (error) {
          return res.status(401).json({ detail: error });
        }

        req.webApp = webApp as WepApp;
        next();
      },
    );

    return;
  }

  JWT.verify(
    token as string,
    process.env.EXPRESS_APP_JWT_ACCESS_SECRET as string,
    (error, user) => {
      if (error) {
        return res.status(401).json({ detail: error });
      }

      req.user = user as UserProfileBase;
      next();
    },
  );
}
