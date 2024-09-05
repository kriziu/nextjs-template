/* eslint-disable @typescript-eslint/no-explicit-any */
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { env } from '@/env';

import * as schema from './schema';

let db: PostgresJsDatabase<typeof schema>;
let pg: ReturnType<typeof postgres>;

if (env.NODE_ENV === 'production') {
  pg = postgres(env.DATABASE_URL);
  db = drizzle(pg, { schema });
} else {
  if (!(global as any).db!) {
    pg = postgres(env.DATABASE_URL);
    (global as any).db = drizzle(pg, { schema });
  }
  db = (global as any).db;
}

const authAdapter = new DrizzlePostgreSQLAdapter(
  db,
  schema.sessions,
  schema.users
);

export { db, pg, authAdapter };
