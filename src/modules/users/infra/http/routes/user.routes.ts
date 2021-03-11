import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UserController from '../controllers/CreateUserController';
import DeleteUserController from '../controllers/DeleteUserController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userController = new UserController();
const deleteUserController = new DeleteUserController();

const userRouter = Router();

userRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    },
  }),
  userController.create
);

userRouter.delete('/delete', ensureAuthenticated, deleteUserController.delete);

export default userRouter;
