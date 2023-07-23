import { Router } from 'express';
import axios from 'axios';

const webHooksRouter = Router();

webHooksRouter.use('/health', (_, res) => res.status(200).json({ message: 'OK' }));
webHooksRouter.use('/sns-webhook', async (req, res) => {
  let SubscribeURL = '';

  try {
    SubscribeURL = typeof req.body === 'string' ? JSON.parse(req.body).SubscribeURL : '';
  } catch {
    SubscribeURL = '';
  }

  if (SubscribeURL) {
    try {
      await axios.get(SubscribeURL);

      return res.end('ok');
    } catch {
      return res.status(500).json({ message: 'Error while subscribing to SNS topic' });
    }
  }

  (global as any).io.emit('NEW_EXTENSION_VERSION');
  res.status(200).json({ message: 'OK' });
});

export default webHooksRouter;
