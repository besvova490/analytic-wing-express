import JWT from 'jsonwebtoken';

// types
import { UserProfileBase } from './types/UserProfile.type';

declare global {
  namespace Express {
    export interface Request {
      user: UserProfileBase | JWT.JwtPayload | undefined;
    }
  }
}
