import * as GetUsers from './get-users';
import * as MutateUsers from './mutate-users';

// GETTERS
export const getUsers = GetUsers.getUsers.bind(null, GetUsers.getUsersDependencies);

// MUTATORS
export const createRandomUser = MutateUsers.createRandomUser.bind(
  null,
  MutateUsers.mutateUsersDependencies,
);
