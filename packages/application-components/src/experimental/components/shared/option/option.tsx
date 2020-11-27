import React from 'react';
import { NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import AsyncSelectInput from '@commercetools-uikit/async-select-input';

type TData = {
  key: string;
  label: string;
  value: string;
};

type TProps = {
  data: TData;
};

const Option = <T extends TProps>(props: T): JSX.Element => {
  return (
    <AsyncSelectInput.Option {...props}>
      <Spacings.Stack scale="xs">
        <Text.Detail isBold>
          {props.data.label || NO_VALUE_FALLBACK}
        </Text.Detail>
        <Text.Detail>Key: {props.data.key || NO_VALUE_FALLBACK}</Text.Detail>
      </Spacings.Stack>
    </AsyncSelectInput.Option>
  );
};
Option.displayName = 'Option';

export default Option;
