import { defineConfig } from 'drizzle-kit';

import { env } from '@/env';

export default defineConfig({
  schema: './drizzle/schema.ts',
  dialect: 'postgresql',
  out: './drizzle/migrations',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
