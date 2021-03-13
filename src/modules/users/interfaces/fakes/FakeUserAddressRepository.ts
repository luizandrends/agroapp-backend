import { v4 } from 'uuid';

import Address from '@modules/users/infra/database/entities/Address';
import IAddressInterface from '../IAddressInterface';
import IAddressDTO from '../../dtos/IAddressDTO';

class FakeUserAddressRepository implements IAddressInterface {
  private address: Address[] = [];

  public async create(addressData: IAddressDTO): Promise<Address> {
    const address = new Address();

    Object.assign(address, { id: v4() }, addressData);

    this.address.push(address);

    return address;
  }

  public async save(address: Address): Promise<Address> {
    const findIndex = this.address.findIndex(
      findAddress => findAddress.id === address.id
    );

    this.address[findIndex] = address;

    return address;
  }
}

export default FakeUserAddressRepository;
