import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('Application icons', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/application-icons`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/Application icons');
    await percySnapshot(page, 'Application icons');
  });
});
