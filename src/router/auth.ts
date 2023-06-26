import { Router } from 'express';

// controllers
import userController from '../controllers/userController';

// middleware
import authMiddleware from '../middleware/authMiddleware';

// helpers
import jwtTokensHelpers from '../helpers/jwtTokensHelpers';

const authRouter = Router();

authRouter.get('/profile', authMiddleware, userController.get);
authRouter.patch('/profile', authMiddleware, userController.update);
authRouter.post('/register', userController.create);

authRouter.get('/users', userController.getAll);

authRouter.post('/login', userController.login);
authRouter.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ detail: 'No refresh token has been provided' });
    }

    jwtTokensHelpers.verifyToken(
      refreshToken,
      ({
        accessToken,
        refreshToken: refreshTokenNew,
      }) => res.status(200).json({ accessToken, refreshToken: refreshTokenNew }),
      (e: unknown) => res.status(401).json({ detail: e }),
    );
  } catch (e: any) {
    next(new Error(e.message));
  }
});

export default authRouter;
