import { Router } from 'express';

// routes
import authRouter from './auth';
import webAppRouter from './webApp';
import eventRouter from './event';
import webAppFeedbackRouter from './webAppFeedback';
import fileUploadRouter from './fileUpload';

// middleware
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.use('/auth', authRouter);
router.use('/web-app', authMiddleware, webAppRouter);
router.use('/web-app-feedback', webAppFeedbackRouter);
router.use('/events', eventRouter);
router.use('/file-upload', fileUploadRouter);
router.use('*', (_, res) => res.status(404).json({ detail: 'Not Found' }));

export default router;
