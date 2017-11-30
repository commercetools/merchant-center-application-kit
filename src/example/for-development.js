/**
 * THIS IS NOT THE MODULE ENTRY POINT!
 * This file is used by `react-script` to start the playground application
 * for testing/developing the `<ApplicationShell>` component.
 * The `<ApplicationShell>` component is however exported in `package.json`.
 */
import React from 'react';
import ReactDOM from 'react-dom';
// Use the "official" entry point as we would require the package
import ApplicationShell from '../main';
import * as i18n from '../../../../i18n';

ReactDOM.render(
  <ApplicationShell
    i18n={i18n}
    configuration={window.app}
    // menuLinks={[{ path: '/foo', label: 'Foo' }, { path: '/bar', label: 'Bar' }]}
  >
    <div>{'This is the APPLICATION specific part'}</div>
  </ApplicationShell>,
  document.getElementById('app')
);
