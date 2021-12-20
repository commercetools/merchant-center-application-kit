export const projectKey = Cypress.env('PROJECT_KEY');

export const URL_BASE = `/${projectKey}`;

export const ENTRY_POINT_APP_KIT_PLAYGROUND = 'app-kit-playground';
export const URL_STATE_MACHINES = `${URL_BASE}/${ENTRY_POINT_APP_KIT_PLAYGROUND}`;
export const URL_STATE_MACHINES_ID = `${URL_STATE_MACHINES}/12ad40eb-b33f-4e0e-ae91-bca373ccfd58`;

export const ENTRY_POINT_TEMPLATE_STARTER = 'template-starter';
export const URL_TEMPLATE_STARTER = `${URL_BASE}/${ENTRY_POINT_TEMPLATE_STARTER}`;
export const URL_TEMPLATE_STARTER_CHANNELS = `${URL_BASE}/${ENTRY_POINT_TEMPLATE_STARTER}/channels`;
