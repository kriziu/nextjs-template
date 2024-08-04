import * as UserDataAccess from '@/data-access/user';
import { User } from '@/entities/user';

export const getUsersDependencies = {
  getUsers: UserDataAccess.getUsers,
};

export async function getUsers(ctx: typeof getUsersDependencies): Promise<User[]> {
  const users = await ctx.getUsers();

  return users;
}
