import React from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useAsyncDispatch } from '@commercetools-frontend/sdk';
import applicationShellVersion from '../../version';
import { pushDependencyVersionCounter } from './actions';

type VersionMetricOptions = {
  applicationName: string;
};
type VersionMetric = {
  metricName: string;
  metricLabels: {
    application: string;
    package_name: string;
    package_version: string;
  };
};

const createVersionMetric = ({
  applicationName,
}: VersionMetricOptions): VersionMetric[] => [
  {
    metricName: 'npm_dependency_versions',
    metricLabels: {
      application: applicationName,
      package_name: '@commercetools-frontend/application-shell',
      package_version: applicationShellVersion,
    },
  },
  {
    metricName: 'npm_dependency_versions',
    metricLabels: {
      application: applicationName,
      package_name: 'react',
      package_version: React.version,
    },
  },
];

const VersionTracker = () => {
  const applicationName = useApplicationContext(
    (context) => context.environment.applicationName
  );
  const dispatch = useAsyncDispatch<
    ReturnType<typeof pushDependencyVersionCounter>,
    unknown
  >();
  React.useEffect(() => {
    dispatch(
      pushDependencyVersionCounter({
        payload: createVersionMetric({
          applicationName,
        }),
      })
    ).catch(() => {
      // Error is ignored under the assumption that page is being
      // reloaded whilst the request was being sent or network request was interrupted
    });
  }, [applicationName, dispatch]);

  return null;
};
VersionTracker.displayName = 'VersionTracker';

export default VersionTracker;
