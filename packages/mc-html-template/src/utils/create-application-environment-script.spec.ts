import type { ApplicationRuntimeConfig } from '@commercetools-frontend/application-config';
import createApplicationEnvironmentScript from './create-application-environment-script';

type TEnv = ApplicationRuntimeConfig['env'];

const makeEnv = (overrides: Partial<TEnv> = {}): TEnv =>
  ({
    applicationId: 'app-id',
    applicationIdentifier: 'app-identifier',
    applicationName: 'app-name',
    entryPointUriPath: 'my-app',
    revision: '',
    env: 'production',
    location: 'gcp-eu',
    cdnUrl: 'https://cdn.test',
    mcApiUrl: 'https://mc-api.test',
    frontendHost: 'https://mc.test',
    servedByProxy: false,
    ...overrides,
  } as TEnv);

describe('createApplicationEnvironmentScript', () => {
  it('assigns the serialized environment to window.app', () => {
    expect(createApplicationEnvironmentScript(makeEnv())).toContain(
      'window.app = {'
    );
  });

  it('omits the build fingerprint global when the field is absent', () => {
    expect(createApplicationEnvironmentScript(makeEnv())).not.toContain(
      '__BUILD_FINGERPRINT__'
    );
  });

  it('omits the build fingerprint global when the field is an empty string', () => {
    const script = createApplicationEnvironmentScript(
      makeEnv({ buildFingerprint: '' })
    );
    expect(script).not.toContain('__BUILD_FINGERPRINT__');
  });

  it('publishes the build fingerprint global when the field is present', () => {
    const script = createApplicationEnvironmentScript(
      makeEnv({ buildFingerprint: 'abc123' })
    );
    expect(script).toContain(
      'window.__BUILD_FINGERPRINT__ = window.app.buildFingerprint;'
    );
  });

  it('reads the fingerprint off window.app rather than interpolating it twice', () => {
    const script = createApplicationEnvironmentScript(
      makeEnv({ buildFingerprint: 'abc123' })
    );
    // The literal appears once, inside the serialized object.
    expect(script.match(/abc123/g)).toHaveLength(1);
  });

  it('escapes a fingerprint that would otherwise close the script tag', () => {
    const script = createApplicationEnvironmentScript(
      makeEnv({ buildFingerprint: '</script><script>alert(1)' })
    );
    expect(script).not.toContain('</script>');
  });

  it('is deterministic for the same environment', () => {
    const env = makeEnv({ buildFingerprint: 'abc123' });
    expect(createApplicationEnvironmentScript(env)).toEqual(
      createApplicationEnvironmentScript(env)
    );
  });
});
