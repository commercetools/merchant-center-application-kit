import { applicationTypes, availableTemplates } from './constants';

export type TCliGlobalOptions = {
  '--'?: string[];
};

export type TApplicationType = keyof typeof applicationTypes;
export type TTemplate = keyof typeof availableTemplates;
export type TPackageManager = 'npm' | 'yarn' | 'pnpm';

export type TCliCommandOptions = {
  applicationType: TApplicationType;
  template: TTemplate;
  templateVersion: string;
  skipInstall: boolean;
  yes: boolean;
  entryPointUriPath?: string;
  initialProjectKey?: string;
  cloudIdentifier?: string;
  packageManager?: TPackageManager;
};

export type TCliTaskOptions = {
  applicationType: TApplicationType;
  projectDirectoryName: string;
  projectDirectoryPath: string;
  templateName: TCliCommandOptions['template'];
  tagOrBranchVersion: string;
  // Absolute path to the temporary directory where the app-kit repo is
  // cloned by `downloadTemplate`. Subsequent tasks read pnpm-workspace.yaml
  // from here to resolve catalog references in the scaffolded package.json.
  clonedRepositoryPath: string;
  entryPointUriPath?: string;
  initialProjectKey: string;
  cloudIdentifier: string;
  packageManager: TCliCommandOptions['packageManager'];
};
