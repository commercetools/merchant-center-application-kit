/**
 * https://emotion.sh/docs/emotion-11#css-prop-types
 *
 * However, if you are stuck with older version of TypeScript or using the
 * classic runtime implicitly by using our `@emotion/babel-preset-css-prop`
 * then it’s not possible to leverage `css` prop support being added conditionally
 * based on a type of rendered component.
 * For those cases we have added a special file that can be imported once
 * to add support for the `css` prop globally, for all components.
 *
 * TODO: remove this once we use upgrade to TS >4.1
 */
/// <reference types="@emotion/react/types/css-prop" />

export { default as version } from './version';

// Maintenance pages
export { default as MaintenancePageLayout } from './components/maintenance-page-layout';
export { default as PageNotFound } from './components/page-not-found';
export { default as PageUnauthorized } from './components/page-unauthorized';

// Dialogs
export { default as InfoDialog } from './components/dialogs/info-dialog';
export { default as ConfirmationDialog } from './components/dialogs/confirmation-dialog';
export { default as FormDialog } from './components/dialogs/form-dialog';

// Modal Pages
export { default as InfoModalPage } from './components/modal-pages/info-modal-page';
export { default as FormModalPage } from './components/modal-pages/form-modal-page';
export { default as TabularModalPage } from './components/modal-pages/tabular-modal-page';
export { default as CustomFormModalPage } from './components/modal-pages/custom-form-modal-page';
