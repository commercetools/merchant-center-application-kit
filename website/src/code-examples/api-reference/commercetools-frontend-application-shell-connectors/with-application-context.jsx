import { withApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { Component } from 'react';

class DisplayLocale extends Component {
  render() {
    return (
      <div>
        <h1>Current data locale: {this.props.dataLocale}</h1>
      </div>
    );
  }
}

export default withApplicationContext((applicationContext) => ({
  dataLocale: applicationContext.dataLocale,
}))(DisplayLocale);
