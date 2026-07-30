---
name: renovate-migrate
description: Perform migrations for Renovate dependency upgrades based on breaking changes identified in a review. Use after running /renovate-review.
disable-model-invocation: false
argument-hint: '[pr-number] [--comment] [--push]'
allowed-tools: Bash, Grep, Glob, Read, Edit, Write, WebFetch
scope:
  - dependencies
  - migration
---

# Renovate Dependency Migration

Perform code migrations for a Renovate PR based on breaking changes identified during review.

## Arguments

- `pr-number` (required): The PR number to migrate
- `--comment` (optional): Post the migration summary as a PR comment. If omitted, only output the summary locally.
- `--push` (optional): Push commits to the remote after completing migrations. If omitted, only commits locally.

## Prerequisites

This skill should be run after `/renovate-review` has identified breaking changes that require code modifications.

## Process

### 1. Load Review Context

First, check if the review information is already available:

**Option A: Check conversation context**
If `/renovate-review` was run earlier in the same conversation, the review details (breaking changes, affected files, required code changes) should already be in context. Use that information directly.

**Option B: Load from GitHub PR comment**
If not in context, fetch the review comment from the PR:

```bash
gh pr view <pr-number> --json comments --jq '.comments[] | select(.body | contains("## Dependency Upgrade Review")) | .body'
```

From the review comment, extract:

- Package name and version change
- Upgrade type (patch/minor/major)
- Breaking changes that affect this codebase
- List of affected files and required code changes

### 2. Gather Additional PR Context

```bash
gh pr view <pr-number> --json title,body,files
```

Use this to supplement the review information if needed (e.g., to get the full list of files changed by Renovate).

### 3. Perform Migrations

Use the "Required Code Changes" section from the review to guide migrations. For each breaking change:

1. **Reference the review**: The review already identified what API changed and how
2. **Find all occurrences**: Search for the old API usage (review may have already listed these)
3. **Apply the fix**: Update code to use the new API as specified in the review
4. **Commit immediately**: Make a small, focused commit

#### Commit Guidelines

- Make **one commit per logical change** (e.g., one commit per breaking change addressed)
- Keep commits small and focused
- Use this commit message format:

```
refactor: migrate <package-name> to v<version> - <specific change>

<brief description of what was changed and why>
```

Example commit messages:

- `refactor: migrate p-retry to v7 - use named export`
- `refactor: migrate lodash to v5 - replace _.pluck with _.map`
- `refactor: migrate react-query to v5 - update useQuery options`

#### How to Commit

Branches that require verified signatures reject commits pushed from CI with plain `git`, because runner commits are unsigned. Match the mechanism to the environment:

- **CI (verified via the GitHub CLI)**: create the commit through the API with `gh` — no extra tooling or MCP server. The GraphQL `createCommitOnBranch` mutation writes directly to the PR branch and GitHub **signs** the commit, so it lands as **verified** with no separate push. Target the PR head branch explicitly (never the base branch):

```bash
REPO="<owner>/<repo>"        # e.g. commercetools/merchant-center-services
BRANCH="<pr-head-branch>"    # the PR's head ref (gh pr view <pr> --json headRefName -q .headRefName)

# Current tip of the branch — required guard. Re-read before every commit.
HEAD_OID=$(gh api "repos/$REPO/git/ref/heads/$BRANCH" --jq .object.sha)

gh api graphql -f query='
  mutation ($input: CreateCommitOnBranchInput!) {
    createCommitOnBranch(input: $input) { commit { oid } }
  }' -F input="$(jq -n \
    --arg repo "$REPO" --arg branch "$BRANCH" --arg oid "$HEAD_OID" \
    --arg headline "refactor: migrate <package> to v<version> - <change>" \
    --arg path "<changed-file>" --arg contents "$(base64 -w0 <changed-file>)" \
    '{branch:{repositoryNameWithOwner:$repo,branchName:$branch},
      message:{headline:$headline},
      expectedHeadOid:$oid,
      fileChanges:{additions:[{path:$path,contents:$contents}]}}')"
```

