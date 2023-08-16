// TODO: Remove this file once the new navigation is enabled for all users
import { useFeatureToggle } from '@flopflip/react-broadcast';
import { MAIN_NAVIGATION } from '../../feature-toggles';

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
  const isNewNavigationEnabled = useFeatureToggle(MAIN_NAVIGATION);
  // A temporary workaround for a glitch in computing the aggregated adapter status within useAdapterStatus
  const isReady =
    // @ts-ignore
    window?.__flopflip__?.launchdarkly?.getIsConfigurationStatus?.(2);

  return props.children({
    isNewNavigationEnabled,
    isNewNavigationEnabledEvaluationReady: isReady,
  });
};

export default NewMainNavigationFlagWrapper;
