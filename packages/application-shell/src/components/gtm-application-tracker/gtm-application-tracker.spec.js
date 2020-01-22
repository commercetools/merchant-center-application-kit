import React from 'react';
import { render, wait } from '@testing-library/react';
import GtmApplicationTracker from './gtm-application-tracker';

describe('rendering', () => {
  it('should send custom dimensions to gtm', async () => {
    window.app = { trackingGtm: '111' };
    window.dataLayer = [];
    render(
      <GtmApplicationTracker
        applicationName="playground"
        projectKey="project-key"
      />
    );
    await wait(() => {
      expect(window.dataLayer).toEqual(
        expect.arrayContaining([
          { applicationName: 'playground' },
          { projectKey: 'project-key' },
        ])
      );
    });
  });
});
