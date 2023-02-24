import './globals.css';
import { lazy } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
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

const history = createEnhancedHistory(
  createBrowserHistory({ basename: '/custom-applications/playground' })
);

const Application = () => (
  <Router history={history}>
    <Switch>
      <Route path="/confirmation-dialog">
        <ConfirmationDialog />
      </Route>
      <Route path="/info-dialog">
        <InfoDialog />
      </Route>
      <Route path="/info-detail-page">
        <InfoDetailPage />
      </Route>
      <Route path="/info-main-page">
        <InfoMainPage />
      </Route>
      <Route path="/info-modal-page">
        <InfoModalPage />
      </Route>
      <Route path="/form-dialog">
        <FormDialog />
      </Route>
      <Route path="/form-detail-page">
        <FormDetailPage />
      </Route>
      <Route path="/form-main-page">
        <FormMainPage />
      </Route>
      <Route path="/form-modal-page">
        <FormModalPage />
      </Route>
      <Route path="/custom-form-detail-page">
        <CustomFormDetailPage />
      </Route>
      <Route path="/custom-form-main-page">
        <CustomFormMainPage />
      </Route>
      <Route path="/custom-form-modal-page">
        <CustomFormModalPage />
      </Route>
      <Route path="/tabular-detail-page">
        <TabularDetailPage />
      </Route>
      <Route path="/tabular-main-page">
        <TabularMainPage />
      </Route>
      <Route path="/tabular-modal-page">
        <TabularModalPage />
      </Route>
      <Route>
        <IndexPage />
      </Route>
    </Switch>
  </Router>
);

export default Application;
