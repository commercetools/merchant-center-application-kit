import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import shelljs from 'shelljs';
import { findRootSync } from '@manypkg/find-root';

const applicationName = 'my-starter-app';
const workspaceRoot = findRootSync(process.cwd());
const binaryPath = path.join(
  workspaceRoot,
  'packages/create-mc-app/bin/cli.js'
);
const sandboxPath = path.join(workspaceRoot, 'sandbox-installation-template');
const applicationPath = path.join(sandboxPath, applicationName);

const templateName = process.env.TEMPLATE_NAME;
if (!templateName) {
  throw new Error('Missing required environment variable "TEMPLATE_NAME"');
}
const initialProjectKey = process.env.CTP_INITIAL_PROJECT_KEY;
if (!initialProjectKey) {
  throw new Error(
    'Missing required environment variable "CTP_INITIAL_PROJECT_KEY"'
  );
}

const branchName =
  process.env.GITHUB_EVENT_NAME === 'pull_request'
    ? process.env.GITHUB_HEAD_REF
    : 'main';

console.log(
  `Bootstrapping the application ${applicationName} using the template ${templateName}.`
);
shelljs.exec(
  [
    binaryPath,
    applicationName,
    `--template=${templateName}`,
    `--template-version=${branchName}`,
    `--initial-project-key=${initialProjectKey}`,
    `--yes`,
    '--skip-install',
  ].join(' '),
  { cwd: sandboxPath }
);

console.log('Running assertions on package.json...');
const applicationPkgJsonRaw = fs.readFileSync(
  path.join(applicationPath, 'package.json'),
  {
    encoding: 'utf-8',
  }
);
const applicationPkgJson = JSON.parse(applicationPkgJsonRaw);

assert.strictEqual(applicationPkgJson.name, applicationName);
assert.strictEqual(applicationPkgJson.version, '1.0.0');
assert.doesNotMatch(applicationPkgJsonRaw, /workspace:/);
