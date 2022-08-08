import type { FormEvent, ReactElement, ReactNode } from 'react';
import { css } from '@emotion/react';
import IconButton from '@commercetools-uikit/icon-button';
import Avatar from '@commercetools-uikit/avatar';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { customProperties } from '@commercetools-uikit/design-system';
import { warning } from '@commercetools-uikit/utils';
import PageHeaderTitle from '../internals/page-header-title';

export type TFormMainPageLayoutProps = {
  /**
   * The title of the page.
   */
  title?: string;
  /**
   * The title of the header.
   */
  headerTitle?: string;
  /**
   * The subtitle of the header.
   */
  headerSubtitle?: string | ReactElement;
  /**
   * Replaces the title/subtitle row with a custom one (for special use cases)
   */
  customTitleRow?: ReactNode;
  /**
   * Any React node displayed as the content within the page.
   */
  children: ReactNode;
  /**
   * The hashed string of the user gravatar.
   */
  gravatarHash?: string;
  /**
   * The first name of the user.
   */
  firstName?: string;
  /**
   * The last name of the user.
   */
  lastName?: string;
  /**
   * Form submit handler
   */
  onSubmit: (event: FormEvent) => void;
  /**
   * Form submit success notification message
   */
  onSubmitSuccessMessage?: string;
  /**
   * Icon on the header
   */
  headerIcon?: ReactElement;
};

const FormMainPageLayout = (props: TFormMainPageLayoutProps) => {
  warning(
    props.title !== undefined || props.customTitleRow !== undefined,
    'FormMainPageLayout: one of either `title` or `customTitleRow` is required but both their values are `undefined`'
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    props.onSubmit(event);
  };

  return (
    <div>
      <Spacings.Stack scale="l">
        {props.customTitleRow || (
          <>
            <Text.Headline as="h2" title={props.title}>
              {props.title}
            </Text.Headline>
            <Spacings.Inline justifyContent="space-between" alignItems="center">
              <Spacings.Inline scale="m" alignItems="center">
                {props.gravatarHash && (
                  <Avatar
                    gravatarHash={props.gravatarHash}
                    firstName={props.firstName}
                    lastName={props.lastName}
                    size="l"
                  />
                )}
                <PageHeaderTitle
                  title={props.headerTitle ?? ''}
                  subtitle={props.headerSubtitle}
                  titleSize="big"
                />
              </Spacings.Inline>
              {props.headerIcon && (
                <IconButton
                  icon={props.headerIcon}
                  label="A label text"
                  onClick={() => alert('Button clicked')}
                />
              )}
            </Spacings.Inline>
          </>
        )}
        <hr
          css={css`
            background-color: ${customProperties.colorNeutral60};
            height: 1px;
            border: 0;
          `}
        />
        <form
          css={css`
            width: 50%;
          `}
          onSubmit={handleSubmit}
        >
          {props.children}
        </form>
      </Spacings.Stack>
    </div>
  );
};

FormMainPageLayout.displayName = 'FormMainPageLayout';

export default FormMainPageLayout;
