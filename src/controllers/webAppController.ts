import { Request, Response, NextFunction } from 'express';

// models
import { UserProfile } from '../models/UserProfile';
import { WebApp } from '../models/WebApp';

export default {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { domain, info } = req.body;
      const { id } = req.user as UserProfile;

      const checkIfExist = await WebApp.findOne({ where: { domain } });

      if (checkIfExist) {
        return res.status(400).json({ detail: 'WebApp already exists' });
      }

      const client = await UserProfile.findOne({ where: { id } });

      const newWebApp = await WebApp.create({
        domain,
        info,
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
      const { domain, info } = req.body;
      const webApp = await WebApp.findOne({ where: { id: +id, userProfile: { email } } });

      if (!webApp) {
        return res.status(404).json({ details: 'WebApp not found' });
      }

      await WebApp.update(webApp.id, { domain, info });

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
      const webApps = await WebApp.find();

      res.status(200).json(webApps);
    } catch (e: any) {
      next(new Error(e.message));
    }
  },
};
