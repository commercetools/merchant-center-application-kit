// import { Factory } from 'rosie';
// import faker from 'faker';

export const defaultFixtures = {};

export const createResolvers = (_, resolvers = {}) => ({
  Query: () => ({
    allFeatureToggles: () => [],
    ...resolvers.query,
  }),
});
