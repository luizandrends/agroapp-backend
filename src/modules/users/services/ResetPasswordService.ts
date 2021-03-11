import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IUsersInterface from '../interfaces/IUsersInterface';
import IUserTokensInterface from '../interfaces/IUserTokensInterface';
import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider';
import IBlacklistTokensInterface from '../interfaces/IBlacklistTokensInterface';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersInterface,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensInterface,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('BlacklistTokensRepository')
    private blacklistTokensRepository: IBlacklistTokensInterface
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const checkToken = await this.blacklistTokensRepository.findByToken(token);

    if (checkToken) {
      throw new AppError('Invalid token', 401);
    }

    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.blacklistTokensRepository.create({ token });

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
