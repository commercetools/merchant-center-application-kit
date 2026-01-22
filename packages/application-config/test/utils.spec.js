import fs from 'node:fs';
import path from 'path';
import { CLOUD_IDENTIFIERS, MC_API_URLS } from '../src/constants';
import {
  mapCloudIdentifierToApiUrl,
  getUniqueValues,
  getIsProd,
  getOrThrow,
  parseJsonFile,
} from '../src/utils';

describe('mapCloudIdentifierToApiUrl', () => {
  it('should map cloud identifiers to correct API URLs', () => {
    expect(mapCloudIdentifierToApiUrl(CLOUD_IDENTIFIERS.GCP_AU)).toBe(
      MC_API_URLS[CLOUD_IDENTIFIERS.GCP_AU]
    );
    expect(mapCloudIdentifierToApiUrl(CLOUD_IDENTIFIERS.AWS_EU)).toBe(
      MC_API_URLS[CLOUD_IDENTIFIERS.AWS_EU]
    );
    // Deprecated identifiers should map to current ones
    expect(mapCloudIdentifierToApiUrl(CLOUD_IDENTIFIERS.AWS_FRA)).toBe(
      MC_API_URLS[CLOUD_IDENTIFIERS.AWS_EU]
    );
  });

  it('should throw error for unknown cloud identifier', () => {
    expect(() => mapCloudIdentifierToApiUrl('unknown-cloud')).toThrow(
      'Unknown cloud identifier "unknown-cloud"'
    );
  });
});

describe('getUniqueValues', () => {
  it('should merge arrays and remove duplicates', () => {
    expect(getUniqueValues(['a', 'b', 'c'], ['b', 'd', 'e'])).toEqual([
      'a',
      'b',
      'c',
      'd',
      'e',
    ]);
    expect(getUniqueValues(undefined, ['a', 'b'])).toEqual(['a', 'b']);
    expect(getUniqueValues(['a', 'a', 'b'], ['c', 'c'])).toEqual([
      'a',
      'b',
      'c',
    ]);
  });
});

describe('getIsProd', () => {
  it('should detect production environment', () => {
    expect(getIsProd({ NODE_ENV: 'production' })).toBe(true);
    expect(getIsProd({ NODE_ENV: 'development' })).toBe(false);
    expect(getIsProd({ MC_APP_ENV: 'staging' })).toBe(true);
  });

  it('should prioritize MC_APP_ENV over NODE_ENV', () => {
    expect(
      getIsProd({ NODE_ENV: 'production', MC_APP_ENV: 'development' })
    ).toBe(false);
    expect(getIsProd({ NODE_ENV: 'development', MC_APP_ENV: 'staging' })).toBe(
      true
    );
  });
});

describe('getOrThrow', () => {
  it('should return value when function succeeds', () => {
    expect(getOrThrow(() => 'success', 'error message')).toBe('success');
    expect(getOrThrow(() => ({ key: 'value' }), 'error')).toEqual({
      key: 'value',
    });
  });

  it('should throw custom error when function fails', () => {
    expect(() =>
      getOrThrow(() => {
        throw new Error('original error');
      }, 'custom error message')
    ).toThrow('custom error message');
  });
});

describe('parseJsonFile', () => {
  const testDir = path.join(__dirname, 'fixtures', 'json-parse-test');

  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      const files = fs.readdirSync(testDir);
      files.forEach((file) => {
        fs.unlinkSync(path.join(testDir, file));
      });
      fs.rmdirSync(testDir);
    }
  });

  it('should parse valid JSON file and handle missing files', () => {
    const testFile = path.join(testDir, 'test.json');
    const data = { key: 'value', nested: { array: [1, 2, 3] } };
    fs.writeFileSync(testFile, JSON.stringify(data));

    expect(parseJsonFile(testFile)).toEqual(data);
    expect(parseJsonFile(path.join(testDir, 'nonexistent.json'))).toEqual({});
  });

  it('should prevent path traversal attacks', () => {
    expect(() => parseJsonFile('/etc/passwd')).toThrow(
      'Access denied: File path is outside of base directory'
    );
  });
});
