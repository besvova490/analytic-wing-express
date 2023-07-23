import JWT from 'jsonwebtoken';

// types
import { UserProfileBase } from './types/UserProfile.type';
import WepApp from './types/WebApp.type';

declare global {
  const io: any;
  namespace Express {
    export interface Request {
      user: UserProfileBase | JWT.JwtPayload | undefined;
      webApp: WepApp | JWT.JwtPayload | undefined;
    }
  }
}
