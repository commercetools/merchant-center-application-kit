export { default as version } from './version';

// TabHeader & Tabular pages
export { default as TabHeader } from './components/tab-header';

// Dialogs
export { default as InfoDialog } from './components/dialogs/info-dialog';
export { default as ConfirmationDialog } from './components/dialogs/confirmation-dialog';
export { default as FormDialog } from './components/dialogs/form-dialog';

// Modal Pages
export { default as InfoModalPage } from './components/modal-pages/info-modal-page';
export { default as FormModalPage } from './components/modal-pages/form-modal-page';
export { default as TabularModalPage } from './components/modal-pages/tabular-modal-page';
export { default as CustomFormModalPage } from './components/modal-pages/custom-form-modal-page';

// Detail Pages
export { default as CustomFormDetailPage } from './components/detail-pages/custom-form-detail-page';
export { default as FormDetailPage } from './components/detail-pages/form-detail-page';
export { default as InfoDetailPage } from './components/detail-pages/info-detail-page';
export { default as TabularDetailPage } from './components/detail-pages/tabular-detail-page';

// Public page
export { default as PublicPageLayout } from './components/public-page-layout';

// Main Layout Page
export { default as FormMainPage } from './components/main-pages/form-main-page';
export { default as CustomFormMainPage } from './components/main-pages/custom-form-main-page';
export { default as InfoMainPage } from './components/main-pages/info-main-page';
export { default as TabularMainPage } from './components/main-pages/tabular-main-page';

// Maintenance pages
export { default as MaintenancePageLayout } from './components/maintenance-page-layout';
export { default as PageNotFound } from './components/page-not-found';
export { default as PageUnauthorized } from './components/page-unauthorized';

// Page content containers
export { default as PageContentNarrow } from './components/page-content-containers/page-content-narrow';
export type { TPageContentNarrow } from './components/page-content-containers/page-content-narrow';
export { default as PageContentWide } from './components/page-content-containers/page-content-wide';
export type { TPageContentWide } from './components/page-content-containers/page-content-wide';
export { default as PageContentFull } from './components/page-content-containers/page-content-full';
export type { TPageContentFull } from './components/page-content-containers/page-content-full';

// Custom views
export { default as CustomPanel } from './components/custom-views/custom-panel';
export { default as CustomViewLoader } from './components/custom-views/custom-view-loader';
export { default as CustomViewsSelector } from './components/custom-views/custom-views-selector';

// Utilities
export { default as PortalsContainer } from './components/portals-container';
export { default as useModalState } from './hooks/use-modal-state';

export * from './theming';
