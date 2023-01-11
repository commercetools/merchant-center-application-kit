import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('PageContentContainerFull', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/page-content-container-full`);
  });

  it('Default', async () => {
    await expect(page).toMatch('Page content container full width');
    await percySnapshot(page, 'PageContentContainerFull');
  });
});
