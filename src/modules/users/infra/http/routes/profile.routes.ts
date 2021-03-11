import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.get('/show', ensureAuthenticated, profileController.show);
profileRouter.put(
  '/update',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      old_password: Joi.string().min(6),
      password: Joi.string().min(6),
      confirm_password: Joi.string().min(6),
    },
  }),
  ensureAuthenticated,
  profileController.update
);

export default profileRouter;
