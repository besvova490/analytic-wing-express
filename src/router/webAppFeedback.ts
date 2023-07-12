import { Router } from 'express';

// controllers
import webAppFeedbackController from '../controllers/webAppFeedbackController';

const webAppFeedbackRouter = Router();

webAppFeedbackRouter.post('/', webAppFeedbackController.create);

export default webAppFeedbackRouter;
