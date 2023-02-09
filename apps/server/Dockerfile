FROM node:alpine AS builder

WORKDIR /app
RUN yarn install
RUN yarn build server --prod

FROM node:alpine

WORKDIR /app
COPY --from=builder /app/dist/apps/server ./

CMD [ "node", "main.js" ]
