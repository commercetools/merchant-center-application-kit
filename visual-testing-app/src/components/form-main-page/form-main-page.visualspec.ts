import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('FormMainPage', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/form-main-page`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/FormMainPage');
    await percySnapshot(page, 'FormMainPage');
  });
});
