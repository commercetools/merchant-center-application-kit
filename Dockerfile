FROM node:8-slim@sha256:556271789f920bc0bf3d0906c33747e7397fda25d1ddd75d794f92c993ae3c2b

LABEL maintainer="mc@commercetools.com"

WORKDIR /app

COPY ./ /app/

ENV NODE_ENV production
EXPOSE 3001

CMD ["./bin/start-mc.js"]
