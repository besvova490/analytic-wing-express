import { Router } from 'express';

// routes
import authRouter from './auth';

const router = Router();

router.use('/auth', authRouter);
router.use('*', (_, res) => res.status(404).json({ detail: 'Not Found' }));

export default router;
