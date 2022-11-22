import type { ApplicationRuntimeConfig } from '@commercetools-frontend/application-config';
import sanitizeAppEnvironment from './utils/sanitize-app-environment';
// https://babeljs.io/blog/2017/09/11/zero-config-with-babel-macros
import htmlScripts from /* preval */ './load-html-scripts';
// https://babeljs.io/blog/2017/09/11/zero-config-with-babel-macros
import htmlStyles from /* preval */ './load-html-styles';

type TReplaceHtmlPlaceholdersOptions = {
  env: ApplicationRuntimeConfig['env'];
  headers: Record<string, string | undefined>;
};

const trimTrailingSlash = (value: string) => value.replace(/\/$/, '');

const getGtmTrackingScript = (gtmId?: string) => {
  if (!gtmId) return '';
  const url = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  return `<script async fetchpriority="low" type="text/javascript" src="${url}" referrerpolicy="no-referrer"></script>`;
};

const replaceHtmlPlaceholders = (
  indexHtmlContent: string,
  options: TReplaceHtmlPlaceholdersOptions
) =>
  indexHtmlContent
    .replace(
      new RegExp('__CSP__', 'g'),
      options.headers?.['Content-Security-Policy'] ?? ''
    )
    .replace(
      new RegExp('__CDN_URL__', 'g'),
      options.env.cdnUrl
        ? // Ensure there is a trailing slash
          `${trimTrailingSlash(options.env.cdnUrl)}/`
        : ''
    )
    .replace(
      new RegExp('__MC_API_URL__', 'g'),
      trimTrailingSlash(options.env.mcApiUrl)
    )
    .replace(
      new RegExp('__APPLICATION_ENVIRONMENT__', 'g'),
      sanitizeAppEnvironment(options.env)
    )
    .replace(
      new RegExp('__GTM_SCRIPT__', 'g'),
      getGtmTrackingScript(options.env.trackingGtm)
    )
    .replace(
      new RegExp('__DATALAYER_JS__', 'g'),
      `<script>${htmlScripts.dataLayer}</script>`
    )
    .replace(
      new RegExp('__LOADING_SCREEN_JS__', 'g'),
      `<script>${htmlScripts.loadingScreen}</script>`
    )
    .replace(
      new RegExp('__LOADING_SCREEN_CSS__', 'g'),
      `<style>${htmlStyles.loadingScreen}</style>`
    );

export default replaceHtmlPlaceholders;
