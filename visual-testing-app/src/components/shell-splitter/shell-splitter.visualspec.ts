import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('ShellSplitter', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/shell-splitter`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/ShellSplitter');
    await percySnapshot(page, 'ShellSplitter', {
      widths: [1024, 1600],
    });
  });
});
