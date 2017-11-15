import React from 'react';
import { shallow } from 'enzyme';
import DateSelector from './date-selector';

function createTestProps(props) {
  return {
    name: 'test-date',
    value: undefined,
    locale: 'en',
    onChange: jest.fn(),
    minYear: 2010,
    maxYear: 2016,

    placeholderYear: 'Year',
    placeholderMonth: 'Month',
    placeholderDay: 'Day',
    clearable: true,
    cancelButton: 'Clear all',
    classNames: {},

    ...props,
  };
}

describe('rendering', () => {
  let props;
  let wrapper;
  describe('defaultProps', () => {
    it('should default the `disabled` prop', () => {
      expect(DateSelector.defaultProps.disabled).toBe(false);
    });
  });
  describe('render base elements', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<DateSelector {...props} />);
    });

    it('should render 3 list items', () => {
      expect(wrapper.find('li')).toHaveLength(3);
    });

    it('should render year selector', () => {
      expect(wrapper).toRender({ name: 'year-selector' });
    });

    it('should render month selector', () => {
      expect(wrapper).toRender({ name: 'month-selector' });
    });

    it('should render day selector', () => {
      expect(wrapper).toRender({ name: 'day-selector' });
    });

    it('should day selector is disabled by default', () => {
      expect(wrapper.find({ name: 'day-selector' })).toBeDisabled();
    });

    it('should render text for clear button', () => {
      expect(wrapper.find('#test-date-container-right')).toHaveText(
        'Clear all'
      );
    });

    it('should initialize state', () => {
      expect(wrapper.state()).toEqual({
        day: undefined,
        month: undefined,
        year: undefined,
      });
    });

    it('should initialize list of year options', () => {
      expect(wrapper.instance().yearOptions).toEqual([
        { label: 2016, value: 2016 },
        { label: 2015, value: 2015 },
        { label: 2014, value: 2014 },
        { label: 2013, value: 2013 },
        { label: 2012, value: 2012 },
        { label: 2011, value: 2011 },
        { label: 2010, value: 2010 },
      ]);
    });

    it('should initialize list of month options', () => {
      expect(wrapper.instance().monthOptions).toEqual([
        { label: 'January', value: 1 },
        { label: 'February', value: 2 },
        { label: 'March', value: 3 },
        { label: 'April', value: 4 },
        { label: 'May', value: 5 },
        { label: 'June', value: 6 },
        { label: 'July', value: 7 },
        { label: 'August', value: 8 },
        { label: 'September', value: 9 },
        { label: 'October', value: 10 },
        { label: 'November', value: 11 },
        { label: 'December', value: 12 },
      ]);
    });
  });

  describe('render correct list of years / months options', () => {
    describe('year', () => {
      beforeEach(() => {
        props = createTestProps({
          minYear: 2000,
          maxYear: 2005,
        });
        wrapper = shallow(<DateSelector {...props} />);
      });

      it('should render reverse list of years options', () => {
        // Year
        const selectYear = wrapper.find('Select').at(0 /* year */);
        expect(selectYear.prop('options').map(o => o.value)).toEqual([
          2005,
          2004,
          2003,
          2002,
          2001,
          2000,
        ]);
      });
    });

    describe('month (en)', () => {
      beforeEach(() => {
        props = createTestProps({
          minYear: 2000,
          maxYear: 2005,
        });
        wrapper = shallow(<DateSelector {...props} />);
      });

      it('should render list of months (en)', () => {
        const selectMonth = wrapper.find('Select').at(1 /* month */);
        // Month (en)
        expect(selectMonth.prop('options').map(o => o.label)).toEqual([
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ]);
      });
    });

    describe('month (de)', () => {
      beforeEach(() => {
        props = createTestProps({
          locale: 'de',
          minYear: 2000,
          maxYear: 2005,
        });
        wrapper = shallow(<DateSelector {...props} />);
      });
      it('should render list of months (de)', () => {
        const selectMonth = wrapper.find('Select').at(1 /* month */);
        // Month (de)
        expect(selectMonth.prop('options').map(o => o.label)).toEqual([
          'Januar',
          'Februar',
          'März',
          'April',
          'Mai',
          'Juni',
          'Juli',
          'August',
          'September',
          'Oktober',
          'November',
          'Dezember',
        ]);
      });
    });

    describe('min year', () => {
      beforeEach(() => {
        props = createTestProps({
          minYear: 2004,
          maxYear: 2005,
        });
        wrapper = shallow(<DateSelector {...props} />);
      });
      it('should render updated list of year options with a different minYear', () => {
        const selectYear = wrapper.find('Select').at(0 /* year */);
        expect(selectYear.prop('options').map(o => o.value)).toEqual([
          2005,
          2004,
        ]);
      });
    });

    describe('max year', () => {
      beforeEach(() => {
        props = createTestProps({
          minYear: 2004,
          maxYear: 2007,
        });
        wrapper = shallow(<DateSelector {...props} />);
      });
      it('should render updated list of year options with a different maxYear', () => {
        const selectYear = wrapper.find('Select').at(0 /* year */);
        // Change maxYear
        expect(selectYear.prop('options').map(o => o.value)).toEqual([
          2007,
          2006,
          2005,
          2004,
        ]);
      });
    });
  });

  describe('render correct list of days options based on the selected month', () => {
    describe('31 days', () => {
      beforeEach(() => {
        props = createTestProps({
          value: '2016-01-31',
        });
        wrapper = shallow(<DateSelector {...props} />);
      });
      it('should render list of 31 days', () => {
        const selectDay = wrapper.find('Select').at(2 /* day */);
        // January: 1 - 31
        expect(selectDay.prop('options').map(o => o.value)).toEqual([
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
          30,
          31,
        ]);
      });
      it('should pass correct selected value', () => {
        const selectDay = wrapper.find('Select').at(2 /* day */);
        // expect(selectDay.prop('value')).toEqual(31);
        expect(selectDay).toHaveProp('value', 31);
      });

      describe('change to another month with 31 days', () => {
        beforeEach(() => {
          wrapper.setState({ month: 2 });
        });
        // At this point the selected day is `31`.
        // We then change the month to a new month that also has `31` days.
        // We expect the day to still be selected.
        it('should render list of 31 days', () => {
          const selectDay2 = wrapper.find('Select').at(2 /* day */);
          // May: 1 - 31
          expect(selectDay2.prop('options').map(o => o.label)).toEqual([
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
          ]);
        });
        it('should keep day value, as the selected month still has 31 days', () => {
          // expect(wrapper.state('day')).toEqual(31);
          expect(wrapper).toHaveState('day', 31);
        });
      });
    });

    describe('29 days', () => {
      beforeEach(() => {
        props = createTestProps({
          value: '2016-02-29',
        });
        wrapper = shallow(<DateSelector {...props} />);
      });
      it('should render list of 29 days', () => {
        const selectDay = wrapper.find('Select').at(2 /* day */);
        // Februar: 29
        expect(selectDay.prop('options').map(o => o.label)).toEqual([
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
        ]);
      });
      it('should pass correct selected value', () => {
        const selectDay = wrapper.find('Select').at(2 /* day */);
        expect(selectDay).toHaveProp('value', 29);
      });
    });
  });

  describe('update date values when props change', () => {
    beforeEach(() => {
      props = createTestProps({
        value: '2016-01-02',
      });
      wrapper = shallow(<DateSelector {...props} />);
    });

    it('should initialize state with given date value', () => {
      expect(wrapper.state()).toEqual({
        year: 2016,
        month: 0,
        day: 2,
      });
    });

    it('should update state with new date value', () => {
      wrapper.setProps({ value: '2015-09-20' });
      expect(wrapper.state()).toEqual({
        year: 2015,
        month: 8,
        day: 20,
      });
    });
  });

  describe('not render clear button if not clearable', () => {
    beforeEach(() => {
      props = createTestProps({
        clearable: false,
      });
      wrapper = shallow(<DateSelector {...props} />);
    });

    it('should do not render right container for clear button', () => {
      expect(wrapper).not.toRender('#test-date-container-right');
    });
  });

  describe('when date-selector is disabled', () => {
    beforeEach(() => {
      props = createTestProps({
        disabled: true,
      });
      wrapper = shallow(<DateSelector {...props} />);
    });

    it('year selector should be disabled', () => {
      expect(wrapper.find({ name: 'year-selector' })).toBeDisabled();
    });

    it('month selector should be disabled', () => {
      expect(wrapper.find({ name: 'month-selector' })).toBeDisabled();
    });

    it('day selector should be disabled', () => {
      expect(wrapper.find({ name: 'day-selector' })).toBeDisabled();
    });
  });
});

