import * as MutateUsers from './mutate-users';

// MUTATORS
export const registerUser = MutateUsers.registerUser.bind(
  null,
  MutateUsers.mutateUsersDependencies,
);
export const loginUser = MutateUsers.loginUser.bind(
  null,
  MutateUsers.mutateUsersDependencies,
);
