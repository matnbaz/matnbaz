FROM node:16 AS pruner
WORKDIR /app
COPY . .
RUN npm i -g nx
RUN npx turbo prune --scope="@denja/web" --docker

FROM node:16 AS installer
RUN npm i -g pnpm

WORKDIR /app
COPY .gitignore .gitignore
COPY .yarnrc .yarnrc
COPY --from=pruner ./app/out/json/ ./
COPY --from=pruner ./app/out/pnpm-*.yaml ./
COPY turbo.json turbo.json
RUN pnpm install

COPY tsconfig.json tsconfig.json
COPY --from=pruner ./app/out/full/ ./
RUN pnpm run postinstall
RUN pnpm run build

EXPOSE 3000
CMD cd apps/web && npm run start
