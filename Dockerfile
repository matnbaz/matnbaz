FROM node:12-alpine

WORKDIR /workspace
ENV PORT 3000

COPY package.json yarn.lock ./
COPY prisma ./prisma

RUN yarn install


# Production use node instead of root
# USER node

COPY . .

RUN yarn nx build api --prod

CMD [ "node", "dist/apps/api/main.js" ]