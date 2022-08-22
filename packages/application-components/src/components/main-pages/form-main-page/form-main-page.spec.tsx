import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import { screen, renderComponent } from '../../../test-utils';
import FormMainPage from './form-main-page';

jest.mock('@commercetools-uikit/utils', () => ({
  ...jest.requireActual('@commercetools-uikit/utils'),
  warning: jest.fn(),
}));

const Content = () => (
  <Spacings.Stack>
    <Text.Body>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
    </Text.Body>
  </Spacings.Stack>
);

const renderFormMainPage = (additionalProps = {}) => {
  renderComponent(
    <FormMainPage
      onPrimaryButtonClick={() => {}}
      onSecondaryButtonClick={() => {}}
      {...additionalProps}
    >
      <Content />
    </FormMainPage>
  );
};

describe('rendering', () => {
  it('should show form controls and handle button clicks', () => {
    const mockPrimaryOnClick = jest.fn();
    const mockSecondaryOnClick = jest.fn();

    renderFormMainPage({
      title: 'Test title',
      labelPrimaryButton: 'Test Primary Button',
      onPrimaryButtonClick: mockPrimaryOnClick,
      labelSecondaryButton: 'Test Secondary Button',
      onSecondaryButtonClick: mockSecondaryOnClick,
    });

    screen.getByText('Test Primary Button').click();
    expect(mockPrimaryOnClick).toBeCalled();

    screen.getByText('Test Secondary Button').click();
    expect(mockSecondaryOnClick).toBeCalled();
  });

  it('should disable form control buttons', () => {
    renderFormMainPage({
      title: 'Test title',
      labelPrimaryButton: 'Test Primary Button',
      labelSecondaryButton: 'Test Secondary Button',
      isPrimaryButtonDisabled: true,
      isSecondaryButtonDisabled: true,
    });

    expect(
      screen.getByText('Test Primary Button').closest('button')
    ).toBeDisabled();
    expect(
      screen.getByText('Test Secondary Button').closest('button')
    ).toBeDisabled();
  });
});
