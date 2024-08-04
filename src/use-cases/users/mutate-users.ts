import * as UserDataAccess from '@/data-access/user';
import { User } from '@/entities/user';

export const mutateUsersDependencies = {
  createUser: UserDataAccess.createUser,
};

export async function createRandomUser(
  ctx: typeof mutateUsersDependencies,
): Promise<User> {
  const randomName = Math.random().toString(36).substring(7);

  const user = await ctx.createUser(randomName);

  return user;
}
