FROM node:10-alpine

WORKDIR /app

COPY ./dist /app/dist

COPY ./package.json /app/
RUN yarn install --production

ARG REGION
ENV REGION ${REGION}

RUN echo "Region ${REGION}"
COPY ./csp.prod-"${REGION}".json /app/
COPY ./env.prod-"${REGION}".json /app/

ENV NODE_ENV=production

EXPOSE 3001

CMD /app/node_modules/.bin/mc-http-server --config /app/env.prod-"${REGION}".json --csp /app/csp.prod-"${REGION}".json --use-local-assets
