import 'cypress-graphql-mock';
import * as mocksForMc from '../graphql-mocks/mc';

Cypress.Commands.add('useMockedGraphqlApi', (customOperations = {}) => {
  cy.task('getGraphQLSchema', 'mc').then((schema) => {
    cy.mockGraphql({
      schema,
    });
  });
  const operations = mocksForMc.createMockOperations(customOperations);
  cy.mockGraphqlOps({ operations });
  return cy.wrap(operations);
});
