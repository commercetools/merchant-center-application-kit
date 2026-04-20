#!/usr/bin/env node
// Load a URL in a headless browser and exit non-zero if any uncaught runtime
// error fires during page evaluation. Purpose: catch chunk-level TDZ failures
// and other top-level crashes that a build-time check cannot see (e.g. the
// "aM is undefined" regression from FEC-832 when the Vite bundler emits
// circular chunk imports).
//
// Usage:
//   node scripts/smoke-test-templates.mjs <url> [--timeout=30000] [--settle=2000]
//
// Exit codes:
//   0 - page loaded with no uncaught exceptions
//   1 - one or more uncaught exceptions observed
//   2 - usage / launch / navigation failure
import puppeteer from 'puppeteer';

const args = process.argv.slice(2);
const url = args.find((a) => !a.startsWith('--'));
if (!url) {
  console.error(
    'Usage: smoke-test-templates.mjs <url> [--timeout=30000] [--settle=2000]'
  );
  process.exit(2);
}

const getFlag = (name, fallback) => {
  const match = args.find((a) => a.startsWith(`--${name}=`));
  return match ? Number(match.split('=')[1]) : fallback;
};
const navTimeoutMs = getFlag('timeout', 30_000);
const settleMs = getFlag('settle', 2_000);

const uncaught = [];

let browser;
try {
  browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
} catch (err) {
  console.error('[smoke] failed to launch browser:', err.message);
  process.exit(2);
}

try {
  const page = await browser.newPage();

  // `pageerror` fires on every uncaught exception that reaches the window.
  // That's the exact signal we want — a TDZ crash in a chunk propagates here.
  page.on('pageerror', (err) => {
    uncaught.push({
      kind: 'pageerror',
      message: err.message,
      stack: err.stack,
    });
  });

  // We intentionally do NOT fail on `console.error` calls: the MC app is
  // expected to log warnings (missing auth, missing API) when served via
  // `mc-scripts serve` without a real backend. Uncaught errors are the
  // clean signal.

  try {
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: navTimeoutMs,
    });
  } catch (err) {
    // Navigation itself failed (timeout, network). Not what we're watching
    // for, but also not OK — report and exit 2.
    console.error(`[smoke] navigation to ${url} failed:`, err.message);
    process.exit(2);
  }

  // Give top-level polyfill / init chains a beat to execute after
  // networkidle. The TDZ crash we most care about fires synchronously on
  // first chunk evaluation, but letting any late async boot run gives us
  // a little extra coverage.
  await new Promise((resolve) => setTimeout(resolve, settleMs));

  if (uncaught.length > 0) {
    console.error(
      `[smoke] ${uncaught.length} uncaught error(s) observed at ${url}:`
    );
    for (const err of uncaught) {
      console.error(`\n- ${err.message}`);
      if (err.stack) console.error(err.stack);
    }
    process.exit(1);
  }

  console.log(`[smoke] OK — no uncaught errors at ${url}`);
} finally {
  await browser.close();
}
