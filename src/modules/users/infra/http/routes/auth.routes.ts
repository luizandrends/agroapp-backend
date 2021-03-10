import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AuthenticateUserController from '../controllers/AuthController';

const authenticateUserController = new AuthenticateUserController();

const authRouter = Router();

authRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    },
  }),
  authenticateUserController.create
);

export default authRouter;
