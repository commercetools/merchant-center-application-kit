import type { ApplicationRuntimeConfig } from '@commercetools-frontend/application-config';
// https://babeljs.io/blog/2017/09/11/zero-config-with-babel-macros
import htmlScripts from /* preval */ './load-html-scripts';
// https://babeljs.io/blog/2017/09/11/zero-config-with-babel-macros
import htmlStyles from /* preval */ './load-html-styles';
import sanitizeAppEnvironment from './utils/sanitize-app-environment';

type TReplaceHtmlPlaceholdersOptions = {
  env: ApplicationRuntimeConfig['env'];
  headers: Record<string, string | undefined>;
};

const trimTrailingSlash = (value: string) => value.replace(/\/$/, '');

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
      new RegExp('__LOADING_SCREEN_JS__', 'g'),
      `<script>${htmlScripts.loadingScreen}</script>`
    )
    .replace(
      new RegExp('__LOADING_SCREEN_CSS__', 'g'),
      `<style>${htmlStyles.loadingScreen}</style>`
    );

export default replaceHtmlPlaceholders;
