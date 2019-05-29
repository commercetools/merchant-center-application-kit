export { default as version } from './version';

// Maintenance pages
export {
  default as MaintenancePageLayout,
  DeprecatedServicePageResponseLayout as ServicePageResponseLayout,
} from './components/maintenance-page-layout';
export { default as PageNotFound } from './components/page-not-found';

// Dialogs
export { default as InfoDialog } from './components/dialogs/info-dialog';
export {
  default as ConfirmationDialog,
} from './components/dialogs/confirmation-dialog';
export { default as FormDialog } from './components/dialogs/form-dialog';

export {
  default as InfoModalPage,
} from './components/modal-pages/info-modal-page';
export {
  default as FormModalPage,
} from './components/modal-pages/form-modal-page';
export {
  default as TabularModalPage,
} from './components/modal-pages/tabular-modal-page';
