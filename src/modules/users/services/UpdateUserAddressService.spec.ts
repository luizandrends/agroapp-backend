import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../interfaces/fakes/FakeUsersRepository';

import CreateUserAddressService from './CreateUserAddressService';
import UpdateUserAddressService from './UpdateUserAddressService';
import FakeUserAddressRepository from '../interfaces/fakes/FakeUserAddressRepository';

let fakeUserAddressRepository: FakeUserAddressRepository;
let fakeUsersRepository: FakeUsersRepository;
let createUserAddressService: CreateUserAddressService;
let updateUserAddressService: UpdateUserAddressService;

describe('CreateUserAddres', () => {
  beforeEach(() => {
    fakeUserAddressRepository = new FakeUserAddressRepository();
    fakeUsersRepository = new FakeUsersRepository();

    createUserAddressService = new CreateUserAddressService(
      fakeUserAddressRepository,
      fakeUsersRepository
    );

    updateUserAddressService = new UpdateUserAddressService(
      fakeUserAddressRepository,
      fakeUsersRepository
    );
  });

  it('should be able to update the address', async () => {
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

    const addressObject = {
      state: 'Santa Catarina',
      city: address.address.city,
      cep: address.address.cep,
      neighborhood: address.address.neighborhood,
      street: address.address.street,
      house_number: address.address.house_number,
    };

    const updateAddress = await updateUserAddressService.execute(
      userId,
      addressObject
    );

    expect(updateAddress.state).toEqual(addressObject.state);
  });

  it('should not be able to update the address from an un esxistent user', async () => {
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

    const addressObject = {
      state: 'Santa Catarina',
      city: address.address.city,
      cep: address.address.cep,
      neighborhood: address.address.neighborhood,
      street: address.address.street,
      house_number: address.address.house_number,
    };

    await expect(
      updateUserAddressService.execute('unexistent-user', addressObject)
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update the addres if the user does not have one', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const addressObject = {
      state: 'Santa Catarina',
      city: 'Vail',
      cep: '81657',
      neighborhood: 'Falls of Vail',
      street: 'Fall Line Dr',
      house_number: 21,
    };

    const { id: userId } = user;

    await expect(
      updateUserAddressService.execute(userId, addressObject)
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the user address if the address id is unexistent', async () => {
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

    const addressObject = {
      state: 'Santa Catarina',
      city: address.address.city,
      cep: address.address.cep,
      neighborhood: address.address.neighborhood,
      street: address.address.street,
      house_number: address.address.house_number,
    };

    user.address_id = '';

    await expect(
      updateUserAddressService.execute(userId, addressObject)
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the user if the address id is invalid', async () => {
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

    const addressObject = {
      state: 'Santa Catarina',
      city: address.address.city,
      cep: address.address.cep,
      neighborhood: address.address.neighborhood,
      street: address.address.street,
      house_number: address.address.house_number,
    };

    user.address_id = 'ae59e0f9-b88c-4133-bc97-665d5f4c986d';

    await expect(
      updateUserAddressService.execute(userId, addressObject)
    ).rejects.toBeInstanceOf(AppError);
  });
});
