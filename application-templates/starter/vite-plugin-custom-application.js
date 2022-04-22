import { processConfig } from '@commercetools-frontend/application-config';

const customApplicationConfigPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      process.env.NODE_ENV = 'development';
      process.env.CTP_INITIAL_PROJECT_KEY = 'almond-40';

      const { env } = processConfig();

      return html.replace('__APPLICATION_ENVIRONMENT__', JSON.stringify(env));
    },
  };
};

export default customApplicationConfigPlugin;
