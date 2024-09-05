import { env } from '@/env';
import { IUsersRepository } from '@/src/application/repositories/users.repository.interface';
import { UsersRepository } from '@/src/infrastructure/repositories/users.repository';
import { MockUsersRepository } from '@/src/infrastructure/repositories/users.repository.mock';

export function getUsersRepositoryModule(): IUsersRepository {
  if (env.NODE_ENV === 'test') {
    return new MockUsersRepository();
  }

  return new UsersRepository();
}
