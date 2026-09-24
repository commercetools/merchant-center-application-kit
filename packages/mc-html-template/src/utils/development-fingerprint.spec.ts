import createApplicationEnvironmentScript from './create-application-environment-script';
import { DEVELOPMENT_FINGERPRINT } from './create-fingerprint';

describe('DEVELOPMENT_FINGERPRINT', () => {
  it('is non-empty, so a dev-served page never publishes undefined', () => {
    expect(DEVELOPMENT_FINGERPRINT).toEqual(expect.any(String));
    expect(DEVELOPMENT_FINGERPRINT.length).toBeGreaterThan(0);
  });

  it('is URL-safe, since consumers put it in a localStorage key', () => {
    expect(DEVELOPMENT_FINGERPRINT).toMatch(/^[A-Za-z0-9_-]+$/);
  });

  it('makes the inline script publish the global', () => {
    const script = createApplicationEnvironmentScript({
      buildFingerprint: DEVELOPMENT_FINGERPRINT,
    } as Parameters<typeof createApplicationEnvironmentScript>[0]);

    expect(script).toContain(
      'window.__BUILD_FINGERPRINT__ = window.app.buildFingerprint;'
    );
    expect(script).not.toContain('undefined');
  });
});