describe('callbacks', () => {
  let props;
  let wrapper;
  describe('trigger onChange only when all 3 values are selected', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<DateSelector {...props} />);
    });

    // Year
    describe('when selecting year selector control', () => {
      beforeEach(() => {
        const selectYear = wrapper.find('Select').at(0 /* year */);
        selectYear.prop('onChange')({ value: 2016 });
      });

      it('should not trigger onChange', () => {
        expect(props.onChange).not.toHaveBeenCalled();
      });

      it('should update state for year', () => {
        expect(wrapper.state()).toEqual({
          year: 2016,
          month: undefined,
          day: undefined,
        });
      });
    });

    // Month
    describe('when selecting month selector control', () => {
      beforeEach(() => {
        wrapper.setState({ year: 2016 });
        const selectMonth = wrapper.find('Select').at(1 /* month */);
        selectMonth.prop('onChange')({ value: 3 });
      });

      it('should not trigger onChange', () => {
        expect(props.onChange).not.toHaveBeenCalled();
      });

      it('should update state for month', () => {
        expect(wrapper.state()).toEqual({
          year: 2016,
          month: 2,
          day: undefined,
        });
      });
    });

    // Day
    describe('when selecting day selector control', () => {
      beforeEach(() => {
        wrapper.setState({ year: 2016, month: 3 });
        const selectDay = wrapper.find('Select').at(2 /* day */);
        selectDay.prop('onChange')({ value: 15 });
      });

      it('should trigger onChange', () => {
        expect(props.onChange).toHaveBeenCalled();
      });

      it('should pass formatted date string to onChange', () => {
        expect(props.onChange).toHaveBeenCalledWith('2016-04-15');
      });

      it('should update state for day', () => {
        expect(wrapper.state()).toEqual({
          year: 2016,
          month: 3,
          day: 15,
        });
      });
    });
  });

  describe('clear selected date', () => {
    beforeEach(() => {
      props = createTestProps({
        value: '2016-04-15',
        clearable: true,
      });
      wrapper = shallow(<DateSelector {...props} />);
      wrapper.find({ className: 'clear-button' }).prop('onClick')();
    });

    it('should call onChange when clearing values', () => {
      expect(props.onChange).toHaveBeenCalledTimes(1);
    });

    it('should call onChange with no value', () => {
      expect(props.onChange).toHaveBeenCalledWith();
    });

    it('should reset state', () => {
      expect(wrapper.state()).toEqual({
        year: undefined,
        month: undefined,
        day: undefined,
      });
    });
  });

  describe('clear selected date for a custom clear button', () => {
    beforeEach(() => {
      const CustomClearButton = () => (
        <span onClick={() => {}}>{'A custom clear button'}</span>
      );
      props = createTestProps({
        value: '2016-04-15',
        clearButton: <CustomClearButton />,
        clearable: true,
      });
      wrapper = shallow(<DateSelector {...props} />);
      wrapper.find({ className: 'clear-button' }).prop('onClick')();
    });

    it('should call onChange when clearing values', () => {
      expect(props.onChange).toHaveBeenCalledTimes(1);
    });

    it('should call onChange with no value', () => {
      expect(props.onChange).toHaveBeenCalledWith();
    });

    it('should reset state', () => {
      expect(wrapper.state()).toEqual({
        year: undefined,
        month: undefined,
        day: undefined,
      });
    });
  });
});
