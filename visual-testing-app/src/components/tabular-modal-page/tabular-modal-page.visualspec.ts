import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('TabularModalPage', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/tabular-modal-page`);
  });

  it('Default', async () => {
    await expect(page).toMatch('TabularModalPage');
    await percySnapshot(page, 'TabularModalPage');
  });
});
