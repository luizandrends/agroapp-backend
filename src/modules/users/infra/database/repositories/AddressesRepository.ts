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

  public async findAddressById(
    address_id: string
  ): Promise<Address | undefined> {
    const findAddress = this.ormRepository.findOne({
      where: { id: address_id },
    });

    return findAddress;
  }

  public async save(user: Address): Promise<Address> {
    return this.ormRepository.save(user);
  }
}

export default AddressesRepository;
