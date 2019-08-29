import { basename } from 'path';
import { ESLintUtils } from '@typescript-eslint/experimental-utils';
import { version, repository } from '../package.json';

const REPO_URL = repository.url;

export const createRule = ESLintUtils.RuleCreator(name => {
  const ruleName = basename(name, '.js');
  return `${REPO_URL}/blob/v${version}/docs/rules/${ruleName}.md`;
});
