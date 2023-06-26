import { Router } from 'express';

// controllers
import userController from '../controllers/userController';
import webAppController from '../controllers/webAppController';

const webAppRouter = Router();

webAppRouter.get('/', userController.getMyApps);
webAppRouter.post('/', webAppController.create);
webAppRouter.get('/:id', webAppController.get);
webAppRouter.patch('/:id', webAppController.update);
webAppRouter.delete('/:id', webAppController.delete);

export default webAppRouter;
