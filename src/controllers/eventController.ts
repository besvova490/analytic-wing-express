import { Request, Response, NextFunction } from 'express';

// models
import { Event } from '../models/Event';
import { WebApp } from '../models/WebApp';

export default {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { event, data } = JSON.parse(req.body);
      const domain = req.headers.origin;

      const webApp = await WebApp.findOne({ where: { domain } });

      if (!webApp) {
        return res.status(404).json({ detail: 'WebApp not found' });
      }

      const newEvent = await Event.create({
        event,
        data,
        webApp,
      }).save();

      res.status(201).json(newEvent);
    } catch (error: any) {
      next(new Error(error.message));
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const event = await Event.findOne({ where: { id: +id } });

      if (!event) {
        return res.status(404).json({ details: 'Event not found' });
      }

      res.status(200).json(event);
    } catch (e: any) {
      next(new Error(e.message));
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const event = await Event.findOne({ where: { id: +id } });

      if (!event) {
        return res.status(404).json({ details: 'Event not found' });
      }

      await Event.delete(event.id);

      res.status(204).json({ details: 'Event deleted' });
    } catch (e: any) {
      next(new Error(e.message));
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { webAppId } = req.params;
      const webApp = await WebApp.findOne({ where: { id: +webAppId } });

      if (!webApp) {
        return res.status(404).json({ detail: 'WebApp not found' });
      }

      const events = await Event.find({ where: { webApp: { id: +webAppId } } });

      res.status(200).json(events);
    } catch (e: any) {
      next(new Error(e.message));
    }
  },
};
