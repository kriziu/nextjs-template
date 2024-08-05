import { mutateUsersDependencies } from './dependencies';
import * as MutateUsers from './mutate-users';

// MUTATORS
export const registerUser = MutateUsers.registerUser.bind(null, mutateUsersDependencies);
export const loginUser = MutateUsers.loginUser.bind(null, mutateUsersDependencies);
