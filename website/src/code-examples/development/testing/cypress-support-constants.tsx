export const projectKey = Cypress.env('PROJECT_KEY');

// TODO: define the actual `entryPointUriPath` of your Custom Application
export const entryPointUriPath = '';

export const applicationBaseRoute = `/${projectKey}/${entryPointUriPath}`;
