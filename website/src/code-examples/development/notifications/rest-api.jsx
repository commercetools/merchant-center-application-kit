import { useEffect } from "react";
import { useAsyncDispatch, actions } from "@commercetools-frontend/sdk";
import { MC_API_PROXY_TARGETS } from "@commercetools-frontend/constants";
import {
  useShowNotification,
  useShowApiErrorNotification,
} from "@commercetools-frontend/actions-global";
import { DOMAINS, NOTIFICATION_KINDS_SIDE } from "@commercetools-frontend/constants";

const ChannelsDetails = (props) => {
  const dispatch = useAsyncDispatch();
  const showNotification = useShowNotification();
  const showApiErrorNotification = useShowApiErrorNotification();
  useEffect(() => {
    async function execute() {
      try {
        const result = await dispatch(
          actions.post({
            mcApiProxyTarget: MC_API_PROXY_TARGETS.COMMERCETOOLS_PLATFORM,
            service: "channels",
            options: { /* ... */ },
            payload: {
              // ...
            },
          })
        );
        // Update state with `result`
        showNotification({
          kind: NOTIFICATION_KINDS_SIDE.success,
          domain: DOMAINS.SIDE,
          text: "Channel updated! 🎉",
        });
      } catch (error) {
        // Update state with `error`
        showApiErrorNotification({ errors: error.body?.errors ?? [] });
      }
    }
    execute();
  }, [dispatch]);

  return (
    // ...
 );
};
