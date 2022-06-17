import {
  withProjectExtensionImageRegex,
  ProjectExtensionProviderForImageRegex,
} from '@commercetools-frontend/application-shell-connectors';
import { Component } from 'react';

class MyComponent extends Component {
  render() {
    const { imageRegexData } = this.props;
    return (
      <div>
        <h2>Project images regex is loading?: {imageRegexData.isLoading}</h2>
        <h2>
          Project images regex: {JSON.stringify(imageRegexData.imageRegex)}
        </h2>
      </div>
    );
  }
}

const WrappedComponent = withProjectExtensionImageRegex()(MyComponent);

class MyApp extends Component {
  render() {
    return (
      <ProjectExtensionProviderForImageRegex>
        <WrappedComponent />
      </ProjectExtensionProviderForImageRegex>
    );
  }
}
