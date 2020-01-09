const createMockOperations = (customOperations = {}) => ({
  FetchAllMenuFeatureToggles: {
    allFeatureToggles: [],
  },
  ...customOperations,
});

const createMockResolvers = () => ({});

export { createMockOperations, createMockResolvers };
