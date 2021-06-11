module.exports = {
  rtlConfig: {
    asyncUtilTimeout: process.env.RTL_ASYNC_UTIL_TIMEOUT || 2000,
  },
  babelConfig: {
    disableCoreJs: true,
  },
};
