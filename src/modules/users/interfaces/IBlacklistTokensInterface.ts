import ITokenDTO from '../dtos/ITokenDTO';
import Blacklist from '../infra/database/schemas/Blacklist';

export default interface ITokensInterface {
  create(payload: ITokenDTO): Promise<Blacklist>;
  findByToken(token: string): Promise<Blacklist | undefined>;
}
