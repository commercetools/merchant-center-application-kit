import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import {
  PublicPageLayout,
  themesOverrides,
} from '@commercetools-frontend/application-components';
import FailedAuthenticationSVG from '@commercetools-frontend/assets/images/doors-closed.svg';
import type { TAsyncLocaleDataProps } from '@commercetools-frontend/i18n';

import { AsyncLocaleData } from '@commercetools-frontend/i18n';
import Card from '@commercetools-uikit/card';
import Constraints from '@commercetools-uikit/constraints';
import {
  ThemeProvider,
  customProperties,
} from '@commercetools-uikit/design-system';
import FlatButton from '@commercetools-uikit/flat-button';
import { AngleLeftIcon } from '@commercetools-uikit/icons';
import { ContentNotification } from '@commercetools-uikit/notifications';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import ConfigureIntlProvider from '../configure-intl-provider';

type TProps = {
  message: string;
  locale: string;
  applicationMessages: TAsyncLocaleDataProps['applicationMessages'];
  children?: never;
};

const Divider = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  border: 0;
  border-style: solid;
  border-top-width: 1px;
  border-top-color: ${customProperties.colorNeutral};
`;

const AuthCallbackErrorPage = (props: TProps) => {
  const history = useHistory();
  return (
    <AsyncLocaleData
      locale={props.locale}
      applicationMessages={props.applicationMessages}
    >
      {({ locale, messages }) => (
        <ConfigureIntlProvider locale={locale} messages={messages}>
          <ThemeProvider
            theme="test"
            themeOverrides={themesOverrides.default}
          />
          <PublicPageLayout contentScale="wide">
            <Spacings.Inline justifyContent="center">
              <Constraints.Horizontal max={11}>
                <Card insetScale="xl">
                  <Spacings.Stack scale="l">
                    <Spacings.Inline justifyContent="center">
                      <img
                        src={FailedAuthenticationSVG}
                        alt="Failed authentication"
                      />
                    </Spacings.Inline>
                    <Text.Headline as="h2">
                      {'Authentication error'}
                    </Text.Headline>
                    <ContentNotification type="error">
                      <Spacings.Stack scale="m">
                        <Text.Body>{props.message}</Text.Body>
                      </Spacings.Stack>
                    </ContentNotification>
                    <Spacings.Stack scale="m">
                      <Divider />
                      <FlatButton
                        label="Try log in again"
                        icon={<AngleLeftIcon />}
                        onClick={() => {
                          history.push('/');
                        }}
                      />
                    </Spacings.Stack>
                  </Spacings.Stack>
                </Card>
              </Constraints.Horizontal>
            </Spacings.Inline>
          </PublicPageLayout>
        </ConfigureIntlProvider>
      )}
    </AsyncLocaleData>
  );
};
AuthCallbackErrorPage.displayName = 'AuthCallbackErrorPage';

export default AuthCallbackErrorPage;
