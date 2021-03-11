import { ObjectID } from 'mongodb';

import IBlacklistTokensInterface from '@modules/users/interfaces/IBlacklistTokensInterface';

import ITokenDTO from '../../dtos/ITokenDTO';

import Blacklist from '../../infra/database/schemas/Blacklist';

class FakeBlacklistTokensRepository implements IBlacklistTokensInterface {
  private tokens: Blacklist[] = [];

  public async create(payload: ITokenDTO): Promise<Blacklist> {
    const { token: usedToken } = payload;
    const token = new Blacklist();

    Object.assign(token, {
      id: new ObjectID(),
      token: usedToken,
    });

    this.tokens.push(token);

    return token;
  }

  public async findByToken(token: string): Promise<Blacklist | undefined> {
    const findUsedToken = this.tokens.find(
      findToken => findToken.token === token
    );

    return findUsedToken;
  }
}

export default FakeBlacklistTokensRepository;
