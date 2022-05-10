import serialize from 'serialize-javascript';
import type { ApplicationRuntimeConfig } from '@commercetools-frontend/application-config';

const sanitizeAppEnvironment = (env: ApplicationRuntimeConfig['env']) =>
  serialize(env, { isJSON: true });

export default sanitizeAppEnvironment;
