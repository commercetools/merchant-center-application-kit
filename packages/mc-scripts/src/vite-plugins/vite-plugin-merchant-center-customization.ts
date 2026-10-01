import type { Plugin } from 'vite';
import type { ApplicationRuntimeConfig } from '@commercetools-frontend/application-config';
import { createMcDevAuthenticationMiddleware } from '@commercetools-frontend/mc-dev-authentication';
import {
  replaceHtmlPlaceholders,
  processHeaders,
} from '@commercetools-frontend/mc-html-template';

const vitePluginCustomApplication = (
  applicationConfig: ApplicationRuntimeConfig
): Plugin => {
  return {
    name: 'custom-application',
    configureServer(server) {
      return () => {
        // Users do not need to have/maintain the `index.html` (as expected by Vite)
        // as it's generated and maintained by the Merchant Center customization CLI.
        // Therefore, the generated `index.html` (template) is written into the `/public`
        // folder so that it's gitignored.
        // As a result, we need to make sure to point the URI path to the correct location.
        server.middlewares.use((req, _res, next) => {
          if (req.url === '/index.html') {
            req.url = '/public/index.html';
          }
          next();
        });

        // Handle auth routes for internal local development.
        server.middlewares.use(
          createMcDevAuthenticationMiddleware(applicationConfig)
        );
      };
    },
    /**
     * @type {import('vite').IndexHtmlTransformHook}
     */
    transformIndexHtml(rawHtml, _ctx) {
      const enhancedLocalEnv = Object.assign(
        {},
        applicationConfig.env,
        // Now that the app config is defined as a `env.json`, when we start the FE app
        // to point to the local backend API by passing the `MC_API_URL` env does not
        // work anymore). To make it work again, we can override the `env.json` config
        // with the env variable before injecting the values into the index.html.
        // NOTE: this is only necessary for development.
        process.env.MC_API_URL
          ? {
              mcApiUrl: process.env.MC_API_URL,
            }
          : {}
      );

      // Hash the env that actually gets injected. Hashing `applicationConfig`
      // instead put a `script-src` entry in the CSP for a script that was
      // never served whenever `MC_API_URL` overrode `mcApiUrl`, and the
      // browser then blocked the only script defining `window.app`.
      //
      // Only reachable outside `env: 'development'`, where `processHeaders`
      // emits real hashes rather than `'unsafe-inline'` — in practice the
      // prod-local dev server.
      const compiledHeaders = processHeaders({
        ...applicationConfig,
        env: enhancedLocalEnv,
      });

      // Resolve the placeholders of the `index.html` (template) file, before serving it.
      const html = replaceHtmlPlaceholders(rawHtml, {
        env: enhancedLocalEnv,
        headers: compiledHeaders,
      });
      return html;
    },
  };
};

export default vitePluginCustomApplication;
