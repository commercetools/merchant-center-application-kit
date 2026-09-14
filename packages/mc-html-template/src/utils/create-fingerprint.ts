import crypto from 'crypto';

/**
 * Deploy identifiers reach a CSP-hashed inline script and, downstream, a
 * localStorage key. Constrain the shape rather than trusting whatever the
 * pipeline set.
 */
const REVISION_PATTERN = /^[A-Za-z0-9._-]{1,64}$/;

const FINGERPRINT_LENGTH = 16;

/**
 * Used by the dev-server render paths, which never reach `compileHtml` and so
 * have no template to hash and no deploy revision to read. Constant on purpose:
 * a value that changed per reload would make client caches useless locally,
 * and a missing one would let them key everything under `undefined`.
 */
export const DEVELOPMENT_FINGERPRINT = 'development';

type TOptions = {
  /**
   * `env.revision`, which the Merchant Center pipeline sets to the built git
   * SHA and which is empty locally.
   */
  revision?: string;
  indexHtmlTemplate: string;
};

/**
 * Produces the value clients key content caches on.
 *
 * Prefers the deploy revision, and falls back to hashing the compiled template
 * when it is absent. The fallback is what makes the value usable at all in the
 * apps and environments that never set a revision: an empty key would let a
 * consumer cache every locale under one entry and serve stale translations
 * indefinitely.
 *
 * `base64url` rather than `create-asset-hash`'s standard base64, because the
 * value ends up in a localStorage key and `+`, `/` and `=` do not belong there.
 */
const createFingerprint = ({ revision, indexHtmlTemplate }: TOptions) => {
  const deployRevision = revision?.trim() ?? '';

  if (deployRevision) {
    if (!REVISION_PATTERN.test(deployRevision)) {
      throw new Error(
        `Expected the application's \`revision\` to match ${REVISION_PATTERN}, got "${deployRevision}". ` +
          `It is published to the client and used in cache keys, so it cannot be passed through unchecked.`
      );
    }
    return deployRevision;
  }

  if (!indexHtmlTemplate.trim()) {
    throw new Error(
      'Cannot derive a fingerprint: no `revision` was configured and the ' +
        'compiled `index.html` template is empty. Failing here rather than ' +
        'emitting an empty value, which would pin every client cache.'
    );
  }

  return crypto
    .createHash('sha256')
    .update(indexHtmlTemplate)
    .digest('base64url')
    .slice(0, FINGERPRINT_LENGTH);
};

export default createFingerprint;
