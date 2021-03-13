import { v4 } from 'uuid';

import User from '@modules/users/infra/database/entities/User';
import IUsersInterface from '../IUsersInterface';
import IUserDTO from '../../dtos/IUserDTO';

class FakeUsersRepository implements IUsersInterface {
  private users: User[] = [];

  public async create(userData: IUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: v4() }, userData);

    this.users.push(user);

    return user;
  }

  public async findById(user_id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === user_id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async saveAddress(addressId: string, userId: string): Promise<void> {
    const findIndex = this.users.findIndex(findUser => findUser.id === userId);

    this.users[findIndex].address_id = addressId;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
