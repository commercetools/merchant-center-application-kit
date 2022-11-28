export type TRunnerOptions = {
  ignorePattern?: string[];
  extensions?: string;
  parser?: 'babylon' | 'flow' | 'ts' | 'tsx' | 'babel';
  verbose?: number;
  runInBand?: boolean;
  dry?: boolean;
};

export type TCliGlobalOptions = {
  '--'?: string[];
  dryRun: boolean;
};

export type TCliTransformName =
  | 'remove-deprecated-modal-level-props'
  | 'rename-js-to-jsx'
  | 'rename-mod-css-to-module-css';
