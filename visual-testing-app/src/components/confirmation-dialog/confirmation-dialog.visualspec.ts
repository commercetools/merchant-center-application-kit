import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('ConfirmationDialog', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/confirmation-dialog`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/ConfirmationDialog');
    await percySnapshot(page, 'ConfirmationDialog');
  });
});
