import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersInterface from '../interfaces/IUsersInterface';

import User from '../infra/database/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersInterface
  ) {}

  public async execute({ user_id, name, email }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail already in use.', 400);
    }

    user.name = name;
    user.email = email;

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
