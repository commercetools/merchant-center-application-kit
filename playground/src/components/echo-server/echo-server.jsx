import { useReducer, useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useAsyncDispatch, actions } from '@commercetools-frontend/sdk';
import { useOnActionError } from '@commercetools-frontend/actions-global';
import Spacings from '@commercetools-uikit/spacings';
import Constraints from '@commercetools-uikit/constraints';
import Link from '@commercetools-uikit/link';
import Text from '@commercetools-uikit/text';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import PrimaryButton from '@commercetools-uikit/primary-button';
import { CodeBlock } from '@commercetools-docs/ui-kit';
import messages from './messages';

const initialState = {
  isLoading: false,
  result: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return { isLoading: true, result: null };
    case 'complete':
      return { isLoading: false, result: action.payload };
    default:
      return state;
  }
};

const getLinkDocs = (msg) => (
  <Link
    isExternal
    to="https://docs.commercetools.com/custom-applications/concepts/integrate-with-your-own-api"
  >
    {msg}
  </Link>
);

const EchoServer = () => {
  const intl = useIntl();
  const [state, dispatchState] = useReducer(reducer, initialState);
  const dispatch = useAsyncDispatch();
  const dispatchError = useOnActionError();
  const echoServerApiUrl = useApplicationContext(
    (context) => context.environment.echoServerApiUrl
  );
  const [shouldIncludeParamInRequest, setShouldIncludeParamInRequest] =
    useState(false);
  const [
    shouldIncludeForwardHeaderInRequest,
    setShouldIncludeForwardHeaderInRequest,
  ] = useState(false);

  const onChangeShouldIncludeParamInRequest = (event) => {
    const nextValue = event.target.value === 'false' ? true : false;
    setShouldIncludeParamInRequest(nextValue);
  };

  const onChangeShouldIncludeForwardHeaderInRequest = (event) => {
    const nextValue = event.target.value === 'false' ? true : false;
    setShouldIncludeForwardHeaderInRequest(nextValue);
  };

  const handleSendRequest = useCallback(() => {
    const forwardToUrl = new URL(echoServerApiUrl);
    if (shouldIncludeParamInRequest) {
      forwardToUrl.searchParams.set('hello', 'world');
    }

    async function ping() {
      try {
        const result = await dispatch(
          actions.forwardTo.post({
            uri: forwardToUrl.toString(),
            payload: {
              say: 'Hello',
            },
            headers: shouldIncludeForwardHeaderInRequest && {
              'custom-header-name': 'custom-header-value',
            },
          })
        );
        dispatchState({ type: 'complete', payload: result });
      } catch (error) {
        dispatchState({ type: 'complete' });
        dispatchError(error);
      }
    }
    dispatchState({ type: 'loading' });
    ping();
  }, [
    dispatch,
    dispatchError,
    echoServerApiUrl,
    shouldIncludeParamInRequest,
    shouldIncludeForwardHeaderInRequest,
  ]);
  return (
    <Spacings.Inset>
      <Spacings.Stack>
        <Text.Headline as="h1" intlMessage={messages.title} />
        <Constraints.Horizontal max={16}>
          <Spacings.Stack>
            <Text.Body
              intlMessage={{
                ...messages.description,
                values: {
                  linkDocs: getLinkDocs,
                },
              }}
            />
          </Spacings.Stack>
        </Constraints.Horizontal>
        <Constraints.Horizontal max={16}>
          <Spacings.Stack>
            <Spacings.Inline>
              <PrimaryButton
                label={intl.formatMessage(
                  state.isLoading
                    ? messages.labelSending
                    : messages.labelSendRequest
                )}
                onClick={handleSendRequest}
                isDisabled={state.isLoading}
              />
              <CheckboxInput
                name="should-include-param-in-request"
                value={shouldIncludeParamInRequest}
                isChecked={shouldIncludeParamInRequest}
                onChange={onChangeShouldIncludeParamInRequest}
              >
                {intl.formatMessage(messages.labelIncludeParamsInRequest)}
              </CheckboxInput>
              <CheckboxInput
                name="should-include-forward-header-in-request"
                value={shouldIncludeForwardHeaderInRequest}
                isChecked={shouldIncludeForwardHeaderInRequest}
                onChange={onChangeShouldIncludeForwardHeaderInRequest}
              >
                {intl.formatMessage(
                  messages.labelIncludeForwardHeaderInRequest
                )}
              </CheckboxInput>
            </Spacings.Inline>
            {state.result && (
              <CodeBlock
                content={JSON.stringify(state.result, null, 2)}
                language="json"
              />
            )}
          </Spacings.Stack>
        </Constraints.Horizontal>
      </Spacings.Stack>
    </Spacings.Inset>
  );
};

export default EchoServer;
