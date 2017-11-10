import React from 'react';
import { storiesOf } from '@storybook/react';
import { DateSelector } from 'react-datetime-selector';
import IconButton from 'ui-kit/buttons/icon-button';
import { CloseBoldIcon } from 'ui-kit/icons';

const datePlaceholder = '____/__/__';

class DateSelectorStory extends React.PureComponent {
  static displayName = 'DateSelectorStory';

  state = {
    date: undefined,
    locale: 'en',
    minYear: 1900,
    maxYear: new Date().getFullYear(),
  };

  handleLocaleChange = event => {
    const { target: { value } } = event;
    this.setState({ locale: value });
  };

  handleYearChange = event => {
    const { target: { name, value } } = event;
    const year = parseInt(value, 10);

    if (isNaN(year)) return;

    this.setState({ [name]: year });
  };

  handleDateChange = date => {
    this.setState({ date });
  };

  render() {
    const containerStyles = {
      margin: '20px',
    };

    return (
      <div style={containerStyles}>
        <div style={{ marginBottom: '50px' }}>
          <p>{`Selected date: ${this.state.date || datePlaceholder}`}</p>
          <small>{'Date changes only when all 3 values are selected'}</small>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <p>{'Props options'}</p>
          <ul>
            <li>
              <label>{'Locale: '}</label>
              <select
                value={this.state.locale}
                onChange={this.handleLocaleChange}
              >
                <option value="en">{'en'}</option>
                <option value="de">{'de'}</option>
                <option value="it">{'it'}</option>
              </select>
            </li>
            <li>
              <label>{'Year (min): '}</label>
              <input
                type="text"
                name="minYear"
                value={this.state.minYear}
                onChange={this.handleYearChange}
              />
            </li>
            <li>
              <label>{'Year (max): '}</label>
              <input
                type="text"
                name="maxYear"
                value={this.state.maxYear}
                onChange={this.handleYearChange}
              />
            </li>
          </ul>
        </div>

        <div>
          <small>{'With container size 100%'}</small>
          <DateSelector
            name="full-width-date"
            locale={this.state.locale}
            value={this.state.date}
            minYear={this.state.minYear}
            maxYear={this.state.maxYear}
            onChange={this.handleDateChange}
          />
        </div>

        <div style={{ marginTop: '20px', width: '500px' }}>
          <small>
            {'With custom clear button and fixed container size (500px)'}
          </small>
          <DateSelector
            name="limited-width-date"
            locale={this.state.locale}
            value={this.state.date}
            minYear={this.state.minYear}
            maxYear={this.state.maxYear}
            onChange={this.handleDateChange}
            clearButton={
              <IconButton
                label="Clear"
                icon={<CloseBoldIcon />}
                size="medium"
                onClick={() => {}}
              />
            }
          />
        </div>
      </div>
    );
  }
}

storiesOf('DateTime Selector', module).add('date', () => <DateSelectorStory />);
// .add('time', () => (<TimeSelectorStory />))
// .add('datetime', () => (<DateTimeSelectorStory />))
