import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CreateAddressController from '../controllers/CreateAddressController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const createAddressController = new CreateAddressController();

const addressRouter = Router();

addressRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      state: Joi.string().required(),
      city: Joi.string().required(),
      cep: Joi.string().required(),
      neighborhood: Joi.string().required(),
      street: Joi.string().required(),
      house_number: Joi.number().required(),
    },
  }),
  ensureAuthenticated,
  createAddressController.create
);

export default addressRouter;
