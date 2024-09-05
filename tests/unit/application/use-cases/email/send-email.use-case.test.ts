import { afterEach, beforeEach, expect, it } from 'vitest';

import { destroyContainer, initializeContainer } from '@/di';
import { sendEmailUseCase } from '@/src/application/use-cases/email/send-email.use-case';

beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
});

it('sends an email', async () => {
  expect(
    sendEmailUseCase({
      to: 'test@test.com',
      subject: 'Test',
      html: 'Test',
    })
  ).resolves.not.toThrow();
});
