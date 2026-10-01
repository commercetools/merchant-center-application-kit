import {
  isProjectKeylessApplicationEntryPoint,
  isProjectKeylessApplicationEntryPointInProjectContext,
  isStaticUrlPathInPositionOfProjectKey,
} from './constants';

describe.each`
  value                      | expected
  ${'agent-sphere'}          | ${true}
  ${'agent-sphere/registry'} | ${true}
  ${'agent-sphere/insights'} | ${true}
  ${'account'}               | ${true}
  ${'account/profile'}       | ${true}
  ${'login'}                 | ${false}
  ${'products'}              | ${false}
  ${'my-project'}            | ${false}
`(
  'isProjectKeylessApplicationEntryPoint("$value")',
  ({ value, expected }: { value: string; expected: boolean }) => {
    it(`should return ${expected}`, () => {
      expect(isProjectKeylessApplicationEntryPoint(value)).toBe(expected);
    });
  }
);

describe.each`
  value                      | expected
  ${'agent-sphere'}          | ${true}
  ${'agent-sphere/registry'} | ${true}
  ${'agent-sphere/insights'} | ${true}
  ${'account'}               | ${false}
  ${'account/profile'}       | ${false}
  ${'products'}              | ${false}
`(
  'isProjectKeylessApplicationEntryPointInProjectContext("$value")',
  ({ value, expected }: { value: string; expected: boolean }) => {
    it(`should return ${expected}`, () => {
      expect(isProjectKeylessApplicationEntryPointInProjectContext(value)).toBe(
        expected
      );
    });
  }
);

describe.each`
  value                      | expected
  ${'agent-sphere'}          | ${true}
  ${'agent-sphere/registry'} | ${true}
  ${'account'}               | ${true}
  ${'login'}                 | ${true}
  ${'logout'}                | ${true}
  ${'products'}              | ${false}
`(
  'isStaticUrlPathInPositionOfProjectKey("$value")',
  ({ value, expected }: { value: string; expected: boolean }) => {
    it(`should return ${expected}`, () => {
      expect(isStaticUrlPathInPositionOfProjectKey(value)).toBe(expected);
    });
  }
);
