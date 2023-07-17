import { Router } from 'express';

// controllers
import eventController from '../controllers/eventController';

// helpers
import authMiddleware from '../middleware/authMiddleware';

const eventRouter = Router();

eventRouter.post('/', eventController.create);
eventRouter.get('/', authMiddleware, eventController.getAll);
eventRouter.get('/:webAppId', authMiddleware, eventController.getAll);
eventRouter.get('/:webAppId/:id', authMiddleware, eventController.get);
eventRouter.delete('/:webAppId/:id', authMiddleware, eventController.delete);

export default eventRouter;
