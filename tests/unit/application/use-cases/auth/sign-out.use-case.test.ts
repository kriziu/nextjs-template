import { afterEach, beforeEach, expect, it } from 'vitest';

import { SESSION_COOKIE } from '@/config';
import { container, destroyContainer, initializeContainer } from '@/di';
import { signOutUseCase } from '@/src/application/use-cases/auth/sign-out.use-case';

beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
});

it('deletes invalidated session', async () => {
  const authenticationService = container.get('AuthenticationService');

  expect(authenticationService.getAllSessions()).resolves.toHaveLength(1);
  await signOutUseCase('1');
  expect(authenticationService.getAllSessions()).resolves.toHaveLength(0);
});

it('returns a valid blank cookie', async () => {
  expect(signOutUseCase('1')).resolves.toMatchObject({
    blankCookie: {
      name: SESSION_COOKIE,
      value: '',
    },
  });
});
