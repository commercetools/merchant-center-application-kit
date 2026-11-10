import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type { TCliTaskOptions } from '../types';
import updatePackageJson from './update-package-json';

// A real temporary directory rather than a mocked `node:fs`: the task reads
// and rewrites `package.json` in place, and the assertions are about the file
// it leaves behind, not about how it accessed it.
let projectDirectoryPath: string;

const writeTemplatePackageJson = (version: string) => {
  fs.writeFileSync(
    path.join(projectDirectoryPath, 'package.json'),
    JSON.stringify({
      name: 'merchant-center-application-template-starter',
      version,
      dependencies: {
        '@commercetools-frontend/application-shell': 'workspace:^',
        '@commercetools-frontend/constants': 'workspace:*',
        '@commercetools-frontend/i18n': 'workspace:~',
        react: '19.1.0',
      },
      devDependencies: {},
      scripts: { 'start:prod:local': 'yarn build && yarn serve' },
    })
  );
};

const runTask = () => {
  const options = {
    projectDirectoryName: 'my-app',
    projectDirectoryPath,
    clonedRepositoryPath: projectDirectoryPath,
    packageManager: 'pnpm',
  } as TCliTaskOptions;
  const { task } = updatePackageJson(options);
  return (task as () => void)();
};

const readGeneratedPackageJson = () =>
  JSON.parse(
    fs.readFileSync(path.join(projectDirectoryPath, 'package.json'), 'utf8')
  );

beforeEach(() => {
  projectDirectoryPath = fs.mkdtempSync(
    path.join(os.tmpdir(), 'create-mc-app-update-package-json-')
  );
});

afterEach(() => {
  fs.rmSync(projectDirectoryPath, { recursive: true, force: true });
});

describe('updatePackageJson', () => {
  it('should rewrite workspace specs with the version of the cloned template', () => {
    writeTemplatePackageJson('27.10.0');

    runTask();

    const generated = readGeneratedPackageJson();
    expect(generated.version).toBe('1.0.0');
    expect(generated.dependencies).toEqual({
      '@commercetools-frontend/application-shell': '^27.10.0',
      '@commercetools-frontend/constants': '27.10.0',
      '@commercetools-frontend/i18n': '~27.10.0',
      react: '19.1.0',
    });
  });

  it('should throw when the cloned template has no valid version', () => {
    writeTemplatePackageJson('not-a-version');

    expect(runTask).toThrow(
      'Unable to resolve "workspace:" dependencies: the template\'s package.json has no valid version (got "not-a-version").'
    );
  });
});
