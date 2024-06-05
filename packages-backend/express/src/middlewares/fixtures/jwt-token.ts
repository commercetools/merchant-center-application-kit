import {
  exportJWK,
  generateKeyPair,
  type KeyLike,
  SignJWT,
  type JWK,
} from 'jose';

let keyRS256: KeyLike;
let jwksStore: { keys: JWK[] };

async function initialize() {
  // Generate RSA key pair with 2048 bits for the RS256 algorithm
  const { publicKey, privateKey } = await generateKeyPair('RS256', {
    modulusLength: 2048,
  });
  keyRS256 = privateKey;

  // Export the public key to JWK format
  const publicJWK: JWK = await exportJWK(publicKey);

  // Add the necessary properties for the JWKS
  publicJWK.use = 'sig'; // Signature
  publicJWK.alg = 'RS256'; // Algorithm
  publicJWK.kid = 'example-key-id'; // Key ID

  jwksStore = {
    keys: [publicJWK],
  };
}

const createToken = (options: { issuer: string; audience: string }) => {
  if (!keyRS256) {
    throw new Error(
      'Key not initialized. Please call the "initialize" function first.'
    );
  }

  return new SignJWT({
    [`${options.issuer}/claims/project_key`]: 'project-key',
  })
    .setAudience(options.audience)
    .setIssuer(options.issuer)
    .setProtectedHeader({ alg: 'RS256' })
    .setSubject('user-id')
    .sign(keyRS256);
};

export { initialize, jwksStore, createToken };
