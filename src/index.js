import '@commercetools-frontend/i18n/register-locales';
import '@commercetools-frontend/l10n/register-moment-locales';
import React from 'react';
import ReactDOM from 'react-dom';
import EntryPoint from './components/entry-point';

ReactDOM.render(<EntryPoint />, document.getElementById('app'));
