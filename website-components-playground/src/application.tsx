import './globals.css';
import { lazy } from 'react';
import { createBrowserHistory } from 'history';
import {
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';
import { createEnhancedHistory } from '@commercetools-frontend/browser-history';
import IndexPage from './pages';

const ConfirmationDialog = lazy(() => import('./pages/confirmation-dialog'));

const InfoDialog = lazy(() => import('./pages/info-dialog'));
const InfoDetailPage = lazy(() => import('./pages/info-detail-page'));
const InfoMainPage = lazy(() => import('./pages/info-main-page'));
const InfoModalPage = lazy(() => import('./pages/info-modal-page'));

const FormDialog = lazy(() => import('./pages/form-dialog'));
const FormDetailPage = lazy(() => import('./pages/form-detail-page'));
const FormMainPage = lazy(() => import('./pages/form-main-page'));
const FormModalPage = lazy(() => import('./pages/form-modal-page'));

const Drawer = lazy(() => import('./pages/drawer'));

const CustomFormDetailPage = lazy(
  () => import('./pages/custom-form-detail-page')
);
const CustomFormMainPage = lazy(() => import('./pages/custom-form-main-page'));
const CustomFormModalPage = lazy(
  () => import('./pages/custom-form-modal-page')
);

const TabularDetailPage = lazy(() => import('./pages/tabular-detail-page'));
const TabularMainPage = lazy(() => import('./pages/tabular-main-page'));
const TabularModalPage = lazy(() => import('./pages/tabular-modal-page'));

const history = createEnhancedHistory(createBrowserHistory());

const Application = () => (
  <HistoryRouter history={history}>
    <Routes>
      <Route path="/confirmation-dialog" element={<ConfirmationDialog />} />
      <Route path="/info-dialog" element={<InfoDialog />} />
      <Route path="/info-detail-page" element={<InfoDetailPage />} />
      <Route path="/info-main-page" element={<InfoMainPage />} />
      <Route path="/info-modal-page" element={<InfoModalPage />} />
      <Route path="/form-dialog" element={<FormDialog />} />
      <Route path="/form-detail-page" element={<FormDetailPage />} />
      <Route path="/form-main-page" element={<FormMainPage />} />
      <Route path="/form-modal-page" element={<FormModalPage />} />
      <Route
        path="/custom-form-detail-page"
        element={<CustomFormDetailPage />}
      />
      <Route path="/custom-form-main-page" element={<CustomFormMainPage />} />
      <Route path="/custom-form-modal-page" element={<CustomFormModalPage />} />
      <Route path="/tabular-detail-page" element={<TabularDetailPage />} />
      <Route path="/tabular-main-page" element={<TabularMainPage />} />
      <Route path="/tabular-modal-page" element={<TabularModalPage />} />
      <Route path="/drawer" element={<Drawer />} />
      <Route element={<IndexPage />} />
    </Routes>
  </HistoryRouter>
);

export default Application;
