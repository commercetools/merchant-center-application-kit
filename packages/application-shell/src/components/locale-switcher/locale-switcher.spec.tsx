import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import LocaleSwitcher from './locale-switcher';

const setProjectDataLocale = jest.fn();
const availableLocales = ['en', 'de', 'fr'];

const renderLocaleSwitcher = () => {
  return render(
    <IntlProvider locale="en" messages={{}}>
      <LocaleSwitcher
        projectDataLocale="en"
        setProjectDataLocale={setProjectDataLocale}
        availableLocales={availableLocales}
      />
    </IntlProvider>
  );
};

describe('LocaleSwitcher', () => {
  it('should render and handle locale selection', async () => {
    renderLocaleSwitcher();
    const input = await screen.findByLabelText('Locales');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.click(screen.getByText('fr'));

    await waitFor(() => {
      expect(setProjectDataLocale).toHaveBeenCalledWith('fr');
    });
  });
  it('should open and close the locale dialog', async () => {
    renderLocaleSwitcher();
    const input = await screen.findByLabelText('Locales');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    const iconButton = await screen.findByRole('button', {
      name: 'Locales info',
    });
    fireEvent.click(iconButton);

    // expect to see the dialog opens after clicking the icon button
    const dialogText = await screen.findByText('Selecting a data locale');
    expect(dialogText).toBeInTheDocument();

    // close the dialog
    fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(dialogText).not.toBeInTheDocument();
  });
});
