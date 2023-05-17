export type TCliGlobalOptions = {
  '--'?: string[];
};

export type TTemplate = 'starter' | 'starter-typescript';
export type TPackageManager = 'npm' | 'yarn' | 'pnpm';

export type TCliCommandOptions = {
  template: TTemplate;
  templateVersion: string;
  skipInstall: boolean;
  yes: boolean;
  entryPointUriPath?: string;
  initialProjectKey?: string;
  packageManager?: TPackageManager;
  packageManagerVersion?: string;
};

export type TCliTaskOptions = {
  projectDirectoryName: string;
  projectDirectoryPath: string;
  templateName: TCliCommandOptions['template'];
  tagOrBranchVersion: string;
  entryPointUriPath: string;
  initialProjectKey: string;
  packageManager: TCliCommandOptions['packageManager'];
  // Required if `packageManager` is defined.
  packageManagerVersion: TCliCommandOptions['packageManagerVersion'];
};
