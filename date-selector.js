import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import classnames from 'classnames';
import moment from 'moment';
import range from 'lodash.range';
import styles from './date-selector.mod.css';

// Utility functions for the month selector search
const toZeroBasedNumbering = monthIndex => monthIndex - 1;
const toOneBasedNumbering = monthIndex => monthIndex + 1;

// TODO:
// - use timezone to determine the order of the elements (day, month, year).
// - consider whether to accept the value as a `Date` object.
class DateSelector extends React.PureComponent {
  static displayName = 'DateSelector';

  static propTypes = {
    name: PropTypes.string.isRequired,
    // Custom validation for a formatted date string (optional).
    value(props, propName, componentName, ...rest) {
      const propValue = props[propName];
      if (propValue && !moment.utc(propValue).isValid())
        return PropTypes.string(props, propName, componentName, ...rest);
      return null;
    },
    locale: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,

    // Configuration options
    minYear: PropTypes.number.isRequired,
    maxYear: PropTypes.number.isRequired,
    placeholderYear: PropTypes.string,
    placeholderMonth: PropTypes.string,
    placeholderDay: PropTypes.string,
    orderPosition: PropTypes.arrayOf(PropTypes.oneOf(['y', 'm', 'd']))
      .isRequired,
    clearable: PropTypes.bool.isRequired,
    clearButton: PropTypes.oneOfType([
      PropTypes.string, // as a text label
      PropTypes.element, // as a react element
    ]),
    classNames: PropTypes.shape({
      container: PropTypes.string,
      containerLeft: PropTypes.string,
      containerRight: PropTypes.string,
      list: PropTypes.string,
      listItem: PropTypes.string,
      dropdownYear: PropTypes.string,
      dropdownMonth: PropTypes.string,
      dropdownDay: PropTypes.string,
      clearButton: PropTypes.string,
    }),
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    placeholderYear: 'Year',
    placeholderMonth: 'Month',
    placeholderDay: 'Day',
    orderPosition: ['y', 'm', 'd'],
    clearable: true,
    clearButton: 'Clear all',
    classNames: {},
    disabled: false,
  };

  UNSAFE_componentWillMount() {
    // TODO: Think about using a better solution (e.g. reselect) for a
    // cleaner implementation.
    //
    // Save those options in the component instance,
    // to avoid calulating them on each render.
    this.yearOptions = this.getAvailableYearOptions(
      this.props.minYear,
      this.props.maxYear
    );
    this.monthOptions = this.getAvailableMonthOptions(this.props.locale);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // If the value changed, update the state with the new date values.
    if (this.props.value !== nextProps.value)
      this.setState(this.parseDateValues(nextProps.value));

    // If the min/max year range changes, update the list of options
    if (
      this.props.minYear !== nextProps.minYear ||
      this.props.maxYear !== nextProps.maxYear
    )
      this.yearOptions = this.getAvailableYearOptions(
        nextProps.minYear,
        nextProps.maxYear
      );

    // If the locale changes, update the list of months.
    if (this.props.locale !== nextProps.locale)
      this.monthOptions = this.getAvailableMonthOptions(nextProps.locale);
  }

  parseDateValues = value => {
    let day;
    let month;
    let year;

    // If the value is a valid date string (e.g. '2016-04-15')
    // extract the year, month and day as single numeric values.
    // Note: the month is an index value, starting from `0`
    if (value && moment.utc(value).isValid()) {
      const date = new Date(value);
      day = date.getUTCDate();
      month = date.getUTCMonth();
      year = date.getUTCFullYear();
    }

    return {
      day,
      month,
      year,
    };
  };

  // List of all years from the given range, in reverse order
  getAvailableYearOptions = (minYear, maxYear) =>
    range(minYear, maxYear + 1)
      .map(key => ({ value: key, label: key }))
      .reverse();

  // List of all months based on the current locale
  getAvailableMonthOptions = locale =>
    moment
      .utc()
      .locale(locale)
      .localeData()
      .months()
      .map((key, index) => ({ value: toOneBasedNumbering(index), label: key }));

  handleSelectionChange = (key, option) => {
    const newState = { [key]: option.value };

    if (key === 'month') {
      newState[key] = toZeroBasedNumbering(newState[key]);

      // Check that the date is still valid, otherwise
      // reset the `day` value.
      // E.g. selected day is `31` and new month is `February`.
      // The date is obviously invalid, so we reset the `day`.
      const isValid = moment
        .utc([
          this.state.year,
          toZeroBasedNumbering(option.value),
          this.state.day,
        ])
        .isValid();
      if (!isValid) newState.day = undefined;
    }

    // Wait for the state to be updated before calling
    // onChange, in case all 3 values are set.
    this.setState(newState, () => {
      if (this.state.day && !isNaN(this.state.month) && this.state.year) {
        // ISO format
        const formattedDate = moment
          .utc([this.state.year, this.state.month, this.state.day])
          .format('YYYY-MM-DD');

        this.props.onChange(formattedDate);
      }
    });
  };

