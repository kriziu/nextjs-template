import { env } from '@/env';
import { IUsersRepository } from '@/src/application/repositories/users.repository.interface';
import { IAuthenticationService } from '@/src/application/services/authentication.service.interface';
import { AuthenticationService } from '@/src/infrastructure/services/authentication.service';
import { MockAuthenticationService } from '@/src/infrastructure/services/authentication.service.mock';

export function getAuthenticationServiceModule(
  _usersRepository: IUsersRepository
): IAuthenticationService {
  if (env.NODE_ENV === 'test') {
    return new MockAuthenticationService(_usersRepository);
  }

  return new AuthenticationService(_usersRepository);
}
