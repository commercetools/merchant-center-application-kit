import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('InfoDetailPage', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/info-detail-page`);
  });

  it('Default', async () => {
    await expect(page).toMatch('InfoDetailPage');
    await percySnapshot(page, 'InfoDetailPage');
  });
});