  handleClearAll = () => {
    this.setState({
      day: undefined,
      month: undefined,
      year: undefined,
    });

    // Trigger change without a value
    this.props.onChange();
  };

  renderDayLabel = ({ value, label }) => {
    // Render also the short day of the week for the given date.
    const dayOfWeek = moment
      .utc([this.state.year, this.state.month, value])
      .locale(this.props.locale)
      .format('ddd');
    return (
      <span>
        {label}
        <small className={styles['label-day-of-week']}>{dayOfWeek}</small>
      </span>
    );
  };

  renderYearSelect = () => (
    <li
      key={`${this.props.name}-year`}
      className={classnames(
        styles['list-item-year'],
        this.props.classNames.listItem
      )}
    >
      <Select
        name="year-selector"
        className={classnames(
          styles.dropdown,
          this.props.classNames.dropdownYear
        )}
        placeholder={this.props.placeholderYear}
        value={this.state.year}
        options={this.yearOptions}
        onChange={option => this.handleSelectionChange('year', option)}
        clearable={false}
        backspaceRemoves={false}
        searchable={true}
        openAfterFocus={true}
        disabled={this.props.disabled}
      />
    </li>
  );

  renderMonthSelect = () => (
    <li
      key={`${this.props.name}-month`}
      className={classnames(
        styles['list-item-month'],
        this.props.classNames.listItem
      )}
    >
      <Select
        name="month-selector"
        className={classnames(
          styles.dropdown,
          this.props.classNames.dropdownMonth
        )}
        placeholder={this.props.placeholderMonth}
        value={toOneBasedNumbering(this.state.month)}
        options={this.monthOptions}
        onChange={option => this.handleSelectionChange('month', option)}
        clearable={false}
        backspaceRemoves={false}
        searchable={true}
        openAfterFocus={true}
        disabled={this.props.disabled}
      />
    </li>
  );

  renderDaySelect = () => {
    let dayOptions = [];
    if (this.state.year && !isNaN(this.state.month)) {
      // Get the total amount of days for the given date (years and months)
      const maxDay = moment
        .utc([this.state.year, this.state.month])
        .daysInMonth();

      dayOptions = range(1, maxDay + 1).map(key => ({
        value: key,
        label: key,
      }));
    }
    const isDaySelectionDisabled = !dayOptions.length;

    return (
      <li
        key={`${this.props.name}-day`}
        className={classnames(
          styles['list-item-day'],
          this.props.classNames.listItem
        )}
      >
        <Select
          name="day-selector"
          className={classnames(
            styles.dropdown,
            this.props.classNames.dropdownDay
          )}
          placeholder={this.props.placeholderDay}
          value={this.state.day}
          valueRenderer={this.renderDayLabel}
          options={dayOptions}
          optionRenderer={this.renderDayLabel}
          onChange={option => this.handleSelectionChange('day', option)}
          clearable={false}
          backspaceRemoves={false}
          searchable={true}
          openAfterFocus={true}
          disabled={isDaySelectionDisabled || this.props.disabled}
        />
      </li>
    );
  };

  state = this.parseDateValues(this.props.value);

  render() {
    return (
      <div
        className={classnames(
          styles.container,
          this.props.classNames.container
        )}
      >
        <div
          id={`${this.props.name}-container-left`}
          className={classnames(
            styles['container-left'],
            this.props.classNames.containerLeft,
            { [styles['container-full']]: !this.props.clearable }
          )}
        >
          <ul className={classnames(styles.list, this.props.classNames.list)}>
            {this.props.orderPosition.map(key => {
              if (key === 'y') return this.renderYearSelect();
              if (key === 'm') return this.renderMonthSelect();
              if (key === 'd') return this.renderDaySelect();
              return null;
            })}
          </ul>
        </div>

        {this.props.clearable ? (
          <div
            id={`${this.props.name}-container-right`}
            className={classnames(
              styles['container-right'],
              this.props.classNames.containerRight
            )}
          >
            <div
              className={classnames(
                styles['clear-button'],
                this.props.classNames.clearButton
              )}
              onClick={this.handleClearAll}
            >
              {typeof clearButton === 'string' ? (
                <span>{this.props.clearButton}</span>
              ) : (
                this.props.clearButton
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default DateSelector;
