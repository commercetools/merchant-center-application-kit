import type { ReactNode } from 'react';
import { useRouteMatch, Link as RouterLink } from 'react-router-dom';
import { useIntl } from 'react-intl';
import Constraints from '@commercetools-uikit/constraints';
import Grid from '@commercetools-uikit/grid';
import { AngleRightIcon } from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import messages from './messages';
import styles from './welcome.module.css';
import WebDeveloperSvg from './web-developer.svg';

type TWrapWithProps = {
  children: ReactNode;
  condition: boolean;
  wrapper: (children: ReactNode) => ReactNode;
};
const WrapWith = (props: TWrapWithProps) => (
  <>{props.condition ? props.wrapper(props.children) : props.children}</>
);
WrapWith.displayName = 'WrapWith';

type TInfoCardProps = {
  title: string;
  content: string;
  linkTo: string;
  isExternal?: boolean;
};

const InfoCard = (props: TInfoCardProps) => (
  <Grid.Item>
    <div className={styles.infoCard}>
      <Spacings.Stack scale="m">
        <Text.Headline as="h3">
          <WrapWith
            condition={true}
            wrapper={(children) =>
              props.isExternal ? (
                <a
                  className={styles.infoCardLink}
                  href={props.linkTo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ) : (
                <RouterLink className={styles.infoCardLink} to={props.linkTo}>
                  {children}
                </RouterLink>
              )
            }
          >
            <Spacings.Inline scale="s" alignItems="center">
              <span>{props.title}</span>
              <AngleRightIcon size="big" color="primary" />
            </Spacings.Inline>
          </WrapWith>
        </Text.Headline>
        <Text.Body>{props.content}</Text.Body>
      </Spacings.Stack>
    </div>
  </Grid.Item>
);
InfoCard.displayName = 'InfoCard';

const Welcome = () => {
  const match = useRouteMatch();
  const intl = useIntl();

  return (
    <Constraints.Horizontal max={16}>
      <Spacings.Stack scale="xl">
        <Text.Headline as="h1" intlMessage={messages.title} />
        <div>
          <div className={styles.imageContainer}>
            <img
              alt="web developer"
              src={WebDeveloperSvg}
              width="100%"
              height="100%"
            />
          </div>
        </div>

        <Spacings.Stack scale="l">
          <Text.Subheadline as="h4" intlMessage={messages.subtitle} />
          <Grid
            gridGap="16px"
            gridAutoColumns="1fr"
            gridTemplateColumns="repeat(3, 1fr)"
          >
            <InfoCard
              title={intl.formatMessage(messages.cardDocumentationTitle)}
              content={intl.formatMessage(messages.cardDocumentationContent)}
              linkTo="https://docs.commercetools.com/merchant-center-customizations/custom-applications"
              isExternal
            />
            <InfoCard
              title={intl.formatMessage(messages.cardDesignSystemTitle)}
              content={intl.formatMessage(messages.cardDesignSystemContent)}
              linkTo="https://uikit.commercetools.com"
              isExternal
            />
            <InfoCard
              title={intl.formatMessage(messages.cardChannelsTitle)}
              content={intl.formatMessage(messages.cardChannelsContent)}
              linkTo={`${match.url}/channels`}
            />
          </Grid>
        </Spacings.Stack>
      </Spacings.Stack>
    </Constraints.Horizontal>
  );
};
Welcome.displayName = 'Welcome';

export default Welcome;
