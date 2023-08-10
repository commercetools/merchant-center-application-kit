// TODO: Remove this file once the new navigation is enabled for all users
import { useFeatureToggle } from '@flopflip/react-broadcast';
import { MAIN_NAVIGATION } from '../../feature-toggles';

const NewMainNavigationFlagWrapper = (props: {
  children: (isNewNavigationEnabled: boolean) => JSX.Element;
}) => {
  const isNewNavigationEnabled = useFeatureToggle(MAIN_NAVIGATION);
  return props.children(isNewNavigationEnabled);
};

export default NewMainNavigationFlagWrapper;
