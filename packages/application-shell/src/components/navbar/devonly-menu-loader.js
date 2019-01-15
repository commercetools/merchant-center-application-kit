import React from 'react';
import { wrapDisplayName } from 'recompose';

const noop = () => Component => Component;

const devonlyMenuLoader =
  process.env.NODE_ENV !== 'development'
    ? noop
    : (getLoaderFn, mapMenuToProps) => Component => {
        class WrappedComponent extends React.Component {
          static displayName = wrapDisplayName(
            Component,
            'withDevOnlyMenuLoader'
          );
          state = {
            menu: null,
          };
          componentDidMount() {
            const loader = getLoaderFn(this.props);
            if (loader) {
              loader().then(menu => this.setState({ menu }));
            }
          }
          render() {
            const menuProps = mapMenuToProps(this.state.menu) || {};
            return <Component {...this.props} {...menuProps} />;
          }
        }
        return WrappedComponent;
      };

export default devonlyMenuLoader;
