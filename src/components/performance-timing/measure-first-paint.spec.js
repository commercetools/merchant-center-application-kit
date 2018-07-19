import React from 'react';
import { shallow } from 'enzyme';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { MeasureFirstPaint } from './measure-first-paint';

const createTestProps = custom => ({
  application: 'application-foo',
  projectKey: 'test-project',
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
  pushMetricSummary: jest.fn(() => Promise.resolve()),
  browserPerformanceApi: {
    getEntriesByType: jest.fn(() => [
      { name: 'firstPaint', startTime: 2028.5 },
      { name: 'firstContentfulPaint', startTime: 2028.5 },
    ]),
  },
  ...custom,
});

jest.mock('@commercetools-frontend/sentry');

describe('lifecycle', () => {
  let props;
  let wrapper;

  describe('`componentDidMount`', () => {
    describe('without `browserPerformanceApi.getEntriesByType`', () => {
      beforeEach(() => {
        props = createTestProps({
          browserPerformanceApi: {},
        });
        wrapper = shallow(<MeasureFirstPaint {...props} />);

        wrapper.instance().componentDidMount();
      });

      it('should not send an action with the mapped metrics', () => {
        expect(props.pushMetricSummary).not.toHaveBeenCalled();
      });
    });

    describe('with `browserPerformanceApi.getEntriesByType`', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<MeasureFirstPaint {...props} />);

        wrapper.instance().componentDidMount();
      });

      it('should send an action with the mapped metrics', () => {
        expect(props.pushMetricSummary).toHaveBeenCalledWith({
          body: JSON.stringify([
            {
              metricName: 'browser_duration_first_paint_milliseconds',
              metricValue: 2028.5,
              metricLabels: {
                application: props.application,
                user_agent: props.userAgent,
                project_key: props.projectKey,
              },
            },
            {
              metricName:
                'browser_duration_first_contentful_paint_milliseconds',
              metricValue: 2028.5,
              metricLabels: {
                application: props.application,
                user_agent: props.userAgent,
                project_key: props.projectKey,
              },
            },
          ]),
        });
      });
      it('should not report error to sentry', () => {
        expect(reportErrorToSentry).not.toHaveBeenCalled();
      });
      describe('when request fails', () => {
        let error;
        beforeEach(() => {
          error = new Error('Oops');
          props = createTestProps({
            pushMetricSummary: jest.fn(() => Promise.reject(error)),
          });
          wrapper = shallow(<MeasureFirstPaint {...props} />);
          wrapper.instance().componentDidMount();
        });
        it('should not report error to sentry', () => {
          expect(reportErrorToSentry).toHaveBeenCalledWith(
            new Error('Unable to push first-paint metrics'),
            { extra: error }
          );
        });
      });
    });
  });
});
