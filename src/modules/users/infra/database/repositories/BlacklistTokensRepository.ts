import { getMongoRepository, MongoRepository } from 'typeorm';

import IBlacklistTokensInterface from '@modules/users/interfaces/IBlacklistTokensInterface';
import ITokenDTO from '@modules/users/dtos/ITokenDTO';
import Blacklist from '../schemas/Blacklist';

class BlacklistTokensRepository implements IBlacklistTokensInterface {
  private ormRepository: MongoRepository<Blacklist>;

  constructor() {
    this.ormRepository = getMongoRepository(Blacklist, 'mongo');
  }

  public async create(payload: ITokenDTO): Promise<Blacklist> {
    const token = this.ormRepository.create({ token: payload.token });

    await this.ormRepository.save(token);

    return token;
  }

  public async findByToken(token: string): Promise<Blacklist | undefined> {
    const findToken = this.ormRepository.findOne({ token });

    return findToken;
  }
}

export default BlacklistTokensRepository;
