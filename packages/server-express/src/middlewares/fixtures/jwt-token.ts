import { JWT, JWK, JWKS } from '@panva/jose';

const keyRS256 = JWK.generateSync('RSA', 2048, { use: 'sig', alg: 'RS256' });

const jwksStore = new JWKS.KeyStore([keyRS256]);

const createToken = (options: { issuer: string; audience: string }) =>
  JWT.sign(
    {
      sub: 'user-id',
      iss: options.issuer,
      aud: options.audience,
      [`${options.issuer}/claims/project_key`]: 'project-key',
    },
    keyRS256,
    { algorithm: 'RS256' }
  );

export { jwksStore, createToken };
