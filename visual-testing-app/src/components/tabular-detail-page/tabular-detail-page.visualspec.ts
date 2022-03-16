import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('TabularMainPage', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/tabular-detail-page`);
  });

  it('Default', async () => {
    await expect(page).toMatch('TabularDetailPage');
    await percySnapshot(page, 'TabularDetailPage');
  });
});
