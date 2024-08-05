FROM node:20-slim AS base

RUN npm install -g pnpm

FROM base AS builder
WORKDIR /app

COPY . .
RUN pnpm install --frozen-lockfile


ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Add here the environment variables that are needed for the build
ARG DATABASE_URL

RUN pnpm run build

FROM base AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/drizzle ./drizzle
COPY --from=builder --chown=nextjs:nodejs /app/run.sh ./run.sh

RUN cd drizzle/migrate && pnpm install

WORKDIR /app

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ./run.sh