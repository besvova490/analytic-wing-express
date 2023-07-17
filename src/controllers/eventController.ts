import { Request, Response, NextFunction } from 'express';
import { startOfMonth, format } from 'date-fns';
import geoip from 'geoip-lite';

// models
import { Event } from '../models/Event';
import { WebApp } from '../models/WebApp';

// services
import dbConnection from '../services/dbConnection';

const EventRepository = dbConnection.getRepository(Event);

export default {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        event,
        data,
        userId,
        userIp,
        isMobile,
        page,
        browserInfo,
      } = JSON.parse(req.body);

      const url = req.headers.origin;
      const geoIpAddress = geoip.lookup(userIp);

      const webApp = await WebApp.findOne({ where: { url } });

      if (!webApp) {
        return res.status(404).json({ detail: 'WebApp not found' });
      }

      const newEvent = await Event.create({
        event,
        data,
        webApp,
        userId,
        isMobile,
        country: geoIpAddress?.country || 'unknown',
        page,
        browserInfo,
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
      const { monthly, weekly, yearly } = req.query;
      const webAppUrl = req.webApp?.url as string;

      const whereQuery = webAppId ? { id: +webAppId } : { url: webAppUrl };
      const webApp = await WebApp.findOne({ where: whereQuery });

      if (!webApp) {
        return res.status(404).json({ detail: 'WebApp not found' });
      }

      if (yearly) {
        const events = await EventRepository
          .createQueryBuilder('event')
          .select('date_trunc(\'month\', event.createdAt) as month')
          .where('event.event = :event', { event: 'page_view' })
          .andWhere('event.webAppId = :webAppId', { webAppId: webApp.id })
          .addSelect('COUNT(*)', 'count')
          .groupBy('month')
          .getRawMany();

        return res.status(200)
          .json(events.map((item: Event & { month: Date }) => ({ ...item, month: format(item.month, 'MMM') })));
      }

      if (monthly) {
        const groupedByDevise = await EventRepository.createQueryBuilder('event')
          .select(['event.isMobile as isMobile', 'COUNT(*) as count'])
          .where('event.createdAt BETWEEN :start AND :end', { start: startOfMonth(new Date()), end: new Date() })
          .andWhere('event.event = :event', { event: 'page_view' })
          .andWhere('event.webAppId = :webAppId', { webAppId: webApp.id })
          .groupBy('event.isMobile')
          .getRawMany();

        const groupedByEvent = await EventRepository.createQueryBuilder('event')
          .select(['event.event as event', 'COUNT(*) as count'])
          .where('event.createdAt BETWEEN :start AND :end', { start: startOfMonth(new Date()), end: new Date() })
          .andWhere('event.webAppId = :webAppId', { webAppId: webApp.id })
          .groupBy('event.event')
          .getRawMany();

        const groupedByCountries = await EventRepository.createQueryBuilder('event')
          .select(['event.country as country', 'COUNT(*) as count'])
          .where('event.createdAt BETWEEN :start AND :end', { start: startOfMonth(new Date()), end: new Date() })
          .andWhere('event.webAppId = :webAppId', { webAppId: webApp.id })
          .groupBy('event.country')
          .getRawMany();

        const eventsObject = groupedByEvent.reduce((prev, current) => {
          prev[current.event] = +current.count;

          return prev;
        }, {});

        const devicesObject = groupedByDevise.reduce((prev, current) => {
          prev[current.ismobile ? 'mobile' : 'desktop'] = +current.count;

          return prev;
        }, {});

        const countriesObject = groupedByCountries.reduce((prev, current) => {
          prev[current.country] = +current.count;

          return prev;
        }, {});

        return res.status(200).json({
          groupedByEvent: eventsObject,
          groupedByDevise: devicesObject,
          groupedByCountries: countriesObject,
        });
      }

      if (weekly) {
        const events = await EventRepository
          .createQueryBuilder('event')
          .select('date_trunc(\'week\', event.createdAt) as week')
          .where('event.event = :event', { event: 'page_view' })
          .andWhere('event.webAppId = :webAppId', { webAppId: webApp.id })
          .addSelect('COUNT(*)', 'count')
          .groupBy('week')
          .getRawMany();

        return res.status(200)
          .json(events.map((item: Event & { week: Date }) => ({ ...item, week: format(item.week, 'EEEEEE') })));
      }

      const events = await Event.find({ where: { webApp: { id: webApp.id } } });

      res.status(200).json(events);
    } catch (e: any) {
      next(new Error(e.message));
    }
  },
};
