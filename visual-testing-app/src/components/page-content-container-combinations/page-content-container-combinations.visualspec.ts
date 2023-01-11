import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

const baseUrlPath = `${HOST}/page-content-container-combinations`;

describe('PageContentContainerCombinations', () => {
  it('Combination A', async () => {
    await page.goto(`${baseUrlPath}/comb-a`);
    await expect(page).toMatch('Combination content');
    await percySnapshot(page, 'PageContentContainerCombination_combinationA');
  });

  it('Combination B', async () => {
    await page.goto(`${baseUrlPath}/comb-b`);
    await expect(page).toMatch('Combination content');
    await percySnapshot(page, 'PageContentContainerCombination_combinationB');
  });
  it('Combination C', async () => {
    await page.goto(`${baseUrlPath}/comb-c`);
    await expect(page).toMatch('Combination content');
    await percySnapshot(page, 'PageContentContainerCombination_combinationC');
  });
  it('Combination D', async () => {
    await page.goto(`${baseUrlPath}/comb-d`);
    await expect(page).toMatch('Combination content');
    await percySnapshot(page, 'PageContentContainerCombination_combinationD');
  });
  it('Combination E', async () => {
    await page.goto(`${baseUrlPath}/comb-e`);
    await expect(page).toMatch('Combination content');
    await percySnapshot(page, 'PageContentContainerCombination_combinationE');
  });
  it('Combination F', async () => {
    await page.goto(`${baseUrlPath}/comb-f`);
    await expect(page).toMatch('Combination content');
    await percySnapshot(page, 'PageContentContainerCombination_combinationF');
  });
});
