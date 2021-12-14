FROM matnbaz:base AS builder

WORKDIR /app/builder
COPY . .
RUN yarn build web --prod

FROM matnbaz:base

WORKDIR /app/web
COPY --from=builder /app/builder ./

CMD [ "yarn", "run", "web", "--prod" ]
