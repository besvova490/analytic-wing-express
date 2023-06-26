import { Router } from 'express';

// routes
import authRouter from './auth';
import webAppRouter from './webApp';
import eventRouter from './event';

// middleware
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.use('/auth', authRouter);
router.use('/web-app', authMiddleware, webAppRouter);
router.use('/events', eventRouter);
router.use('*', (_, res) => res.status(404).json({ detail: 'Not Found' }));

export default router;
