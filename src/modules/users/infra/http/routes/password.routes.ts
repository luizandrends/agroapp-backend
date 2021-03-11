import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';
import UpdatePasswordController from '../controllers/UpdatePasswordController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();
const updatePasswordController = new UpdatePasswordController();

const passwordRouter = Router();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create
);

passwordRouter.put(
  '/update',
  celebrate({
    [Segments.BODY]: {
      old_password: Joi.string().required(),
      password: Joi.string().required().min(6),
      confirm_password: Joi.string().required().min(6),
    },
  }),
  ensureAuthenticated,
  updatePasswordController.update
);

passwordRouter.put(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create
);

export default passwordRouter;
