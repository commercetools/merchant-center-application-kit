import { useRouteMatch } from 'react-router-dom';
import Constraints from '@commercetools-uikit/constraints';
import Link from '@commercetools-uikit/link';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import messages from './messages';
import styles from './welcome.mod.css';
import WebDeveloperSvg from './web-developer.svg';

const getLinkDocs = (msg) => (
  <Link
    isExternal
    to="https://docs.commercetools.com/custom-applications/getting-started"
  >
    {msg}
  </Link>
);
// eslint-disable-next-line react/display-name
const createGetLinkDocs = (to) => (msg) => <Link to={to}>{msg}</Link>;

const Welcome = () => {
  const match = useRouteMatch();

  return (
    <Spacings.Stack scale="xl">
      <Text.Headline as="h1" intlMessage={messages.title} />
      <Constraints.Horizontal max={13}>
        <div className={styles.imageContainer}>
          <img
            alt="web developer"
            src={WebDeveloperSvg}
            width="100%"
            height="100%"
          />
        </div>
      </Constraints.Horizontal>
      <Constraints.Horizontal max={13}>
        <Spacings.Stack scale="l">
          <Spacings.Stack scale="s">
            <Text.Headline as="h3" intlMessage={messages.gettingStartedTitle} />
            <Text.Body
              intlMessage={{
                ...messages.gettingStartedContent,
                values: {
                  linkdocs: getLinkDocs,
                },
              }}
            />
          </Spacings.Stack>
          <Spacings.Stack scale="s">
            <Text.Headline as="h3" intlMessage={messages.aboutTitle} />
            <Text.Body
              intlMessage={{
                ...messages.aboutContent,
                values: {
                  linkchannels: createGetLinkDocs(`${match.url}/channels`),
                },
              }}
            />
          </Spacings.Stack>
        </Spacings.Stack>
      </Constraints.Horizontal>
    </Spacings.Stack>
  );
};
Welcome.displayName = 'Welcome';

export default Welcome;
