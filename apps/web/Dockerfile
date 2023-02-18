FROM node:16 AS builder
# RUN apk add --update --no-cache libc6-compat openssl1.1-compat openssl openssl-dev
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
# Only Take packages that are needed to compile this app
RUN turbo prune --scope=web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:16 AS installer
# RUN apk add --update --no-cache libc6-compat openssl1.1-compat openssl openssl-dev
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/turbo.json ./turbo.json
RUN yarn install --frozen-lockfile

FROM node:16 AS sourcer
# RUN apk add --update --no-cache libc6-compat openssl1.1-compat openssl openssl-dev
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
COPY ./markdown ./markdown
COPY .gitignore .gitignore
RUN yarn turbo run build --scope=web

EXPOSE 3000
CMD cd apps/web && yarn start