Add one `additions` entry per modified file (`contents` base64-encoded); list removed files under `fileChanges:{deletions:[{path:...}]}`. For multiple commits, re-read `HEAD_OID` before each — the tip moves with every API commit.

**Guard against empty or garbled content.** `createCommitOnBranch` commits exactly the `contents` you send, decoupled from the working tree, so a bad base64 string lands silently as a corrupt commit (e.g. a 0-byte file) while local verification still passes. Protect every commit on both sides.

Before encoding, refuse to commit a missing or empty file:

```bash
for f in <changed-file> ...; do
  [ -s "$f" ] || { echo "refusing to commit empty file: $f" >&2; exit 1; }
done
```

After the mutation, read each file back at the new commit and confirm its blob hash matches the working tree — `git hash-object` produces the same SHA GitHub stores, so this is an exact content check:

```bash
NEW_OID=$(gh api "repos/$REPO/git/ref/heads/$BRANCH" --jq .object.sha)
for f in <changed-file> ...; do
  remote_sha=$(gh api "repos/$REPO/contents/$f?ref=$NEW_OID" --jq .sha)
  [ "$remote_sha" = "$(git hash-object "$f")" ] \
    || { echo "commit content mismatch for $f — aborting" >&2; exit 1; }
done
```

Only report the migration as successful once this check passes. If it fails, the committed content is wrong: report a failure rather than a misleading success.

- **Local / interactive**: commit with git as usual:

```bash
git add <specific-files>
git commit -m "refactor: migrate <package> to v<version> - <change>"
```

### 4. Verify Changes

After all migrations:

1. Ensure the code compiles: `pnpm run build` or `pnpm run build:ts`
2. Format the code with Prettier and `pnpm run format`
3. Run relevant tests if available
4. If `--push` flag is provided, push to remote; otherwise keep changes local

### 5. Generate Summary

Create a summary of all changes made:

```markdown
## Migration Summary: `<package-name>` v<old> → v<new>

**Commits:** <count>
**Files modified:** <count>
**Status:** Build passes / Tests pass / Ready for review

<details>
<summary>Commits</summary>

- `<short-hash>` <commit message>
- ...

</details>

<details>
<summary>Changes</summary>

- `path/to/file1.ts` - <what was changed>
- ...

</details>

Run `git log --oneline -n <count>` to review, then publish the commits when ready (see step 6).
```

### 6. Push Changes (if `--push` flag provided)

Only publish to the remote if the `--push` flag was included in the arguments.

- **CI**: `createCommitOnBranch` (step 3) already wrote the verified commits to the PR branch through the API, so there is no separate push step. The migration is published once those commits are created. Only run `createCommitOnBranch` when `--push` is provided; without it, make the edits and report the summary without writing to the remote.
- **Local / interactive**: push with git:

```bash
git push
```

If `--push` is NOT provided, skip publishing and only keep changes local.

### 7. Post Summary Comment (if `--comment` flag provided)

Only post the summary to the PR if the `--comment` flag was included in the arguments.

If `--comment` is provided:

```bash
gh pr comment <pr-number> --body "<migration-summary>"
```

If `--comment` is NOT provided, skip this step and only display the summary locally.

## Important Notes

- **Push behavior**: Only push to remote if `--push` flag is provided. Otherwise, only commit locally.
- **Verified commits in CI**: On protected branches requiring verified signatures, create commits through the GitHub API with `gh` (`createCommitOnBranch`), targeting the PR head branch. GitHub signs API commits, so they pass branch protection. Plain `git commit`/`git push` from a runner is unsigned and gets rejected.
- **Small commits**: Each commit should address one specific change.
- **Verify as you go**: Run typecheck after each significant change if possible.
- **Preserve behavior**: Migrations should not change application behavior, only update API usage.
