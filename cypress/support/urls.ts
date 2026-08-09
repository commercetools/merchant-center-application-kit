export const projectKey = Cypress.env('PROJECT_KEY');

export const URL_BASE = `/${projectKey}`;

export const ENTRY_POINT_APP_KIT_PLAYGROUND = 'app-kit-playground';
export const URL_APP_KIT_PLAYGROUND = `${URL_BASE}/${ENTRY_POINT_APP_KIT_PLAYGROUND}`;
export const URL_APP_KIT_PLAYGROUND_NOTIFICATIONS = `${URL_APP_KIT_PLAYGROUND}/notifications`;
export const URL_APP_KIT_PLAYGROUND_STATE_MACHINES_ID = `${URL_APP_KIT_PLAYGROUND}/12ad40eb-b33f-4e0e-ae91-bca373ccfd58`;
export const URL_APP_KIT_PLAYGROUND_DATE_FORMATTERS = `${URL_APP_KIT_PLAYGROUND}/formatters`;

// Mirrors CUSTOM_VIEW_ID in playground/src/components/custom-views/constants.js
export const CUSTOM_VIEW_ID_DEMO = '290f83df-d86d-417c-ab24-41697e33483c';
// The playground routes the Demo Custom View here directly, outside the shell.
export const URL_DEMO_CUSTOM_VIEW = `/custom-views/${CUSTOM_VIEW_ID_DEMO}/projects/${projectKey}`;

export const ENTRY_POINT_TEMPLATE_STARTER = 'template-starter';
export const URL_TEMPLATE_STARTER = `${URL_BASE}/${ENTRY_POINT_TEMPLATE_STARTER}`;
export const URL_TEMPLATE_STARTER_CHANNELS = `${URL_TEMPLATE_STARTER}/channels`;
