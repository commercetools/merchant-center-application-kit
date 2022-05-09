import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('FormDetailPage', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/form-detail-page`);
  });

  it('Default', async () => {
    await expect(page).toMatch('FormDetailPage');
    await percySnapshot(page, 'FormDetailPage');
  });
});
