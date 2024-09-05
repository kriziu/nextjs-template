import { eq } from 'drizzle-orm';

import { db } from '@/drizzle';
import { users } from '@/drizzle/schema';
import { IUsersRepository } from '@/src/application/repositories/users.repository.interface';
import { DatabaseOperationError } from '@/src/entities/errors/common';
import { User, UserInsert } from '@/src/entities/models/user';

export class UsersRepository implements IUsersRepository {
  async getUser(id: string): Promise<User | undefined> {
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.id, id),
      });

      return user;
    } catch (err) {
      throw new DatabaseOperationError(
        (err as Error).message ?? 'Cannot get user by id.'
      );
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      return user;
    } catch (err) {
      throw new DatabaseOperationError(
        (err as Error).message ?? 'Cannot get user by email.'
      );
    }
  }

  async createUser(input: UserInsert): Promise<User> {
    try {
      const [created] = await db.insert(users).values(input).returning();

      if (created) {
        return created;
      } else {
        throw new DatabaseOperationError('Cannot create user.');
      }
    } catch (err) {
      throw new DatabaseOperationError(
        (err as Error).message ?? 'Cannot create user.'
      );
    }
  }

  async editUser(id: string, input: Partial<UserInsert>): Promise<User> {
    try {
      const [updated] = await db
        .update(users)
        .set(input)
        .where(eq(users.id, id))
        .returning();

      if (updated) {
        return updated;
      } else {
        throw new DatabaseOperationError('Cannot edit user.');
      }
    } catch (err) {
      throw new DatabaseOperationError(
        (err as Error).message ?? 'Cannot edit user.'
      );
    }
  }
}
