import { createContainer } from '@/node_modules/iti';

import { getAuthenticationServiceModule } from './modules/authentication.service.module';
import { getEmailServiceModule } from './modules/email.service.module';
import { getUsersRepositoryModule } from './modules/users.repository.module';
import { getVerificationCodesRepositoryModule } from './modules/verification-codes.repository.module';

const root = createContainer()
  .add({
    UsersRepository: getUsersRepositoryModule,
    VerificationCodesRepository: getVerificationCodesRepositoryModule,
  })
  .add(ctx => ({
    AuthenticationService: getAuthenticationServiceModule.bind(
      null,
      ctx.UsersRepository
    ),
    EmailService: getEmailServiceModule,
  }));

// These two functions are used in tests to reset the container
export function initializeContainer() {
  root
    .upsert({
      UsersRepository: getUsersRepositoryModule,
      VerificationCodesRepository: getVerificationCodesRepositoryModule,
    })
    .upsert(ctx => ({
      AuthenticationService: getAuthenticationServiceModule.bind(
        null,
        ctx.UsersRepository
      ),
      EmailService: getEmailServiceModule,
    }));
}
export function destroyContainer() {
  Object.keys(root.items).forEach(key => {
    root.delete(key as keyof typeof root.items);
  });
}

export const container = root;
