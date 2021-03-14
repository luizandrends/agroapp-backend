import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Address from '../infra/database/entities/Address';
import IAddressDTO from '../dtos/IAddressDTO';
import IUsersInterface from '../interfaces/IUsersInterface';
import IAddressInterface from '../interfaces/IAddressInterface';

@injectable()
class UpdateUserAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressRepository: IAddressInterface,

    @inject('UsersRepository')
    private usersRepository: IUsersInterface
  ) {}

  public async execute(
    user_id: string,
    addressData: IAddressDTO
  ): Promise<Address> {
    const {
      state,
      city,
      cep,
      neighborhood,
      street,
      house_number,
    } = addressData;

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Unexistent user', 400);
    }

    if (!user.address_id) {
      throw new AppError('The user does not have an address', 400);
    }

    const address = await this.addressRepository.findAddressById(
      user.address_id
    );

    if (!address) {
      throw new AppError('Address not found', 400);
    }

    address.state = state;
    address.city = city;
    address.cep = cep;
    address.neighborhood = neighborhood;
    address.street = street;
    address.house_number = house_number;

    await this.addressRepository.save(address);

    return address;
  }
}

export default UpdateUserAddressService;
