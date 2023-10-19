// TODO: Remove this file once the new navigation is enabled for all users
import { useFeatureToggle, useAdapterStatus } from '@flopflip/react-broadcast';
import { adapterIdentifiers } from '@flopflip/types';
import { featureFlags } from '@commercetools-frontend/constants';

type TNewMainNavigationFlagWrapperChildrenProps = {
  isNewNavigationEnabled: boolean;
  isNewNavigationEnabledEvaluationReady: boolean;
};

const NewMainNavigationFlagWrapper = (props: {
  children: ({
    isNewNavigationEnabled,
    isNewNavigationEnabledEvaluationReady,
  }: TNewMainNavigationFlagWrapperChildrenProps) => JSX.Element;
}) => {
  const isNewNavigationEnabled = useFeatureToggle(featureFlags.MAIN_NAVIGATION);
  const { isReady } = useAdapterStatus({
    adapterIdentifiers: [adapterIdentifiers.launchdarkly],
  });

  return props.children({
    isNewNavigationEnabled,
    isNewNavigationEnabledEvaluationReady: isReady,
  });
};

export default NewMainNavigationFlagWrapper;
