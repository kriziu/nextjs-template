// This file is to get the migration to run in the Dockerfile right
// before the service runs.

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

console.log(process.env.DATABASE_URL);

const pg = postgres(process.env.DATABASE_URL!);
const db = drizzle(pg);

async function main() {
  await migrate(db, { migrationsFolder: '..' });
  await pg.end();
}

main();
