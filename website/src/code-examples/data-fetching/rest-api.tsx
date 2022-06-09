import { useEffect } from 'react';
import { useAsyncDispatch, actions } from '@commercetools-frontend/sdk';
import { MC_API_PROXY_TARGETS } from '@commercetools-frontend/constants';

type TChannelsProps = {
  // component props types
};

const Channels = (props: TChannelsProps) => {
  const dispatch = useAsyncDispatch();
  useEffect(() => {
    async function execute() {
      try {
        const result = await dispatch(
          actions.get({
            mcApiProxyTarget: MC_API_PROXY_TARGETS.COMMERCETOOLS_PLATFORM,
            service: 'channels',
            options: {
              // query options
            },
          })
        );
        // Update state with `result`
      } catch (error) {
        // Update state with `error`
      }
    }
    execute();
  }, [dispatch]);

  return <div>{/* Do something with the state */}</div>;
};
