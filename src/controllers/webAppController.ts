import { Request, Response, NextFunction } from 'express';

// models
import { UserProfile } from '../models/UserProfile';
import { WebApp } from '../models/WebApp';

// helpers
import jwtTokensHelpers from '../helpers/jwtTokensHelpers';

export default {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        url,
        info,
        preview,
        title,
        metaTitle,
      } = req.body;
      const { id, email } = req.user as UserProfile;

      const checkIfExist = await WebApp.findOne({ where: { url } });

      if (checkIfExist) {
        return res.status(400).json({ detail: 'WebApp already exists' });
      }

      const client = await UserProfile.findOne({ where: { id } });

      const newWebApp = await WebApp.create({
        url,
        info,
        title,
        preview,
        metaTitle,
        accessToken: jwtTokensHelpers.generateWebAppToken({ url, email }),
        userProfile: client as UserProfile,
      }).save();

      res.status(201).json(newWebApp);
    } catch (error: any) {
      next(new Error(error.message));
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const webApp = await WebApp.findOne({ where: { id: +id } });

      if (!webApp) {
        return res.status(404).json({ details: 'WebApp not found' });
      }

      res.status(200).json(webApp);
    } catch (e: any) {
      next(new Error(e.message));
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { email } = req.user as UserProfile;
      const { url, info, title } = req.body;
      const webApp = await WebApp.findOne({ where: { id: +id, userProfile: { email } } });

      if (!webApp) {
        return res.status(404).json({ details: 'WebApp not found' });
      }

      await WebApp.update(webApp.id, { url, info, title });

      res.status(200).json(await WebApp.findOne({ where: { id: +id } }));
    } catch (e: any) {
      next(new Error(e.message));
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { email } = req.user as UserProfile;
      const webApp = await WebApp.findOne({ where: { id: +id, userProfile: { email } } });

      if (!webApp) {
        return res.status(404).json({ details: 'WebApp not found' });
      }

      await WebApp.delete(webApp.id);
      res.sendStatus(204);
    } catch (e: any) {
      next(new Error(e.message));
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.user as UserProfile;
      const webApps = await WebApp.find({ where: { userProfile: { email } } });

      res.status(200).json(webApps);
    } catch (e: any) {
      next(new Error(e.message));
    }
  },

  getAllShort: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.user as UserProfile;
      const webApps = await WebApp.find({ select: ['id', 'title'], where: { userProfile: { email } } });

      res.status(200).json(webApps);
    } catch (e: any) {
      next(new Error(e.message));
    }
  },

  getFeedbacks: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const webApp = await WebApp.findOne({ where: { id: +id }, relations: ['feedbacks'] });

      if (!webApp) {
        return res.status(404).json({ details: 'WebApp not found' });
      }

      res.status(200).json(webApp.feedbacks);
    } catch (e: any) {
      next(new Error(e.message));
    }
  },
};
