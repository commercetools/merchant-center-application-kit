import React from 'react';
import { shallow } from 'enzyme';
import { MeasureFirstPaint } from './measure-first-paint';

const createTestProps = custom => ({
  application: 'application-foo',
  projectKey: 'test-project',
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
  pushMetricHistogram: jest.fn(() => Promise.resolve()),
  ...custom,
});

jest.mock('perfume.js', () =>
  jest.fn(() => ({
    firstPaintDuration: 1,
    firstContentfulPaintDuration: 2,
    observeTimeToInteractive: jest.fn(() => Promise.resolve(1234.22)),
  }))
);

describe('lifecycle', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<MeasureFirstPaint {...props} />);
  });

  describe('`componentDidMount`', () => {
    beforeEach(() => {
      wrapper.instance().componentDidMount();
    });

    describe('pushing metric histograms', () => {
      it('should push the first paint metric as a histograms', () => {
        expect(props.pushMetricHistogram).toHaveBeenCalledWith({
          payload: expect.arrayContaining([
            expect.objectContaining({
              metricName: 'browser_duration_first_paint_buckets_milliseconds',
            }),
          ]),
        });
      });

      it('should push the first contentful paint metric as a histograms', () => {
        expect(props.pushMetricHistogram).toHaveBeenCalledWith({
          payload: expect.arrayContaining([
            expect.objectContaining({
              metricName:
                'browser_duration_first_contentful_paint_buckets_milliseconds',
            }),
          ]),
        });
      });

      it('should push the time to interactive metric as a histograms', () => {
        expect(props.pushMetricHistogram).toHaveBeenCalledWith({
          payload: expect.arrayContaining([
            expect.objectContaining({
              metricName:
                'browser_duration_time_to_interactive_buckets_milliseconds',
            }),
          ]),
        });
      });

      describe('metric values', () => {
        it('should push the first paint', () => {
          expect(props.pushMetricHistogram).toHaveBeenCalledWith({
            payload: expect.arrayContaining([
              expect.objectContaining({
                metricValue: 1,
              }),
            ]),
          });
        });

        it('should push the first contentful paint', () => {
          expect(props.pushMetricHistogram).toHaveBeenCalledWith({
            payload: expect.arrayContaining([
              expect.objectContaining({
                metricValue: 2,
              }),
            ]),
          });
        });
      });

      describe('metric labels', () => {
        it('should push the user agent with metrics', () => {
          expect(props.pushMetricHistogram).toHaveBeenCalledWith({
            payload: expect.arrayContaining([
              expect.objectContaining({
                metricLabels: expect.objectContaining({
                  user_agent: props.userAgent,
                }),
              }),
            ]),
          });
        });

        it('should push the application with metrics', () => {
          expect(props.pushMetricHistogram).toHaveBeenCalledWith({
            payload: expect.arrayContaining([
              expect.objectContaining({
                metricLabels: expect.objectContaining({
                  application: props.application,
                }),
              }),
            ]),
          });
        });

        it('should push the project key with metrics', () => {
          expect(props.pushMetricHistogram).toHaveBeenCalledWith({
            payload: expect.arrayContaining([
              expect.objectContaining({
                metricLabels: expect.objectContaining({
                  project_key: props.projectKey,
                }),
              }),
            ]),
          });
        });
      });
    });
  });
});

describe('statics', () => {
  describe('tracker', () => {
    it('should assign `Perfume` as the `tracker`', () => {
      expect(MeasureFirstPaint.tracker).toBeDefined();
    });
  });
});
