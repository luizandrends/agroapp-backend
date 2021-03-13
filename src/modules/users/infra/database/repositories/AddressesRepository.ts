import { Repository, getRepository } from 'typeorm';

import IAddressInterface from '@modules/users/interfaces/IAddressInterface';
import IAddressDTO from '@modules/users/dtos/IAddressDTO';
import Address from '../entities/Address';

class AddressesRepository implements IAddressInterface {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async create(userData: IAddressDTO): Promise<Address> {
    const user = this.ormRepository.create(userData);

    return user;
  }

  public async save(user: Address): Promise<Address> {
    return this.ormRepository.save(user);
  }
}

export default AddressesRepository;
