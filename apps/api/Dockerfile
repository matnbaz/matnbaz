FROM node:16-alpine AS builder
RUN apk add --update --no-cache libc6-compat openssl1.1-compat openssl openssl-dev
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:16-alpine AS installer
RUN apk add --update --no-cache libc6-compat openssl1.1-compat openssl openssl-dev
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/turbo.json ./turbo.json
COPY --from=builder /app/apps/api/prisma ./prisma
RUN yarn install --frozen-lockfile

FROM node:16-alpine AS sourcer
RUN apk add --update --no-cache libc6-compat openssl1.1-compat openssl openssl-dev
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
RUN cd ./apps/api && yarn prisma generate
RUN yarn turbo run build --scope=api --include-dependencies --no-deps

FROM node:16-alpine as runner
RUN apk add --update --no-cache libc6-compat openssl1.1-compat openssl openssl-dev
WORKDIR /app
COPY --from=sourcer /app/ .
CMD [ "node", "apps/api/dist/main.js" ]
