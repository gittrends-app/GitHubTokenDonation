FROM node:20-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi


# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET

ARG GH_CLIENT_ID
ARG GH_CLIENT_SECRET

ENV NEXT_PUBLIC_GH_CLIENT_ID=$GH_CLIENT_ID
ENV NEXT_PUBLIC_GH_CLIENT_SECRET=$GH_CLIENT_SECRET

ARG ADMIN_LOGIN_SECRET
ARG ADMIN_EMAIL_SECRET
ARG ADMIN_PASSWORD_SECRET

ARG SMTP
ARG SMTP_HOST
ARG SMTP_PORT
ARG SMTP_AUTH
ARG SMTP_USER
ARG SMTP_PASSWORD

ARG DB_URL

ARG NEXT_PUBLIC_NAME
ARG NEXT_PUBLIC_TITLE
ARG NEXT_PUBLIC_MESSAGE
ARG NEXT_PUBLIC_DONATE_BUTTON
ARG NEXT_PUBLIC_HOME_BUTTON
ARG NEXT_PUBLIC_ADMIN_BUTTON
ARG NEXT_PUBLIC_ADMIN_LOGOUT_BUTTON
ARG NEXT_PUBLIC_THANKS_TITLE
ARG NEXT_PUBLIC_THANKS_MESSAGE
ARG NEXT_PUBLIC_ERROR_TITLE
ARG NEXT_PUBLIC_DB_ERROR_MESSAGE
ARG NEXT_PUBLIC_GH_ERROR_MESSAGE
ARG NEXT_PUBLIC_UNEXPECTED_ERROR_MESSAGE

RUN npm run build

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public


USER nextjs

EXPOSE 80

ENV PORT 80
ENV HOSTNAME 0.0.0.0

CMD ["node", "server.js"]