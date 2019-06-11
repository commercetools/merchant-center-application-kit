declare module 'sentry-testkit' {
  import { TransportClass, Transport } from '@sentry/types';

  type ExceptionValue = {
    type: string;
    value: string;
  };
  type Exception = {
    values: ExceptionValue[];
  };
  type Report = {
    exception: Exception;
    event_id: string;
    extra: object;
  };
  type TestKit = {
    reports(): Report[];
    reset(): void;
  };
  type SentryTestKit = {
    testkit: TestKit;
    sentryTransport: TransportClass<Transport>;
  };
  const createTestKit: () => SentryTestKit;
  export default createTestKit;
}
