import { db } from '@/db';
import { users } from '@/db/schema';

export async function createUser(name: string) {
  const [user] = await db.insert(users).values({ name }).returning();

  return user;
}

export async function getUsers() {
  return await db.query.users.findMany();
}
