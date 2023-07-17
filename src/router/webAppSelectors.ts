import { Router } from 'express';

// controllers
import webAppSelectorsController from '../controllers/webAppSelectorsController';

// middleware
import authMiddleware from '../middleware/authMiddleware';

const webAppSelectorRouter = Router();

webAppSelectorRouter.get('/', authMiddleware, webAppSelectorsController.get);
webAppSelectorRouter.get('/open', webAppSelectorsController.get);
webAppSelectorRouter.post('/:webAppId?', authMiddleware, webAppSelectorsController.create);
webAppSelectorRouter.delete('/:id', authMiddleware, webAppSelectorsController.create);

export default webAppSelectorRouter;
