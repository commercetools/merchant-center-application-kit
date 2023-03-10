import { InfoMainPage } from '@commercetools-frontend/application-components';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import TextInput from '@commercetools-uikit/text-input';
import PlaygroundController from '../components/playground-controller';
import LayoutApp from '../layouts/layout-app';

const exampleCustomTitleRow = (
  <Spacings.Inline scale="m">
    <Spacings.Inline alignItems="center">
      <label htmlFor="input-1">
        <Text.Body isBold truncate>
          Input 1
        </Text.Body>
      </label>
      <TextInput id="input-1" value="" onChange={() => undefined} />
    </Spacings.Inline>

    <Spacings.Inline alignItems="center">
      <label htmlFor="input-2">
        <Text.Body isBold truncate>
          Input 2
        </Text.Body>
      </label>
      <TextInput id="input-2" value="" onChange={() => undefined} />
    </Spacings.Inline>
  </Spacings.Inline>
);

const exampleCustomTitleRowWithTitleAndSideContent = (
  <Spacings.Inline scale="m" justifyContent="space-between">
    <InfoMainPage.PageHeaderTitle
      title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      titleSize="big"
    />
    <Spacings.Inline alignItems="center">
      <Text.Body isBold truncate>
        Lorem ipsum dolor sit amet.
      </Text.Body>
    </Spacings.Inline>
  </Spacings.Inline>
);

const getCustomTitleRow = (useCustomTitleRow: string) => {
  switch (useCustomTitleRow) {
    case 'custom-form':
      return exampleCustomTitleRow;
    case 'custom-title-and-side-content':
      return exampleCustomTitleRowWithTitleAndSideContent;
    default:
      return null;
  }
};

const InfoMainPageExample = () => {
  return (
    <LayoutApp>
      <PlaygroundController
        knobs={[
          {
            kind: 'text',
            name: 'title',
            label: 'Title',
            initialValue:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          },
          {
            kind: 'text',
            name: 'subtitle',
            label: 'Subtitle',
            initialValue:
              'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          },
          {
            kind: 'select',
            name: 'useCustomTitleRow',
            label: 'Title Row',
            valueOptions: [
              { value: 'default', label: 'Default' },
              { value: 'custom-form', label: 'Custom (form example)' },
              {
                value: 'custom-title-and-side-content',
                label: 'Custom (title and side content example)',
              },
            ],
            initialValue: 'default',
          },
        ]}
      >
        {({ values }) => (
          <InfoMainPage
            title={values.title as string}
            subtitle={values.subtitle as string}
            customTitleRow={getCustomTitleRow(
              values.useCustomTitleRow as string
            )}
          >
            <Text.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              nec turpis in risus elementum fringilla. Vestibulum nec vulputate
              metus, fringilla luctus nisl. Vestibulum mattis ultricies augue
              sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar
              efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus
              justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla.
              Fusce ac ligula viverra, blandit augue eget, congue turpis.
              Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc
              quis, luctus erat.
            </Text.Body>
            <Text.Body>
              Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu
              arcu ut tristique. Praesent ornare varius leo, ut consequat lacus
              rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla
              facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed
              consectetur molestie quam eu pulvinar. Interdum et malesuada fames
              ac ante ipsum primis in faucibus. In hac habitasse platea
              dictumst.
            </Text.Body>
          </InfoMainPage>
        )}
      </PlaygroundController>
    </LayoutApp>
  );
};
InfoMainPageExample.displayName = 'InfoMainPageExample';

export default InfoMainPageExample;
