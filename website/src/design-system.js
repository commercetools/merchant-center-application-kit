import { customProperties } from '@commercetools-frontend/ui-kit';

const rootFontSizeNumber = 16;
const pageWidth = '770px';
const navbarWidth = '224px';

export const pxToRem = px => {
  const pxNumber = px.replace(/([0-9]+)px$/, '$1');
  const remNumber = parseInt(pxNumber, 10) / rootFontSizeNumber;
  return `${remNumber}rem`;
};

export const colors = {
  light: {
    // Used to give the website a unique tone (e.g. page titles, navigation links)
    primary: customProperties.colorInfo,
    // Surfaces are used for backgrounds
    surfacePrimary: customProperties.colorSurface,
    surfaceSecondary1: customProperties.colorNeutral95,
    surfaceSecondary2: customProperties.colorNeutral90,
    surfaceSecondary3: customProperties.colorNeutral60,
    surfaceCode: customProperties.colorAccent,
    surfaceCodeHighlight: customProperties.colorAccent40,
    surfaceInfo: customProperties.colorInfo95,
    surfaceQuote: customProperties.colorAccent98,
    // Different tones of text
    textPrimary: customProperties.colorSolid,
    textSecondary: '#666666',
    textFaded: customProperties.colorNeutral60,
    textCode: customProperties.colorError,
    textInfo: customProperties.colorInfo,
    // Different tones of border colors
    borderPrimary: customProperties.colorNeutral90,
    borderHighlight: customProperties.colorPrimary,
    borderInfo: customProperties.colorInfo,
    // Links
    link: customProperties.colorPrimary25,
    linkHover: customProperties.colorPrimary,
  },
};

const breakpoints = {
  // content page + padding left/right
  content: `calc(${pxToRem(pageWidth)} + ${pxToRem('32px')} * 2)`,
  // content page + padding left/right + page navigation
  contentAndPageNavigation: `calc(${pxToRem(pageWidth)} + ${pxToRem(
    '32px'
  )} * 2 + ${pxToRem(navbarWidth)})`,
  // content page + padding left/right + page navigation + main navigation
  contentAndBothNavigations: `calc(${pxToRem(pageWidth)} + ${pxToRem(
    '32px'
  )} * 2 + ${pxToRem(navbarWidth)} * 2)`,
};

export const dimensions = {
  heights: {
    header: pxToRem('48px'),
  },
  widths: {
    pageContent: pxToRem(pageWidth),
    pageNavigation: pxToRem(navbarWidth),
    marketingContent: pxToRem('1168px'),
  },
  viewports: {
    mobile: `max-width: ${breakpoints.content}`,
    tablet: `min-width: ${breakpoints.content}`,
    largeTablet: `min-width: ${breakpoints.contentAndPageNavigation}`,
    desktop: `min-width: ${breakpoints.contentAndBothNavigations}`,
  },
  spacings: {
    xs: pxToRem('4px'),
    s: pxToRem('8px'),
    m: pxToRem('16px'),
    l: pxToRem('24px'),
    xl: pxToRem('32px'),
    xxl: pxToRem('40px'),
    xxxl: pxToRem('48px'),
    xxxxl: pxToRem('56px'),
  },
};

export const typography = {
  fontFamilies: {
    primary: "'Roboto', sans-serif",
    code: "'Roboto Mono', monospace",
  },

  rootFontSize: `${rootFontSizeNumber}px`,

  fontSizes: {
    h1: pxToRem('48px'),
    h2: pxToRem('26px'),
    h3: pxToRem('24px'),
    h4: pxToRem('20px'),
    h5: pxToRem('18px'),
    h6: pxToRem('16px'),
    body: pxToRem('16px'),
    small: pxToRem('14px'),
  },

  fontWeights: {
    regular: '400',
    medium: '500',
    bold: '700',
  },
};
