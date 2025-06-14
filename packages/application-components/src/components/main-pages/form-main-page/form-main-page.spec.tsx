import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { screen, renderComponent, fireEvent } from '../../../test-utils';
import FormMainPage from './form-main-page';

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
  it('should show form controls and handle button clicks', async () => {
    const mockPrimaryOnClick = jest.fn();
    const mockSecondaryOnClick = jest.fn();

    renderFormMainPage({
      title: 'Test title',
      labelPrimaryButton: 'Test Primary Button',
      onPrimaryButtonClick: mockPrimaryOnClick,
      labelSecondaryButton: 'Test Secondary Button',
      onSecondaryButtonClick: mockSecondaryOnClick,
    });

    const primaryButton = await screen.findByText('Test Primary Button');
    fireEvent.click(primaryButton);
    expect(mockPrimaryOnClick).toHaveBeenCalled();
    const secondaryButton = screen.getByText('Test Secondary Button');
    fireEvent.click(secondaryButton);
    expect(mockSecondaryOnClick).toHaveBeenCalled();
  });

  it('should disable form control buttons', () => {
    renderFormMainPage({
      title: 'Test title',
      labelPrimaryButton: 'Test Primary Button',
      labelSecondaryButton: 'Test Secondary Button',
      isPrimaryButtonDisabled: true,
      isSecondaryButtonDisabled: true,
    });

    expect(screen.getByLabelText('Test Primary Button')).toBeDisabled();
    expect(screen.getByLabelText('Test Secondary Button')).toBeDisabled();
  });

  it('should show secondaryButton Icon', () => {
    renderFormMainPage({
      title: 'Test title',
      labelPrimaryButton: 'Test Primary Button',
      labelSecondaryButton: 'Test Secondary Button',
      iconLeftSecondaryButton: <div>button icon</div>,
    });

    screen.getByText('button icon');
  });
});
