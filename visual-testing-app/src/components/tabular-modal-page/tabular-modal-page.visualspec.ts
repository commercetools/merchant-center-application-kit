import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('TabularModalPage', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/tabular-modal-page`, { timeout: 200 });
  });

  it('Default', async () => {
    await expect(page).toMatch('TabularModalPage');
    await percySnapshot(page, 'TabularModalPage');
  });
});
