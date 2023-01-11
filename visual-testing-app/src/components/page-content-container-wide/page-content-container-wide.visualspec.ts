import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('PageContentContainerWide', () => {
  it('Single column', async () => {
    await page.goto(`${HOST}/page-content-container-wide/single-column`);
    await expect(page).toMatch('Page content container wide');
    await percySnapshot(page, 'PageContentContainerWide_singleColumn');
  });
  it('Two columns half small gap', async () => {
    await page.goto(`${HOST}/page-content-container-wide/two-columns-half`);
    await expect(page).toMatch('Page content container wide');
    await percySnapshot(
      page,
      'PageContentContainerWide_twoColumnsHalfSmallGap'
    );
  });
  it('Two columns half big gap', async () => {
    await page.goto(
      `${HOST}/page-content-container-wide/two-columns-half-big-gap`
    );
    await expect(page).toMatch('Page content container wide');
    await percySnapshot(page, 'PageContentContainerWide_twoColumnsHalfBigGap');
  });
  it('Two columns two thirds small gap', async () => {
    await page.goto(
      `${HOST}/page-content-container-wide/two-columns-two-thirds`
    );
    await expect(page).toMatch('Page content container wide');
    await percySnapshot(
      page,
      'PageContentContainerWide_twoColumnsTwoThirdsSmallGap'
    );
  });
  it('Two columns two thirds big gap', async () => {
    await page.goto(
      `${HOST}/page-content-container-wide/two-columns-two-thirds-big-gap`
    );
    await expect(page).toMatch('Page content container wide');
    await percySnapshot(
      page,
      'PageContentContainerWide_twoColumnsTwoThirdsBigGap'
    );
  });
});
