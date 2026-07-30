---
name: renovate-review
description: Review Renovate dependency upgrade PRs to assess safety and effort. Use when reviewing PRs from Renovate bot that update NPM dependencies.
disable-model-invocation: false
argument-hint: '[pr-number] [--comment] [--label]'
allowed-tools: Bash, Grep, Glob, Read, WebFetch
scope:
  - dependencies
  - review
---

# Renovate Dependency Upgrade Review

Review a Renovate PR to assess the safety and effort required to merge a dependency upgrade.

## Arguments

- `pr-number` (required): The PR number to review
- `--comment` (optional): Post the assessment as a PR comment. If omitted, only output the review locally.
- `--label` (optional): Apply a `🤖 Risk: <Level>` label to the PR matching the assessed risk. If omitted, no labels are changed.

## Process

### 1. Gather PR Information

```bash
gh pr view $ARGUMENTS --json title,body,files
```

Extract the following information:

- Package name being upgraded
- Previous version and new version
- Determine upgrade type: **patch**, **minor**, or **major**

### 2. Analyze Upgrade Type

#### Semantic Versioning

We assume packages follow Semantic Versioning. Fix and minor should contain no breaking changes per semver

In all cases you must:

- Focus on verifying the upgrade doesn't introduce regressions
- Check if CI passes

#### Major Upgrades

1. Research breaking changes by:

   - Fetching the GitHub releases page: `https://github.com/<owner>/<repo>/releases`
   - Looking for a CHANGELOG.md in the repository
   - Checking the package's migration guide if available

2. Identify which breaking changes may affect this codebase

### 3. Analyze Codebase Impact

Search for usage of the upgraded package:

1. Find imports/requires of the package
2. Identify which files and features depend on it
3. For major upgrades: check if any deprecated/removed APIs are used

### 4. Generate Safety Assessment

Create a markdown comment with the following structure:

```markdown
## Dependency Upgrade Review: `<package-name>`

<!-- For High risk only, add at the top: -->

> [!CAUTION]
> Breaking changes affect this codebase. Code changes required before merge.

<!-- For Medium risk only, add at the top: -->

> [!WARNING]
> Major upgrade with breaking changes. Review recommended.

`<old>` → `<new>` (**patch** / **minor** / **major**)

**Risk:** Low / Medium / High
**Impact:** <count> files
**Recommendation:** Safe to merge / Review recommended / Changes required

<one-line explanation>

<details>
<summary>Affected files</summary>

- `path/to/file.ts`
- ...

</details>

<!-- For major upgrades only: -->
<details>
<summary>Breaking changes</summary>

- <breaking change 1>
- <breaking change 2>

</details>

<details>
<summary>Required code changes</summary>

- <change 1>
- <change 2>

<!-- Or "None" if no changes needed -->

</details>

<!-- claude-skill:renovate-review:cost -->
```

Always end the comment with the `<!-- claude-skill:renovate-review:cost -->`
marker on its own final line. It is a hidden anchor: after the run, the wrapper
action locates this comment by the marker and appends a run-metadata footer
(model, token usage, cost) in its place. Keep it last and do not add content
after it, or the footer will overwrite that content.

### 5. Apply the Risk Label (if `--label` flag provided) — do this BEFORE the comment

**This label is the automerge gate.** The `approve` job fires only on `🤖 Risk: Low`, so a PR you assessed as Low will not merge unless this label is actually applied. Treat applying it as the primary output of the review, not a trailing afterthought:

- Apply the label **before** posting the comment (step 6). The comment is explanatory; the label is the functional side effect.
- **Never skip this step when `--label` is set**, no matter how long the preceding analysis was. A missing label silently stalls the whole pipeline (a perfect review that never merges).

Only run this step if the `--label` flag was included. It is independent of `--comment` (label-only, comment-only, or both are all valid).

Labels follow the repo convention `🤖 Risk: <Level>` (mirroring `🤖 Type: Dependencies`), where `<Level>` is the title-cased risk: `Low`, `Medium`, or `High`.

1. Ensure the three risk labels exist, creating them idempotently with colors (green / amber / red). `--force` updates an existing label rather than failing:

   ```bash
   gh label create "🤖 Risk: Low"    --color 0E8A16 --description "Renovate upgrade: low risk" --force
   gh label create "🤖 Risk: Medium" --color FBCA04 --description "Renovate upgrade: medium risk" --force
   gh label create "🤖 Risk: High"   --color D93F0B --description "Renovate upgrade: high risk" --force
   ```

2. Risk is mutually exclusive, so strip any existing `🤖 Risk:` label before adding the current one. This keeps re-runs (e.g. after a force-push) truthful. Query the labels actually on the PR and remove only those, then add the assessed level:

   ```bash
   # Remove any risk labels currently on the PR.
   # Pipe into `while read` (not a `for` over $(...)) so label names
   # containing spaces, like "🤖 Risk: Low", are not word-split.
   gh pr view <pr-number> --json labels \
     --jq '.labels[].name | select(startswith("🤖 Risk:"))' \
   | while IFS= read -r existing; do
       gh pr edit <pr-number> --remove-label "$existing"
     done

   # Add the assessed level (Low | Medium | High)
   gh pr edit <pr-number> --add-label "🤖 Risk: <Level>"
   ```

### 6. Post the Comment (if `--comment` flag provided)

Only post the comment to the PR if the `--comment` flag was included in the arguments.

If `--comment` is provided:

```bash
gh pr comment <pr-number> --body "<assessment>"
```

If `--comment` is NOT provided, skip this step and only display the assessment locally.

### 7. Verify the side effects landed

Before reporting the review as complete, confirm every requested side effect actually happened. This closing check is mandatory — it catches the common case where the analysis and comment succeed but the label was never applied.

```bash
gh pr view <pr-number> --json labels --jq '[.labels[].name | select(startswith("🤖 Risk:"))]'
```

- With `--label`: the output must contain **exactly one** `🤖 Risk: <Level>` entry, matching your assessment. If it is empty or wrong, re-run step 5 now — a missing label silently blocks automerge.
- With `--comment`: confirm your comment is present on the PR.

## Rating Guidelines

**Risk:**

- Low: Patch/minor upgrade, or major with no relevant breaking changes
- Medium: Major upgrade with breaking changes that don't affect current usage
- High: Major upgrade with breaking changes that affect current usage

**Impact:**

- Low: < 5 files, simple usage patterns
- Medium: 5-20 files, moderate complexity
- High: > 20 files, or critical infrastructure dependency

**Recommendation:**

- Safe to merge: CI passes, no breaking changes affect us
- Review recommended: Minor concerns, human review advised
- Changes required: Code modifications needed before merge
