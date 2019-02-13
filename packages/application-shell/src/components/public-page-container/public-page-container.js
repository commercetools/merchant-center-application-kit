import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { FormattedMessage } from 'react-intl';
import {
  Text,
  Spacings,
  customProperties,
} from '@commercetools-frontend/ui-kit';
import LogoBWWhiteSVG from '@commercetools-frontend/assets/images/ct_logo_bw_white.svg';
import BackgroundImage from '@commercetools-frontend/assets/images/public-background.png';
import PortalsContainer from '../portals-container';
import messages from './messages';

const year = new Date().getUTCFullYear();

const PublicPageContainer = props => (
  <React.Fragment>
    <PortalsContainer />
    <div
      css={css`
          height: 100vh;
          display: flex;
          padding-top: ${customProperties.spacing32};
          justify-content: center;
          background-size: cover;
          background-color: #073538;
          background-image: url('${BackgroundImage}');
          background-position: center;
        `}
    >
      <Spacings.Stack scale="xl" alignItems="center">
        <Spacings.Stack scale="m" alignItems="center">
          <img
            css={css`
              width: 275px;
              height: 45px;
            `}
            src={LogoBWWhiteSVG}
          />
          <div>
            <Text.Headline elementType="h2">
              <span
                css={css`
                  color: white;
                `}
              >
                <FormattedMessage {...messages.welcome} />
              </span>
            </Text.Headline>
          </div>
        </Spacings.Stack>
        <Spacings.Stack scale="s">
          {/* Login Card */}
          {props.children}
          <Spacings.Stack scale="xs">
            <div>
              <Text.Body tone="inverted">
                <FormattedMessage
                  {...messages.termsAndPrivacy}
                  values={{
                    privacyPolicyLink: (
                      <a
                        href={`https://commercetools.com/privacy`}
                        target="_blank"
                      >
                        <FormattedMessage {...messages.privacyPolicyLink} />
                      </a>
                    ),
                    termsOfServiceLink: (
                      <a
                        href={`https://commercetools.com/terms`}
                        target="_blank"
                      >
                        <FormattedMessage {...messages.termsOfServiceLink} />
                      </a>
                    ),
                  }}
                />
              </Text.Body>
            </div>
            <Text.Body tone="inverted">{`${year} © commercetools`}</Text.Body>
          </Spacings.Stack>
        </Spacings.Stack>
      </Spacings.Stack>
    </div>
  </React.Fragment>
);
PublicPageContainer.displayName = 'PublicPageContainer';
PublicPageContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicPageContainer;
