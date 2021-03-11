import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdatePasswordService from '@modules/users/services/UpdatePasswordService';

class UpdatePasswordController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { old_password, password, confirm_password } = request.body;

    const updatePassword = container.resolve(UpdatePasswordService);

    const user = await updatePassword.execute({
      user_id,
      old_password,
      password,
      confirm_password,
    });

    return response.json(classToClass(user));
  }
}

export default UpdatePasswordController;
