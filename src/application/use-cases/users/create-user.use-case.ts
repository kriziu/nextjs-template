import { container } from '@/di';
import { User } from '@/src/entities/models/user';

export async function createUserUseCase(email: string): Promise<User> {
  const userRepository = container.get('UsersRepository');

  return userRepository.createUser({ email, emailVerified: false });
}
