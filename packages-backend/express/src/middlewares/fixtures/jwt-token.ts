import { createPublicKey, generateKeyPairSync } from 'node:crypto';
import {
  type JWK,
  type JWTPayload,
  SignJWT,
  calculateJwkThumbprint,
  exportJWK,
  importPKCS8,
} from 'jose';

const signingKey = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});

export type JWKS = {
  keys: JWK[];
};

export type TestTokens = {
  tokenRS256: string;
  toJWKS: () => Promise<JWKS>;
};

let tokens: TestTokens;

async function getTokens(options: { issuer: string; audience: string }) {
  // Lazily initialize tokens
  if (!tokens) {
    await createTestTokens(options);
  }
  return tokens;
}

function clearTokens() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  tokens = null;
}

async function createTestTokens(options: {
  issuer: string;
  audience: string;
}): Promise<void> {
  const privateKey = await importPKCS8(signingKey.privateKey, 'RS256');
  const publicKey = createPublicKey({
    key: signingKey.privateKey,
    format: 'pem',
  });
  const jwk = await exportJWK(publicKey);
  const kid = await calculateJwkThumbprint(jwk);

  async function signToken(jwtPayload: JWTPayload): Promise<string> {
    const token = await new SignJWT(jwtPayload)
      .setProtectedHeader({
        alg: 'RS256',
        kid,
      })
      .sign(privateKey);
    return token;
  }

  async function toJWKS(): Promise<JWKS> {
    const keys = [
      {
        ...jwk,
        kid,
        alg: 'RS256',
        use: 'sig',
      },
    ];
    return { keys };
  }

  const tokenRS256 = await signToken({
    sub: 'user-id',
    iss: options.issuer,
    aud: options.audience,
    [`${options.issuer}/claims/project_key`]: 'project-key',
  });

  tokens = {
    tokenRS256,
    toJWKS,
  };
}

export { createTestTokens, getTokens, clearTokens };

// const createToken = (options: { issuer: string; audience: string }) =>
//   JWT.sign(
//     {
//       sub: 'user-id',
//       iss: options.issuer,
//       aud: options.audience,
//       [`${options.issuer}/claims/project_key`]: 'project-key',
//     },
//     keyRS256,
//     { algorithm: 'RS256' }
//   );

// export { jwksStore, createToken };
