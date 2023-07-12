import { Request, Response, NextFunction } from 'express';
import { ManagedUpload } from 'aws-sdk/clients/s3';

// services
import { s3 } from '../services/aws';

export default {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.file, s3);

      const payload = {
        Bucket: 'analytic-wing',
        Key: `screenshots/${req.file?.originalname}.${req.file?.mimetype.split('/')[1]}`,
        Body: req.file?.buffer,
      };

      s3.upload(payload, (err: Error, data: ManagedUpload.SendData) => {
        if (err) {
          return res.status(500).json({ error: err });
        }

        return res.status(201).json(data);
      });
    } catch (error: any) {
      next(new Error(error.message));
    }
  },
};
