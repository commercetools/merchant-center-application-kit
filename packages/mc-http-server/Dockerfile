#### Release process
#
# We use Google Cloud Container Registry to build and store the Docker image, using a Build trigger connected to our GitHub repo.
# The build is triggered on each tag, so whenever we do a new release.

FROM node:10-alpine

LABEL maintainer="mc@commercetools.com"

WORKDIR /app

COPY ./ /app/

RUN yarn install

ENV NODE_ENV production
EXPOSE 3001

CMD ["./bin/start-mc.js"]
