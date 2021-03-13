import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Address from '../infra/database/entities/Address';
import IAddressDTO from '../dtos/IAddressDTO';
import IUsersInterface from '../interfaces/IUsersInterface';
import IAddressInterface from '../interfaces/IAddressInterface';
import User from '../infra/database/entities/User';

interface IReturnData {
  user: User;
  address: Address;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('AddressesRepository')
    private addressRepository: IAddressInterface,

    @inject('UsersRepository')
    private usersRepository: IUsersInterface
  ) {}

  public async execute(
    user_id: string,
    userData: IAddressDTO
  ): Promise<IReturnData> {
    const { state, city, cep, neighborhood, street, house_number } = userData;

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Unexistent user', 400);
    }

    if (user.address_id) {
      throw new AppError(
        'You can not create more then one address for a user',
        400
      );
    }

    const address = await this.addressRepository.create({
      state,
      city,
      cep,
      neighborhood,
      street,
      house_number,
    });

    await this.addressRepository.save(address);

    const { id: addressId } = address;

    user.address_id = addressId;

    await this.usersRepository.save(user);

    const returnData = {
      user,
      address,
    };

    return returnData;
  }
}

export default CreateUserService;
