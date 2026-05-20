#!/usr/bin/env node

/**
 * Package shape check for the Merchant Center Application Kit.
 *
 * For each publishable package: runs `pnpm pack` to produce a tarball that
 * matches what npm would publish, then runs two linters against it:
 *
 *   - @arethetypeswrong/cli (attw): validates types resolve correctly across
 *     module-resolution modes (node10, node16, bundler) — catches `exports`
 *     map mistakes and ESM/CJS interop foot-guns.
 *   - publint: validates package.json correctness against the npm spec.
 *
 * Packages are checked in parallel; per-package output is buffered and printed
 * in declared order after all finish so the log stays readable. While
 * REPORT_ONLY is true the script always exits 0 — findings are surfaced but do
 * not gate merges. Flip it to false once the baseline reaches zero findings.
 *
 * Usage:
 *   node scripts/check-package-shape.mjs
 *
 * Requires the target packages to be built first (`pnpm build`).
 */

import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');

// Surface findings without failing CI. Flip to `false` once the baseline
// reaches zero so this gate starts blocking merges.
const REPORT_ONLY = true;

async function discoverPackages() {
  const { code, stdout, stderr } = await runCommand(
    'pnpm',
    ['m', 'ls', '--json', '--depth', '-1'],
    { cwd: ROOT }
  );
  if (code !== 0) {
    throw new Error(`pnpm m ls exited ${code}\n${stderr}`);
  }
  return JSON.parse(stdout)
    .filter((w) => w.private !== true)
    .map((w) => ({ name: w.name, dir: w.path }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

const DIM = '\x1b[2m';
const BOLD = '\x1b[1m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';

function header(text) {
  const bar = '─'.repeat(Math.max(0, 72 - text.length - 2));
  return `\n${BOLD}${CYAN}${text}${RESET} ${DIM}${bar}${RESET}\n`;
}

function runCommand(cmd, args, { cwd }) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => (stdout += chunk.toString()));
    child.stderr.on('data', (chunk) => (stderr += chunk.toString()));
    child.on('error', reject);
    child.on('close', (code) => resolve({ code, stdout, stderr }));
  });
}

async function packTarball(pkg, destDir) {
  const { code, stdout, stderr } = await runCommand(
    'pnpm',
    ['pack', '--pack-destination', destDir, '--json'],
    { cwd: pkg.dir }
  );
  if (code !== 0) {
    throw new Error(`pnpm pack exited ${code}\n${stderr}`);
  }
  // pnpm pack --json's `filename` is an absolute path to the tarball.
  return JSON.parse(stdout).filename;
}

async function runTool(label, bin, args, log) {
  log(`${DIM}$ ${bin} ${args.join(' ')}${RESET}\n`);
  const { code, stdout, stderr } = await runCommand(
    'pnpm',
    ['exec', bin, ...args],
    { cwd: ROOT }
  );
  if (stdout) log(stdout);
  if (stderr) log(stderr);
  const passed = code === 0;
  log(
    passed
      ? `${GREEN}✓ ${label} passed${RESET}\n`
      : `${YELLOW}⚠ ${label} reported findings (exit ${code})${RESET}\n`
  );
  return passed;
}

async function checkPackage(pkg, workDir) {
  const buffer = [];
  const log = (text) => buffer.push(text);
  const failures = [];

  log(header(pkg.name));

  let tarball;
  try {
    tarball = await packTarball(pkg, workDir);
    log(`${DIM}packed: ${tarball}${RESET}\n\n`);
  } catch (err) {
    log(`${RED}✗ Failed to pack ${pkg.name}${RESET}\n`);
    log(`${err.message}\n`);
    failures.push({ pkg: pkg.name, tool: 'pack' });
    return { buffer, failures };
  }

  const attwOk = await runTool('attw', 'attw', [tarball], log);
  const publintOk = await runTool('publint', 'publint', [tarball], log);

  if (!attwOk) failures.push({ pkg: pkg.name, tool: 'attw' });
  if (!publintOk) failures.push({ pkg: pkg.name, tool: 'publint' });

  return { buffer, failures };
}

async function main() {
  const packages = await discoverPackages();
  process.stdout.write(
    `${DIM}Discovered ${packages.length} publishable workspace(s).${RESET}\n`
  );
  const workDir = mkdtempSync(join(tmpdir(), 'app-kit-pkg-shape-'));
  const failures = [];

  try {
    const results = await Promise.all(
      packages.map((pkg) => checkPackage(pkg, workDir))
    );
    for (const { buffer, failures: pkgFailures } of results) {
      for (const chunk of buffer) process.stdout.write(chunk);
      failures.push(...pkgFailures);
    }
  } finally {
    rmSync(workDir, { recursive: true, force: true });
  }

  process.stdout.write(header('Summary'));
  if (failures.length === 0) {
    console.log(`${GREEN}All packages passed both checks.${RESET}`);
    process.exit(0);
  }

  console.log(`${YELLOW}Findings:${RESET}`);
  for (const f of failures) {
    console.log(`  - ${f.pkg}: ${f.tool}`);
  }

  if (REPORT_ONLY) {
    console.log(
      `\n${DIM}REPORT_ONLY mode: exiting 0 despite ${failures.length} finding(s). Flip REPORT_ONLY to false to fail CI on findings.${RESET}`
    );
    process.exit(0);
  }
  process.exit(1);
}

main();
