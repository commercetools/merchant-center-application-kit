import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('InfoMainPage', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/info-main-page`);
  });

  it('Default', async () => {
    await expect(page).toMatch('InfoMainPage');
    await percySnapshot(page, 'InfoMainPage');
  });
});
