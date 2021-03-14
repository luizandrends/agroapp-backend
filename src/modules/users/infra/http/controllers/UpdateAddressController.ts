import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserAddressService from '@modules/users/services/UpdateUserAddressService';

class UpdateAddressController {
  public async update(request: Request, response: Response): Promise<Response> {
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

    const updateUserAddressService = container.resolve(
      UpdateUserAddressService
    );

    const address = await updateUserAddressService.execute(
      user_id,
      createAddressData
    );

    return response.json(classToClass(address));
  }
}

export default UpdateAddressController;
