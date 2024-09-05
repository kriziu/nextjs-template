import type { User, UserInsert } from '@/src/entities/models/user';

export interface IUsersRepository {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(input: UserInsert): Promise<User>;
  editUser(id: string, input: Partial<UserInsert>): Promise<User>;
}
