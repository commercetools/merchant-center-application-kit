import * as jose from 'jose';

console.log('jose', jose);

(async () => {
  try {
    // Generate RSA key pair with 2048 bits for the RS256 algorithm
    const { publicKey, privateKey } = await jose.generateKeyPair('RS256', { modulusLength: 2048 });

    console.log('Private key:', privateKey);
    console.log('Private key type:', typeof privateKey);

    // Create and sign a JWT using the private key
    let jwt = await new jose.SignJWT({
        [`https://mc-api.ct-test.com/claims/project_key`]: 'project-key',
      })
        .setAudience('http://test-server')
        .setIssuer('https://mc-api.ct-test.com')
        .setProtectedHeader({ alg: 'RS256' })
        .setSubject('user-id')
        .sign(privateKey);

    console.log('JWT:', jwt);
  } catch (error) {
    console.error('Error generating keys or signing JWT:', error);
  }
})();
