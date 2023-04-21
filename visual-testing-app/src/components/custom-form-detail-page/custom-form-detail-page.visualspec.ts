import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe(`CustomFormDetailPage`, () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/custom-form-detail-page`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/CustomFormDetailPage');
    await percySnapshot(page, `CustomFormDetailPage`);
  });
});
