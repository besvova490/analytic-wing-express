import { Request, Response, NextFunction } from 'express';

// models
import { WepAppFeedback } from '../models/WepAppFeedback';
import { WebApp } from '../models/WebApp';

// services
// import dbConnection from '../services/dbConnection';

export default {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        email,
        userId,
        feedback,
      } = req.body;

      const url = req.headers.origin;

      const webApp = await WebApp.findOne({ where: { url } });

      if (!webApp) {
        return res.status(404).json({ detail: 'WebApp not found' });
      }

      const newFeedback = await WepAppFeedback.create({
        email,
        webApp,
        userId,
        feedback,
      }).save();

      res.status(201).json(newFeedback);
    } catch (error: any) {
      next(new Error(error.message));
    }
  },
};
