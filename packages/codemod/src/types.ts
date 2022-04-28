export type TRunnerOptions = {
  ignorePattern?: string[];
  extensions?: string;
  parser?: 'babylon' | 'flow' | 'ts' | 'tsx' | 'babel';
  verbose?: number;
  runInBand?: boolean;
  dry?: boolean;
};

export type TCliFlags = {
  help: boolean;
  'dry-run': boolean;
};
