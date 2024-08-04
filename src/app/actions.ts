'use server';

import { revalidatePath } from 'next/cache';
import { createServerAction } from 'zsa';

import { createRandomUser } from '@/use-cases/users';

export const createRandomUserAction = createServerAction().handler(async () => {
  await createRandomUser();

  revalidatePath('/users');
});
