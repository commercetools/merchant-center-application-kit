import { getIconColor } from './navbar';

describe.each`
  isActive | expectedTokenColor
  ${true}  | ${'primary40'}
  ${false} | ${'surface'}
`('when isActive=$isActive', ({ isActive, expectedTokenColor }) => {
  it(`should use color token ${expectedTokenColor}`, () => {
    expect(getIconColor(isActive)).toBe(expectedTokenColor);
  });
});
