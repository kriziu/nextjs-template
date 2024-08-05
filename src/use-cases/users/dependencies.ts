import * as UserDataAccess from '@/data-access/user';

export const mutateUsersDependencies = {
  createUser: UserDataAccess.createUser,
  getUserByEmail: UserDataAccess.getUserByEmail,
};
export type MutateUsersDependencies = typeof mutateUsersDependencies;
