/**
 * Get the "real" Merchant Center frontend URL to redirect the user
 * to the login page.
 * We use an explicit full URL so that if a user tries to access the
 * Custom Applications directly to its domain, it will always redirect
 * the user to the login page.
 *
 * To determine the "real" URL, we need to check if the current location
 * is a Merchant Center domain, or if it's a custom user domain.
 * For the latter, we can derive the URL from the Merchant Center API URL.
 *
 * A Merchant Center hostname is composed by the following parts:
 *    https://<mc-prefix>.<region>.<provider>.<ct-domain>.<tld>
 * We neeed to check if at least the first 4 parts (right-to-left) are
 * the same.
 */
function getMcOrigin(mcApiUrl: string, actualWindow = window) {
  const mcApiUrlObject = new URL(mcApiUrl);

  const [tldMcApi, ctDomainMcApi, providerMcApi, regionMcApi] =
    mcApiUrlObject.hostname.split('.').reverse();
  const [tldMc, ctDomainMc, providerMc, regionMc] =
    actualWindow.location.hostname.split('.').reverse();

  const isMatching =
    tldMcApi === tldMc &&
    ctDomainMcApi === ctDomainMc &&
    providerMcApi === providerMc &&
    regionMcApi === regionMc;

  if (isMatching) {
    return actualWindow.location.origin;
  }

  return mcApiUrlObject.origin.replace('mc-api', 'mc');
}

export default getMcOrigin;
