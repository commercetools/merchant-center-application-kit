module.exports = {
  getOptionalLoader: packageName => {
    try {
      return require.resolve(packageName);
    } catch (error) {
      return null;
    }
  },
};
