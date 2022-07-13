import {
  withApplicationContext,
  type TApplicationContext,
} from '@commercetools-frontend/application-shell-connectors';
import { Component } from 'react';

type TOwnProps = {
  // ...
};

type TMappedProps = {
  dataLocale: TApplicationContext<{}>['dataLocale'];
};

class DisplayLocale extends Component<TOwnProps & TMappedProps> {
  render() {
    return (
      <div>
        <h1>Current data locale: {this.props.dataLocale}</h1>
      </div>
    );
  }
}

export default withApplicationContext<TMappedProps, {}, {}>(
  (applicationContext) => ({
    dataLocale: applicationContext.dataLocale,
  })
)(DisplayLocale);
