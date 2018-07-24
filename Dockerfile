#### Release process
#
# We use Google Cloud Container Registry to build and store the Docker image, using a Build trigger connected to our GitHub repo.
#
# - the trigger is configured to be executed based on the git tag matching the regex `http-server-[0-9].[0-9].[0-9]`
#   - the reason is to avoid triggering the build on every push/commit on e.g. `master`, instead we need to explicitly "tag a release"
#   - whenever we push some changes for the dockerfile, we should create a new tag `git tag -m "Http server: 2.0.0" http-server-2.0.0 && git push --tags`, obviously using a proper semver
# - remember to bump the version in the following places:
#   - `_PKG_VERSION` in `cloudbuild.yaml`
#   - `image.tag` in the `values.yaml` of the related K8s chart
# - the Google Cloud project used for the registry is called `ct-images`

FROM node:8-slim@sha256:16ed6d11d87d2001cfb83f312c1198a11e741481fa286e28460d2f2e06ad9f0a

LABEL maintainer="mc@commercetools.com"

WORKDIR /app

COPY ./ /app/

RUN yarn install

ENV NODE_ENV production
EXPOSE 3001

CMD ["./bin/start-mc.js"]
