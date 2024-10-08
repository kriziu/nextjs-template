# Next.js template for creating full stack web apps.

It is created using clean architecture

### Features
- shadcn/ui
- Drizzle ORM
- Lucia Auth (email code verification)
- Zod schemas
- Typed env variables
- Husky (git hooks)
- .cursorrules (Cursor rules created specifically for this project)

### Getting started

Edit `.env.sample` to `.env` and provide your variables (if you use postgres container, the `DATABASE_URL` is already provided correctly).

You can use postgres database from a docker container:

```bash
docker compose up -d
```
or your other database if you want (don't forget to change that in drizzle and lucia adapter)

To run project, simply run the development server:

```bash
pnpm dev
```

If you want to deploy the project, you can use the Docker (remember to pass the `DATABASE_URL` build argument to make migrations) or run the `build` and `start` scripts:
```bash
pnpm build
# wait for completion
pnpm start
```

I'm planning to add E2E tests using Cypress in the future.

Feel free to modify this template to your needs!