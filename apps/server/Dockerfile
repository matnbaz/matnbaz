FROM matnbaz:base AS builder

WORKDIR /app/builder
COPY . .
RUN yarn build server --prod
# RUN yarn prisma db push

FROM matnbaz:base

WORKDIR /app/server
COPY --from=builder /app/builder ./

CMD [ "node", "dist/apps/server/main.js" ]