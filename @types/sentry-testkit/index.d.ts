declare module 'sentry-testkit' {
  import { TransportClass, Transport } from '@sentry/types';

  interface ExceptionValue {
    type: string;
    value: string;
  }
  interface Exception {
    values: ExceptionValue[];
  }
  interface Report {
    exception: Exception;
    event_id: string;
    extra: object;
  }
  interface TestKit {
    reports(): Report[];
    reset(): void;
  }
  interface SentryTestKit {
    testkit: TestKit;
    sentryTransport: TransportClass<Transport>;
  }
  const createTestKit: () => SentryTestKit;
  export default createTestKit;
}
