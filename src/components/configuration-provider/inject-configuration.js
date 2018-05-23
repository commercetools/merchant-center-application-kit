import PropTypes from 'prop-types';
import { getIn } from 'formik';
import { withProps, getContext, compose } from 'recompose';

const injectConfiguration = (pathToConfiguration, propName) =>
  withProps(props => ({
    [propName]: getIn(props.configuration, pathToConfiguration),
  }));

export default (pathToConfiguration, propName = 'configuration') =>
  compose(
    getContext({
      configuration: PropTypes.object,
    }),
    injectConfiguration(pathToConfiguration, propName)
  );
