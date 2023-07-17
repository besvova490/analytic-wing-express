import { Request, Response, NextFunction } from 'express';

// models
import { WebAppSelector } from '../models/WebAppSelectors';
import { WebApp } from '../models/WebApp';

export default {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { selector } = req.body;
      const webAppUrl = req.webApp?.url as string;

      const webApp = await WebApp.findOne({ where: { url: webAppUrl } });

      if (!webApp) {
        return res.status(404).json({ detail: 'WebApp not found' });
      }

      const newSelector = await WebAppSelector.create({
        selector,
        webApp,
      }).save();

      res.status(201).json(newSelector);
    } catch (error: any) {
      next(new Error(error.message));
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const url = req.headers.origin;
      const webAppUrl = req.webApp?.url as string;

      const webApp = await WebApp.findOne({ where: { url: webAppUrl || url }, relations: ['selectors'] });

      if (!webApp) {
        return res.status(404).json({ details: 'Selector not found' });
      }

      res.status(200).json(webApp.selectors);
    } catch (e: any) {
      next(new Error(e.message));
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const webAppUrl = req.webApp?.url as string;
      const webApp = await WebApp.findOne({ where: { url: webAppUrl } });

      if (!webApp) {
        return res.status(404).json({ details: 'Selector not found' });
      }

      await WebAppSelector.delete(id);

      res.status(204).json();
    } catch (e: any) {
      next(new Error(e.message));
    }
  },
};
