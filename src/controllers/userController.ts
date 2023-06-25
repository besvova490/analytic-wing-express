import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

// models
import { UserProfile } from '../models/UserProfile';

// helpers
import jwtTokensHelpers from '../helpers/jwtTokensHelpers';

const userController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        avatar,
      } = req.body;

      const isExist = await UserProfile.findOneBy({ email });

      if (isExist) {
        return res.status(400).json({ detail: 'User already exists' });
      }

      const userProfile = await UserProfile.create({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 10),
        avatar,
      }).save();

      res.status(201).json(userProfile);
    } catch (error: any) {
      next(new Error(error.message));
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.user as UserProfile;
      const user = await UserProfile.findOne({ where: { email } });

      res.status(200).json(user);
    } catch (e: any) {
      next(new Error(e.message));
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.user as UserProfile;

      const user = await UserProfile.findOne({ where: { email } });
      if (!user) return res.status(404).json({ details: 'User not found' });

      await UserProfile.update(user.id, req.body);

      res.status(200).json(await UserProfile.findOne({ where: { email } }));
    } catch (e: any) {
      next(new Error(e.message));
    }
  },

  getAll: async (req: Request, res: Response) => {
    const allUsers = await UserProfile.find();

    res.status(200).json(allUsers);
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const user = await UserProfile.findOneBy({ email });

      if (!user) return res.status(404).json({ details: 'User not found' });
      if (!bcrypt.compareSync(password, user.password)) return res.status(403).json({ password: 'Invalid password' });

      const { accessToken, refreshToken } = jwtTokensHelpers.generateTokens({ id: user.id, email });

      res.status(200).json({ accessToken, refreshToken });
    } catch (error: any) {
      next(new Error(error.message));
    }
  },
};

export default userController;
