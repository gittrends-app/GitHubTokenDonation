FROM node:20-slim AS base

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN corepack enable \
  && apt-get update -y

COPY package.json package.json
COPY yarn.lock yarn.lock

FROM base AS deps

COPY . .
RUN yarn install --frozen-lockfile

FROM deps as build

RUN yarn build \
  && rm -rf node_modules \
  && yarn install --production

FROM base as runner

COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=build /usr/src/app/.next .next
COPY --from=build /usr/src/app/public public
COPY --from=build /usr/src/app/package.json package.json

CMD PORT=80 yarn start

