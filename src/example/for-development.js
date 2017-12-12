/**
 * THIS IS NOT THE MODULE ENTRY POINT!
 * This file is used by `react-script` to start the playground application
 * for testing/developing the `<ApplicationShell>` component.
 * The `<ApplicationShell>` component is however exported in `package.json`.
 */
import '../public-path';
import React from 'react';
import ReactDOM from 'react-dom';
import TestApplication from './test-application';

ReactDOM.render(<TestApplication />, document.getElementById('app'));
