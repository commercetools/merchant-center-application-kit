import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe(`CustomFormDetailPage`, () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/custom-form-detail-page`);
  });

  it('Default', async () => {
    await expect(page).toMatch('CustomFormDetailPage');
    await percySnapshot(page, `CustomFormDetailPage`);
  });
});
