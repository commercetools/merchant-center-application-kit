import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('FormDialog', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/form-dialog`);
  });

  it('Default', async () => {
    await expect(page).toMatch('FormDialog');
    await percySnapshot(page, 'FormDialog');
  });
});
