export type TCliGlobalOptions = {
  '--'?: string[];
};

export type TCliCommandOptions = {
  template: 'starter' | 'starter-typescript';
  templateVersion: string;
  skipInstall: boolean;
  yes: boolean;
  entryPointUriPath?: string;
  initialProjectKey?: string;
};

export type TCliTaskOptions = {
  projectDirectoryName: string;
  projectDirectoryPath: string;
  templateName: TCliCommandOptions['template'];
  tagOrBranchVersion: string;
  entryPointUriPath: string;
  initialProjectKey: string;
};
