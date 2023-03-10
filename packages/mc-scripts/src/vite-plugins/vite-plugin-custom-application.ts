import type { Plugin, Connect } from 'vite';
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
        // as it's generated and maintained by the Custom Application CLI.
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
          createMcDevAuthenticationMiddleware(
            applicationConfig
          ) as Connect.NextHandleFunction
        );
      };
    },
    /**
     * @type {import('vite').IndexHtmlTransformHook}
     */
    transformIndexHtml(rawHtml, _ctx) {
      const compiledHeaders = processHeaders(applicationConfig);
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
