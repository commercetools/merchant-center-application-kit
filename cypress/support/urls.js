export const projectKey = Cypress.env('PROJECT_KEY');

export const URL_BASE = `/${projectKey}`;

export const ENTRY_POINT_STATE_MACHINES = 'playground-state-machines';
export const URL_STATE_MACHINES = `${URL_BASE}/${ENTRY_POINT_STATE_MACHINES}`;
export const URL_STATE_MACHINES_ID = `${URL_STATE_MACHINES}/12ad40eb-b33f-4e0e-ae91-bca373ccfd58`;

export const ENTRY_POINT_EXAMPLES_STARTER = 'examples-starter';
export const URL_EXAMPLES_STARTER = `${URL_BASE}/${ENTRY_POINT_EXAMPLES_STARTER}`;
