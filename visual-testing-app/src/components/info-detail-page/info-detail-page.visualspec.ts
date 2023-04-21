import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('InfoDetailPage', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/info-detail-page`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/InfoDetailPage');
    await percySnapshot(page, 'InfoDetailPage');
  });
});
