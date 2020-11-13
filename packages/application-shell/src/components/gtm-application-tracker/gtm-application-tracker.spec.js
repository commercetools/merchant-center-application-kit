import React from 'react';
import { render, waitFor } from '@testing-library/react';
import GtmApplicationTracker from './gtm-application-tracker';

describe('rendering', () => {
  it('should send custom dimensions to gtm', async () => {
    window.app = { trackingGtm: '111' };
    window.dataLayer = [];
    render(
      <GtmApplicationTracker
        applicationName="playground"
        projectKey="project-key"
        userBusinessRole="Other"
      />
    );
    await waitFor(() => {
      expect(window.dataLayer).toEqual(
        expect.arrayContaining([
          { applicationName: 'playground' },
          { projectKey: 'project-key' },
          { userBusinessRole: 'Other' },
        ])
      );
    });
  });
});
