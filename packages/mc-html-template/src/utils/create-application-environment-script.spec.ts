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

  it('terminates the statement, so the next one cannot run on into it', () => {
    expect(createApplicationEnvironmentScript(makeEnv())).toMatch(/;$/);
  });

  // The output is injected into an inline `<script>` and its bytes are what
  // the CSP hash is computed over, so a value that could close the tag has to
  // come back escaped rather than breaking out of it.
  it('escapes a value that would otherwise close the script tag', () => {
    const script = createApplicationEnvironmentScript(
      makeEnv({ applicationName: '</script><script>alert(1)' })
    );

    expect(script).not.toContain('</script>');
    expect(script).toContain('alert(1)');
  });
});
