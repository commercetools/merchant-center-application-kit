import type { TAsyncLocaleDataProps } from '@commercetools-frontend/i18n';

import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import CommercetoolsLogoSvg from '@commercetools-frontend/assets/logos/commercetools_primary-logo_horizontal_RGB.svg';
import FailedAuthenticationSVG from '@commercetools-frontend/assets/images/locked-diamond.svg';
import { customProperties } from '@commercetools-uikit/design-system';
import Card from '@commercetools-uikit/card';
import Constraints from '@commercetools-uikit/constraints';
import { ContentNotification } from '@commercetools-uikit/notifications';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import FlatButton from '@commercetools-uikit/flat-button';
import { AngleLeftIcon } from '@commercetools-uikit/icons';
import { AsyncLocaleData } from '@commercetools-frontend/i18n';
import ConfigureIntlProvider from '../configure-intl-provider';

type TProps = {
  message: string;
  locale: string;
  applicationMessages: TAsyncLocaleDataProps['applicationMessages'];
  children?: never;
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  padding-top: ${customProperties.spacingXl};
  justify-content: center;
`;
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
          <Container>
            <Constraints.Horizontal max={7}>
              <Spacings.Stack scale="xl">
                <div>
                  <img src={CommercetoolsLogoSvg} alt="commercetools logo" />
                </div>
                <Card>
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
              </Spacings.Stack>
            </Constraints.Horizontal>
          </Container>
        </ConfigureIntlProvider>
      )}
    </AsyncLocaleData>
  );
};
AuthCallbackErrorPage.displayName = 'AuthCallbackErrorPage';

export default AuthCallbackErrorPage;
