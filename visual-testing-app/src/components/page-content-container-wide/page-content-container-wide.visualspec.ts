import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('PageContentContainerWide', () => {
  it('Single column', async () => {
    await page.goto(`${HOST}/page-content-container-wide/single-column`);
    await expect(page).toMatch('Page content container wide');
    await percySnapshot(page, 'PageContentContainerWide_singleColumn');
  });
  it('Single column with several children', async () => {
    await page.goto(
      `${HOST}/page-content-container-wide/single-column-with-several-children`
    );
    await expect(page).toMatch('Page content container wide');
    await percySnapshot(
      page,
      'PageContentContainerWide_singleColumnSeveralChildren'
    );
  });
  it('Two columns half big gap', async () => {
    await page.goto(`${HOST}/page-content-container-wide/two-columns-half`);
    await expect(page).toMatch('Page content container wide');
    await percySnapshot(page, 'PageContentContainerWide_twoColumnsHalfBigGap');
  });
  it('Two columns half small gap', async () => {
    await page.goto(
      `${HOST}/page-content-container-wide/two-columns-half-small-gap`
    );
    await expect(page).toMatch('Page content container wide');
    await percySnapshot(
      page,
      'PageContentContainerWide_twoColumnsHalfSmallGap'
    );
  });
  it('Two columns two thirds big gap', async () => {
    await page.goto(
      `${HOST}/page-content-container-wide/two-columns-two-thirds`
    );
    await expect(page).toMatch('Page content container wide');
    await percySnapshot(
      page,
      'PageContentContainerWide_twoColumnsTwoThirdsBigGap'
    );
  });
  it('Two columns two thirds small gap', async () => {
    await page.goto(
      `${HOST}/page-content-container-wide/two-columns-two-thirds-small-gap`
    );
    await expect(page).toMatch('Page content container wide');
    await percySnapshot(
      page,
      'PageContentContainerWide_twoColumnsTwoThirdsSmallGap'
    );
  });
});
