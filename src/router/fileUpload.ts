import { Router } from 'express';
import multer from 'multer';

// controllers
import fileUploadController from '../controllers/fileUploadController';

const upload = multer({ storage: multer.memoryStorage() });
const fileUploadRouter = Router();

fileUploadRouter.post('/', upload.single('file'), fileUploadController.create);

export default fileUploadRouter;
