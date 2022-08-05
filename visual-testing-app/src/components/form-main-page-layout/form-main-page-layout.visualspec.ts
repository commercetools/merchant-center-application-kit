import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('FormMainPageLayout', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/form-main-page-layout`);
  });

  it('Default', async () => {
    await expect(page).toMatch('FormMainPageLayout');
    await percySnapshot(page, 'FormMainPageLayout');
  });
});
