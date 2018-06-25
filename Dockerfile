FROM node:8-slim@sha256:55739838bbd1a7d66eb8d6446be2488564a2def8198642a919bac201b814cf28

LABEL maintainer="mc@commercetools.com"

WORKDIR /app

COPY ./ /app/

RUN yarn install

ENV NODE_ENV production
EXPOSE 3001

CMD ["./bin/start-mc.js"]
