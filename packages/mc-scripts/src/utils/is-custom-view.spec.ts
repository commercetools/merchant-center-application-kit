import { getConfigPath } from '@commercetools-frontend/application-config';
import isCustomView from './is-custom-view';

jest.mock('@commercetools-frontend/application-config', () => ({
  getConfigPath: jest.fn(),
}));

const mockedGetConfigPath = getConfigPath as jest.MockedFunction<
  typeof getConfigPath
>;

describe('isCustomView', () => {
  beforeEach(() => {
    mockedGetConfigPath.mockReset();
  });

  it('is true for a Custom View config', async () => {
    mockedGetConfigPath.mockResolvedValue('/app/custom-view-config.ts');
    await expect(isCustomView()).resolves.toBe(true);
  });

  it('is false for a Custom Application config', async () => {
    mockedGetConfigPath.mockResolvedValue('/app/custom-application-config.ts');
    await expect(isCustomView()).resolves.toBe(false);
  });

  it('recognises every extension cosmiconfig searches for', async () => {
    for (const ext of ['js', 'cjs', 'mjs', 'ts']) {
      mockedGetConfigPath.mockResolvedValue(`/app/custom-view-config.${ext}`);
      await expect(isCustomView()).resolves.toBe(true);
    }
  });

  // Fail open: a detection gap must not strip an optimisation from a real
  // Custom Application, so anything unexpected answers "not a Custom View".
  it('is false when no configuration file is found', async () => {
    mockedGetConfigPath.mockRejectedValue(
      new Error('Missing or invalid configuration file.')
    );
    await expect(isCustomView()).resolves.toBe(false);
  });

  it('is false when the path cannot be resolved', async () => {
    mockedGetConfigPath.mockResolvedValue(
      undefined as unknown as Awaited<ReturnType<typeof getConfigPath>>
    );
    await expect(isCustomView()).resolves.toBe(false);
  });
});
