import { hash } from '@node-rs/argon2';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

import { LoginUserDto, RegisterUserDto, User } from '@/entities/user';
import { passwordHashOptions } from '@/lib/auth.config';

import { errorMessages, loginUser, registerUser } from '../mutate-users';

describe('mutate-users', () => {
  let mockUserData: User;

  beforeAll(async () => {
    const passwordHash = await hash('testpassword', passwordHashOptions);
    mockUserData = {
      id: '123',
      name: 'test',
      email: 'test@email.com',
      passwordHash,
    };
  });

  const mockCreateUser = vi.fn((obj) => Promise.resolve(obj));
  const getMockCtx = (userData: User | null) => ({
    createUser: mockCreateUser,
    getUserByEmail: vi.fn().mockResolvedValue(userData),
  });

  describe('registerUser', () => {
    const mockRegisterData: RegisterUserDto = {
      name: 'test',
      email: 'test@email.com',
      password: 'testpassword',
    };

    it('should throw a validation error if the data is invalid', async () => {
      const ctx = getMockCtx(null);

      await Promise.all([
        expect(
          registerUser(ctx, { ...mockRegisterData, email: 'invalidemail' }),
        ).rejects.toThrow(z.ZodError),

        expect(registerUser(ctx, { ...mockRegisterData, name: '' })).rejects.toThrow(
          z.ZodError,
        ),

        expect(
          registerUser(ctx, { ...mockRegisterData, password: 'short' }),
        ).rejects.toThrow(z.ZodError),
      ]);
    });

    it('should throw an error if the user already exists', async () => {
      const ctx = getMockCtx(mockUserData);

      await expect(registerUser(ctx, mockRegisterData)).rejects.toThrow(
        errorMessages.UserAlreadyExist,
      );
    });

    it('should return a user with safe data if the user does not exist', async () => {
      const ctx = getMockCtx(null);

      await expect(registerUser(ctx, mockRegisterData)).resolves.toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: mockUserData.name,
          email: mockUserData.email,
        }),
      );
    });
  });

  describe('loginUser', () => {
    const mockLoginData: LoginUserDto = {
      email: 'test@email.com',
      password: 'testpassword',
    };

    it('should throw a validation error if the data is invalid', async () => {
      const ctx = getMockCtx(null);

      await Promise.all([
        expect(
          loginUser(ctx, { ...mockLoginData, email: 'invalidemail' }),
        ).rejects.toThrow(z.ZodError),

        expect(loginUser(ctx, { ...mockLoginData, password: '' })).rejects.toThrow(
          z.ZodError,
        ),
      ]);
    });

    it('should throw an error if the user does not exist', async () => {
      const ctx = getMockCtx(null);

      await expect(loginUser(ctx, mockLoginData)).rejects.toThrow(
        errorMessages.InvalidCredentials,
      );
    });

    it('should throw an error if the password is invalid', async () => {
      const ctx = getMockCtx(mockUserData);

      await expect(
        loginUser(ctx, { ...mockLoginData, password: 'testpassword2' }),
      ).rejects.toThrow(errorMessages.InvalidCredentials);
    });

    it('should return a user with safe data if the user exists and the password is valid', async () => {
      const ctx = getMockCtx(mockUserData);

      await expect(loginUser(ctx, mockLoginData)).resolves.toEqual({
        id: mockUserData.id,
        name: mockUserData.name,
        email: mockUserData.email,
      });
    });
  });
});
