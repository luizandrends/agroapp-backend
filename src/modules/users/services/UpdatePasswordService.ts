import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider';
import IUsersInterface from '../interfaces/IUsersInterface';

import User from '../infra/database/entities/User';

interface IRequest {
  user_id: string;
  old_password?: string;
  password?: string;
  confirm_password?: string;
}

@injectable()
class UpdatePasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersInterface,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    user_id,
    old_password,
    password,
    confirm_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (!old_password) {
      throw new AppError('You need to inform the old password', 400);
    }

    if (!password) {
      throw new AppError('You need to inform the password', 400);
    }

    if (!confirm_password) {
      throw new AppError('You need to inform the password confirmation', 400);
    }

    if (password !== confirm_password) {
      throw new AppError(
        'The old password and the confirm password must be equal',
        400
      );
    }

    const checkPassword = await this.hashProvider.compareHash(
      old_password,
      user.password
    );

    if (!checkPassword) {
      throw new AppError('Wrong password', 401);
    }

    user.password = password;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdatePasswordService;
