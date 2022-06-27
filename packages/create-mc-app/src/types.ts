export type TCliGlobalOptions = {
  '--'?: string[];
};

export type TCliCommandOptions = {
  template?: string;
  'template-version'?: string;
  'skip-install'?: boolean;
  yes?: boolean;
  'entry-point-uri-path'?: string;
  'initial-project-key'?: string;
};

export type TCliTaskOptions = {
  projectDirectoryName: string;
  projectDirectoryPath: string;
  templateName: string;
  tagOrBranchVersion: string;
  entryPointUriPath: string;
  initialProjectKey: string;
};
