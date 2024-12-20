import { readFileSync } from 'node:fs';
import { extname } from 'node:path';
import { expect } from '@jest/globals';
import { API, FileInfo, Options } from 'jscodeshift';

type TTransformerModule =
  | {
      default: (
        fileInfo: Partial<FileInfo>,
        api: API,
        options: Options
      ) => Promise<string> | string;
      parser: string;
    }
  | ((
      fileInfo: Partial<FileInfo>,
      api: API,
      options: Options
    ) => Promise<string> | string);

type TApplyTransformParams = {
  transformerModule: TTransformerModule;
  transformerOptions?: Options;
  codeToTransform: Partial<FileInfo>;
  testOptions?: {
    parser?: string;
  };
};

function applyTransform({
  transformerModule,
  transformerOptions,
  codeToTransform,
  testOptions = {},
}: TApplyTransformParams) {
  // Handle ES6 modules using default export for the transform
  const transform =
    'default' in transformerModule
      ? transformerModule.default
      : transformerModule;
  const moduleParser =
    'default' in transformerModule ? transformerModule.parser : null;

  // Jest resets the module registry after each test, so we need to always get
  // a fresh copy of jscodeshift on every test run.
  let jscodeshift = require('jscodeshift');
  if (testOptions.parser || moduleParser) {
    jscodeshift = jscodeshift.withParser(testOptions.parser || moduleParser);
  }

  const transformationResult = transform(
    codeToTransform,
    {
      jscodeshift,
      j: jscodeshift,
      stats: () => {},
      report: (msg: string) => console.log(msg), // Add the missing report function
    },
    transformerOptions || {}
  );

  if (transformationResult instanceof Promise) {
    return transformationResult.then((result) => (result || '').trim());
  }

  return (transformationResult || '').trim();
}

type TRunSnapshotTestParams = {
  transformerModule: TTransformerModule;
  transformerOptions?: Options;
  codeToTransformPath: string;
};
export function runSnapshotTest({
  transformerModule,
  transformerOptions,
  codeToTransformPath,
}: TRunSnapshotTestParams): Promise<void> | undefined {
  const source = readFileSync(codeToTransformPath, 'utf8');
  const transformationResult = applyTransform({
    transformerModule,
    transformerOptions,
    codeToTransform: {
      path: codeToTransformPath,
      source,
    },
    testOptions: {
      parser: extname(codeToTransformPath).slice(1),
    },
  });

  if (transformationResult instanceof Promise) {
    return transformationResult.then((result) => {
      expect(result).toMatchSnapshot();
    });
  }

  expect(transformationResult).toMatchSnapshot();
  return undefined;
}
