import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../interfaces/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to create a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    };

    const createUser = await createUserService.execute(userData);

    expect(createUser).toHaveProperty('id');
  });

  it('should not be able to create an user with a existent email', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    };

    await createUserService.execute(userData);

    await expect(createUserService.execute(userData)).rejects.toBeInstanceOf(
      AppError
    );
  });
});
