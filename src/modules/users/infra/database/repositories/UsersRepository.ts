import { Repository, getRepository, getConnection } from 'typeorm';

import IUsersInterface from '@modules/users/interfaces/IUsersInterface';
import IUserDTO from '@modules/users/dtos/IUserDTO';
import User from '../entities/User';

class UsersRepository implements IUsersInterface {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(userData: IUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    return user;
  }

  public async findById(user_id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { id: user_id },
      relations: ['address'],
    });

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { email },
    });

    return findUser;
  }

  public async saveAddress(address_id: string, user_id: string): Promise<void> {
    getConnection()
      .createQueryBuilder()
      .update(User)
      .set({
        address_id,
      })
      .where('id = :id', { id: user_id })
      .execute();
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
