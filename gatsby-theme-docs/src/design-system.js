const rootFontSizeNumber = 16;
const pageWidth = '770px';
const navbarWidth = '224px';

export const pxToRem = px => {
  const pxNumber = px.replace(/([0-9]+)px$/, '$1');
  const remNumber = parseInt(pxNumber, 10) / rootFontSizeNumber;
  return `${remNumber}rem`;
};

const uikitColors = {
  colorInfo: '#078cdf',
  colorInfo95: 'hsl(203.05555555555554, 93.9130434783%, 95%)',
  colorSurface: '#fff',
  colorNeutral60: 'hsl(0, 0%, 60%)',
  colorNeutral90: 'hsl(0, 0%, 90%)',
  colorNeutral95: 'hsl(0, 0%, 95%)',
  colorAccent: '#213c45',
  colorAccent40: 'hsl(195, 35.2941176471%, 40%)',
  colorAccent95: 'hsl(195, 35.2941176471%, 95%)',
  colorAccent98: 'hsl(195, 35.2941176471%, 98%)',
  colorSolid: '#1a1a1a',
  colorError: '#e60050',
  colorPrimary: '#00b39e',
  colorPrimary25: 'hsl(172.9608938547486, 100%, 25%)',
};

export const colors = {
  light: {
    // Used to give the website a unique tone (e.g. page titles, navigation links)
    primary: uikitColors.colorAccent40,
    // Surfaces are used for backgrounds
    surfacePrimary: uikitColors.colorSurface,
    surfaceSecondary1: uikitColors.colorNeutral95,
    surfaceSecondary2: uikitColors.colorNeutral90,
    surfaceSecondary3: uikitColors.colorNeutral60,
    surfaceCode: uikitColors.colorAccent,
    surfaceCodeHighlight: uikitColors.colorAccent40,
    surfaceInfo: uikitColors.colorInfo95,
    surfaceQuote: uikitColors.colorAccent98,
    // Different tones of text
    textPrimary: uikitColors.colorSolid,
    textSecondary: '#666666',
    textFaded: uikitColors.colorNeutral60,
    textCode: uikitColors.colorError,
    textInfo: uikitColors.colorInfo,
    textInverted: uikitColors.colorSurface,
    // Different tones of border colors
    borderPrimary: uikitColors.colorNeutral90,
    borderHighlight: uikitColors.colorPrimary,
    borderInfo: uikitColors.colorInfo,
    // Links
    link: uikitColors.colorPrimary25,
    linkHover: uikitColors.colorPrimary,
    linkNavigation: uikitColors.colorInfo,
  },
};

export const tokens = {
  borderRadius4: '4px',
  borderRadius6: '6px',
  shadow1: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  shadow8: '0 1px 9.5px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.24)',
};

const breakpoints = {
  // content page + padding left/right
  content: `calc(
    ${pxToRem(pageWidth)} +
    ${pxToRem('32px')} * 2
  )`,
  // content page + padding left/right + page navigation
  contentAndPageNavigation: `calc(
    ${pxToRem(pageWidth)} +
    ${pxToRem('32px')} * 2 +
    ${pxToRem(navbarWidth)}
  )`,
  // content page + padding left/right + page navigation + main navigation
  contentAndBothNavigations: `calc(
    ${pxToRem(pageWidth)} +
    ${pxToRem('32px')} * 2 +
    ${pxToRem(navbarWidth)} * 2
  )`,
  // double content page + padding left/center/right + page navigation + main navigation
  doubleContentAndBothNavigations: `calc(
    ${pxToRem(pageWidth)} * 2 +
    ${pxToRem('32px')} * 3 +
    ${pxToRem(navbarWidth)} * 2
  )`,
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
    largeDesktop: `min-width: ${breakpoints.doubleContentAndBothNavigations}`,
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
    // The sizes below are only used in specific case. Do not use them regularly.
    // If necessary, ask the Design team.
    extraSmall: pxToRem('12px'),
    ultraSmall: pxToRem('10px'),
  },

  fontWeights: {
    regular: '400',
    medium: '500',
    bold: '700',
  },
};
