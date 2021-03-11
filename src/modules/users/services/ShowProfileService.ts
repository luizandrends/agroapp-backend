import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersInterface from '../interfaces/IUsersInterface';

import User from '../infra/database/entities/User';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersInterface
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return user;
  }
}

export default ShowProfileService;
