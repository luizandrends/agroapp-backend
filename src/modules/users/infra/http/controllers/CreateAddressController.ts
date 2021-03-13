import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserAddressService from '@modules/users/services/CreateUserAddressService';

class CreateAddressController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      state,
      city,
      cep,
      neighborhood,
      street,
      house_number,
    } = request.body;
    const user_id = request.user.id;

    const createAddressData = {
      state,
      city,
      cep,
      neighborhood,
      street,
      house_number,
    };

    const createUserAddressService = container.resolve(
      CreateUserAddressService
    );

    const address = await createUserAddressService.execute(
      user_id,
      createAddressData
    );

    return response.json(classToClass(address));
  }
}

export default CreateAddressController;
