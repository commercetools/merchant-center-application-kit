const { getContentType, getSummary } = require('@promster/express');

/**
 * NOTE:
 *   The `/metrics` are not meant to be exposed publicly. For this
 *   we often employ one of four options
 *
 *   1. Expose metrics only internally within the cluster by spawning two
 *      servers of which only one port is exposed and the other remains
 *      only internally visible within the cluster.
 *   2. Protect the route by a token (e.g. JWT) which has to be valid
 *      to `GET /metrics` and otherwise triggers a `404`.
 *   3. Verify using headers that the request only comes from within the
 *      K8s cluster.
 *   4. Agree with OPs that the metrics do not contain anything sensitive
 *
 *   We can not really use option 1. in our case as we would then expose
 *   metrics of another node process (the second server) which do not
 *   reflect the actual application's health. `prom-client` itself
 *   has options to solve this (when running in cluster mode) but it
 *   involves more setup and complications than we need to take care of.
 *   We also drop option 2. as the scaper of Prometheus should not
 *   have knowledge of a JWT of any sort of auth header. Option 3. is
 *   the most viable in this scenario as the service is only exposed
 *   through a Google LoadBalancer which sets the headers accordinly.
 *   This is documented here: https://cloud.google.com/compute/docs/load-balancing/http/
 *   under target proxies.
 */
module.exports = function metrics(request, response) {
  if (
    request.headers &&
    request.headers.via &&
    request.headers.via.includes('google')
  ) {
    response.statusCode = 200;

    response.end();
  } else {
    response.statusCode = 200;

    response.setHeader('Content-Type', getContentType());
    response.end(getSummary());
  }
};
