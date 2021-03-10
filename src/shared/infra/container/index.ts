import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersInterface from '@modules/users/interfaces/IUsersInterface';
import UsersRepository from '@modules/users/infra/database/repositories/UsersRepository';

container.registerSingleton<IUsersInterface>(
  'UsersRepository',
  UsersRepository
);
