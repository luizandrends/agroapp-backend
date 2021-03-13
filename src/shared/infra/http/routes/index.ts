import { Router } from 'express';

import userRouter from '@modules/users/infra/http/routes/user.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import addressRouter from '@modules/users/infra/http/routes/address.routes';

import authRouter from '@modules/users/infra/http/routes/auth.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/profile', profileRouter);
routes.use('/address', addressRouter);
routes.use('/auth', authRouter);
routes.use('/password', passwordRouter);

export default routes;
