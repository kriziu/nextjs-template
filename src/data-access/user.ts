import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { userTable } from '@/db/schema';

export async function createUser({
  id,
  name,
  email,
  passwordHash,
}: {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}) {
  const [user] = await db
    .insert(userTable)
    .values({ id, name, email, passwordHash })
    .returning();

  return user;
}

export async function getUserByEmail(email: string) {
  const user = await db.query.userTable.findFirst({
    where: eq(userTable.email, email),
  });

  return user;
}
