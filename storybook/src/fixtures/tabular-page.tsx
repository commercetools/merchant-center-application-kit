import { useId, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { TabHeader } from '@commercetools-frontend/application-components';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import TextInput from '@commercetools-uikit/text-input';

type TTabularPageFixtureProps = {
  basePath: string;
};

export const TabularPageTabControls = ({
  basePath,
}: TTabularPageFixtureProps) => (
  <>
    <TabHeader to={`${basePath}/tab-one`} label="Tab One" />
    <TabHeader to={`${basePath}/tab-two`} label="Tab Two" />
    <TabHeader to={`${basePath}/tab-three`} label="Disabled tab" isDisabled />
  </>
);

export const TabularPageContent = ({ basePath }: TTabularPageFixtureProps) => (
  <Spacings.Stack scale="m">
    <Switch>
      <Route path={`${basePath}/tab-one`}>
        <Text.Body>
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
        </Text.Body>
        <Text.Body>
          {`Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`}
        </Text.Body>
      </Route>
      <Route path={`${basePath}/tab-two`}>
        <Text.Body>
          {`Integer dignissim in sapien vitae elementum. Vivamus vestibulum leo at tempus auctor. Nunc dictum tincidunt porta. Vestibulum ornare odio leo, vitae rutrum arcu rutrum sit amet. Suspendisse elementum lacus nisl, sit amet sollicitudin ex luctus semper. Mauris rutrum venenatis sodales. Proin dictum, lorem at tincidunt mattis, tortor felis sodales arcu, id congue orci purus in libero. In porta semper enim, sed ornare ante commodo eget. Donec facilisis nibh sed sollicitudin elementum. Donec hendrerit lobortis ante eget interdum. Fusce sodales dui nunc, sed rhoncus enim sodales eget. Vestibulum vestibulum metus molestie volutpat tincidunt.`}
        </Text.Body>
      </Route>
      {/* The disabled tab is still a real link, so an unmatched path must not strand the story. */}
      <Redirect to={`${basePath}/tab-one`} />
    </Switch>
  </Spacings.Stack>
);

const TitleRowInput = ({ id, label }: { id: string; label: string }) => {
  const [value, setValue] = useState('');
  return (
    <Spacings.Inline alignItems="center">
      <label htmlFor={id}>
        <Text.Body isBold truncate>
          {label}
        </Text.Body>
      </label>
      <TextInput
        id={id}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </Spacings.Inline>
  );
};

// `useId` keeps the input ids unique when several states share one story.
export const TabularPageCustomTitleRow = () => {
  const id = useId();
  return (
    <Spacings.Inline scale="m">
      <TitleRowInput id={`${id}-input-1`} label="Input 1" />
      <TitleRowInput id={`${id}-input-2`} label="Input 2" />
    </Spacings.Inline>
  );
};
