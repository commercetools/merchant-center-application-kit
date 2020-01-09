import 'cypress-graphql-mock';
import mocksForMc from './mc';

Cypress.Commands.add('useMockedGraphqlApi', (customOperations = {}) => {
  cy.task('getGraphQLSchema', 'mc').then(schema => {
    cy.mockGraphql({
      schema,
    });
  });
  const operations = mocksForMc.createMockOperations(customOperations);
  cy.mockGraphqlOps({ operations });
  return cy.wrap(operations);
});
