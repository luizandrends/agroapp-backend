import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CreateAddressController from '../controllers/CreateAddressController';
import UpdateAddressController from '../controllers/UpdateAddressController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const createAddressController = new CreateAddressController();
const updateAddressController = new UpdateAddressController();

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

addressRouter.post(
  '/update',
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
  updateAddressController.update
);

export default addressRouter;
