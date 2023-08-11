// TODO: Remove this file once the new navigation is enabled for all users
import { useFeatureToggle, useAdapterStatus } from '@flopflip/react-broadcast';
import { MAIN_NAVIGATION } from '../../feature-toggles';

type TNewMainNavigationFlagWrapperChildrenProps = {
  isNewNavigationEnabled: boolean;
  isNewNavigationEnabledEvaluationPending: boolean;
};

const NewMainNavigationFlagWrapper = (props: {
  children: ({
    isNewNavigationEnabled,
    isNewNavigationEnabledEvaluationPending,
  }: TNewMainNavigationFlagWrapperChildrenProps) => JSX.Element;
}) => {
  const isNewNavigationEnabled = useFeatureToggle(MAIN_NAVIGATION);
  const { isConfiguring } = useAdapterStatus();

  return props.children({
    isNewNavigationEnabled,
    isNewNavigationEnabledEvaluationPending: isConfiguring,
  });
};

export default NewMainNavigationFlagWrapper;
