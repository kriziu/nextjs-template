import { cache } from 'react';

import { getUsers } from '@/use-cases/users';

export const getUsersLoader = cache(getUsers);
