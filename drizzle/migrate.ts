import 'dotenv/config';

import { migrate } from 'drizzle-orm/postgres-js/migrator';

import { db, pg } from './index';

async function main() {
  await migrate(db, { migrationsFolder: 'drizzle/migrations' });
  await pg.end();
}

main();
