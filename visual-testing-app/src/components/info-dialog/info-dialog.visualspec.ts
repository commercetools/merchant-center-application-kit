import { percySnapshot } from '@percy/puppeteer';
import { HOST } from '../../constants';

describe(`InfoDialog`, () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/info-dialog`);
  });

  it('Default', async () => {
    await expect(page).toMatch('InfoDialog');
    await percySnapshot(page, `InfoDialog`);
  });
});
