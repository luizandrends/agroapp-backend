import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../interfaces/fakes/FakeUsersRepository';
import UpdatePasswordService from './UpdatePasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updatePassword: UpdatePasswordService;

describe('UpdatePassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updatePassword = new UpdatePasswordService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedUser = await updatePassword.execute({
      user_id: user.id,
      old_password: '123456',
      password: '123123',
      confirm_password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password from an unexistent user', async () => {
    await expect(
      updatePassword.execute({
        user_id: 'unexistent-user',
        old_password: '123456',
        password: '123123',
        confirm_password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updatePassword.execute({
        user_id: user.id,
        password: '123123',
        confirm_password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password without the password confirmation', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updatePassword.execute({
        user_id: user.id,
        old_password: '123456',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password without the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updatePassword.execute({
        user_id: user.id,
        old_password: '123456',
        confirm_password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password if the passwords does not match', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updatePassword.execute({
        user_id: user.id,
        old_password: '123456',
        password: '1231231',
        confirm_password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the old password does not match', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updatePassword.execute({
        user_id: user.id,
        old_password: '1234567',
        password: '123123',
        confirm_password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
