import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../interfaces/fakes/FakeUsersRepository';

import CreateUserAddressService from './CreateUserAddressService';
import FakeUserAddressRepository from '../interfaces/fakes/FakeUserAddressRepository';

let fakeUserAddressRepository: FakeUserAddressRepository;
let fakeUsersRepository: FakeUsersRepository;
let createUserAddressService: CreateUserAddressService;

describe('CreateUserAddres', () => {
  beforeEach(() => {
    fakeUserAddressRepository = new FakeUserAddressRepository();
    fakeUsersRepository = new FakeUsersRepository();

    createUserAddressService = new CreateUserAddressService(
      fakeUserAddressRepository,
      fakeUsersRepository
    );
  });

  it('should be able to create a new address', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { id: userId } = user;

    const address = await createUserAddressService.execute(userId, {
      state: 'Colorado',
      city: 'Vail',
      cep: '81657',
      neighborhood: 'Falls of Vail',
      street: 'Fall Line Dr',
      house_number: 21,
    });

    expect(user).toHaveProperty('address_id');
    expect(address).toEqual(address);
  });

  it('should not be able to create more than one address', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { id: userId } = user;

    await createUserAddressService.execute(userId, {
      state: 'Colorado',
      city: 'Vail',
      cep: '81657',
      neighborhood: 'Falls of Vail',
      street: 'Fall Line Dr',
      house_number: 21,
    });

    await expect(
      createUserAddressService.execute(userId, {
        state: 'Colorado',
        city: 'Keystone',
        cep: '80435',
        neighborhood: 'Some neighbor',
        street: 'Some street',
        house_number: 21,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a address to an unexistent user', async () => {
    await expect(
      createUserAddressService.execute('Unexistent user', {
        state: 'Colorado',
        city: 'Keystone',
        cep: '80435',
        neighborhood: 'Some neighbor',
        street: 'Some street',
        house_number: 21,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
