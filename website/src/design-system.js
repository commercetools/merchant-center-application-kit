import { customProperties } from '@commercetools-frontend/ui-kit';

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

export const dimensions = {
  heights: {
    header: '48px',
  },
  widths: {
    pageContent: '770px',
    pageNavigation: '224px',
  },
  viewports: {
    mobile: 'max-width: 40em',
    tablet: 'min-width: 40em',
    largeTablet: 'min-width: 64em',
    desktop: 'min-width: 80em',
  },
  spacings: {
    xs: '4px',
    s: '8px',
    m: '16px',
    l: '24px',
    xl: '32px',
    xxl: '40px',
    xxxl: '48px',
    xxxxl: '56px',
  },
};

export const typography = {
  fontFamilies: {
    primary: "'Roboto', sans-serif",
    code: "'Roboto Mono', monospace",
  },

  fontSizes: {
    h1: '3rem',
    h2: '1.63rem',
    h3: '1.5rem',
    h4: '1.25rem',
    h5: '1.13rem',
    h6: '1rem',
    body: '1rem',
    small: '0.88rem',
  },

  fontWeights: {
    regular: '400',
    medium: '500',
    bold: '700',
  },
};
