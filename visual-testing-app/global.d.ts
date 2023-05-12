import type { Browser, Page, BrowserContext } from 'puppeteer';

declare global {
  const browser: Browser;
  const context: BrowserContext;
  const page: Page;
}
