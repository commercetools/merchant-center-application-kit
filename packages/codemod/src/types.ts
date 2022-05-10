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

export type TCliCommand =
  | 'remove-deprecated-modal-level-props'
  | 'rename-js-to-jsx';

export type TCliCommandArguments = [
  transform: TCliCommand,
  globPattern: string
];
