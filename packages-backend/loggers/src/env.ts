const env = process.env.NODE_ENV;
const isDev = !env || env === 'development';
const isProd = env === 'production';
const isTest = env === 'test';

export { isDev, isProd, isTest };
