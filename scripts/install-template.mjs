import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { findRootSync } from '@manypkg/find-root';
import shelljs from 'shelljs';

const applicationName = 'my-starter-app';
const workspaceRoot = findRootSync(process.cwd());
const binaryPath = path.join(
  workspaceRoot.rootDir,
  'packages/create-mc-app/bin/cli.js'
);
const sandboxPath = path.join(
  workspaceRoot.rootDir,
  'sandbox-installation-template'
);
const applicationPath = path.join(sandboxPath, applicationName);

const templateName = process.env.TEMPLATE_NAME;
if (!templateName) {
  throw new Error('Missing required environment variable "TEMPLATE_NAME"');
}
const applicationType = process.env.APPLICATION_TYPE;
if (!applicationType) {
  throw new Error(
    'Missing required environment variable "APPLICATION_TYPE" (either "custom-application" or "custom-view")'
  );
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

console.log(`Ensure the sandbox "${sandboxPath}" folder exists.`);
fs.mkdirSync(sandboxPath, { recursive: true });

console.log(
  `Bootstrapping the application "${applicationName}" using the template "${templateName}" (branch "${branchName}").`
);
const createAppCmdResult = shelljs.exec(
  [
    binaryPath,
    applicationName,
    `--template=${templateName}`,
    `--template-version=${branchName}`,
    `--appliation-type=${applicationType}`,
    `--initial-project-key=${initialProjectKey}`,
    `--yes`,
    '--skip-install',
  ].join(' '),
  { cwd: sandboxPath }
);
if (createAppCmdResult.code > 0) {
  console.error(createAppCmdResult.stderr || createAppCmdResult.stdout);
  throw new Error('Command "create-mc-app" failed.');
}

console.log('Running assertions on package.json...');
const applicationPkgJsonRaw = fs.readFileSync(
  path.join(applicationPath, 'package.json'),
  {
    encoding: 'utf-8',
  }
);
const applicationPkgJson = JSON.parse(applicationPkgJsonRaw);

console.log('==> Assert application name');
assert.strictEqual(applicationPkgJson.name, applicationName);
console.log('==> Assert application version');
assert.strictEqual(applicationPkgJson.version, '1.0.0');
console.log('==> Assert dependency versions to not use "workspace:" protocol');
assert.doesNotMatch(applicationPkgJsonRaw, /workspace:/);
