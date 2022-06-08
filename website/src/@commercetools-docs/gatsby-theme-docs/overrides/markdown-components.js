import { BetaFlag } from '@commercetools-docs/gatsby-theme-docs';
import Playground from '../../../components/playground';
import addonComponents from './addon-components';

const markdownComponents = {
  Playground,
  BetaFlag,
  ...addonComponents,
};

export default markdownComponents;
