import {
  withProjectExtensionImageRegex,
  ProjectExtensionProviderForImageRegex,
} from '@commercetools-frontend/application-shell-connectors';
import type { TImageRegexContext } from '@commercetools-frontend/application-shell-connectors';
import { Component } from 'react';

type TOwnProps = {
  // ...
};

type TMappedProps = {
  imageRegexData?: TImageRegexContext;
};

class MyComponent extends Component<TOwnProps & TMappedProps> {
  render() {
    const { imageRegexData } = this.props;
    return (
      <div>
        <h2>Project images regex is loading?: {imageRegexData?.isLoading}</h2>
        <h2>Project images regex: {imageRegexData?.imageRegex}</h2>
      </div>
    );
  }
}

const WrappedComponent = withProjectExtensionImageRegex<
  TOwnProps & TMappedProps
>()(MyComponent);

export class MyApp extends Component {
  render() {
    return (
      <ProjectExtensionProviderForImageRegex>
        <WrappedComponent />
      </ProjectExtensionProviderForImageRegex>
    );
  }
}
