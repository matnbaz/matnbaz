FROM node:17 AS builder

# Production use node instead of root
# USER node

WORKDIR /app/builder
COPY . .
RUN yarn install
