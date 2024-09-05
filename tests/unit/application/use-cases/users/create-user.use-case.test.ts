import { afterEach, beforeEach, expect, it } from 'vitest';

import { container, destroyContainer, initializeContainer } from '@/di';

beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
});

it('creates user', async () => {
  const usersRepository = container.get('UsersRepository');
  expect(
    usersRepository.createUser({
      email: 'test@example.com',
      emailVerified: false,
    })
  ).resolves.toMatchObject({
    email: 'test@example.com',
    emailVerified: false,
  });

  expect(
    usersRepository.getUserByEmail('test@example.com')
  ).resolves.toMatchObject({
    email: 'test@example.com',
    emailVerified: false,
  });
});
