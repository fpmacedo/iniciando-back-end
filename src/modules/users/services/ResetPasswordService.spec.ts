import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import ResetPasswordService from './ResetPasswordService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;

let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeUserTokensRepository = new FakeUserTokensRepository();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@johndoe.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPassword.execute({
      password: '1234343',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('1234343');
  });
});
