import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('PageContentContainerWide', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/page-content-container-wide`);
  });

  it('Default', async () => {
    await expect(page).toMatch('PageContentContainerWide');
    await percySnapshot(page, 'PageContentContainerWide');
  });
});
