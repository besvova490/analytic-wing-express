import { Response, NextFunction, Request } from 'express';
import JWT from 'jsonwebtoken';

// types
import { UserProfileBase } from '../types/UserProfile.type';

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.headers.authorization;
  const token = authToken && authToken.split(' ')[1];

  if (!token) {
    res.status(401).json({ detail: 'No access token has been provided' });
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
