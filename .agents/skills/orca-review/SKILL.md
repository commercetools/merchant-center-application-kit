---
name: orca-review
description: Review Orca security alerts from a JSON export, clone affected repos, and cross-reference with open Renovate PRs to identify fixes.
disable-model-invocation: false
argument-hint: '<json-file> --clone-dir <path> [--comment] [--summary]'
allowed-tools: Bash, Grep, Glob, Read, Task, TaskCreate, TaskUpdate, TaskList
scope:
  - security
  - dependencies
---

# Orca Security Issue Review

Review Orca security alerts from a JSON export, analyze each vulnerability, and cross-reference with open Renovate PRs to identify if dependency updates would resolve the issues.

## Arguments

- `json-file` (required): Path to the JSON file containing Orca alerts (e.g., `~/Downloads/alerts.json`)
- `--clone-dir <path>` (required): Base directory where repositories should be cloned for analysis
- `--comment` (optional): Post comments on matching Renovate PRs with Orca security details and dashboard links. If omitted, PRs are identified but not commented on.
- `--summary` (optional): Generate a `summary.md` file in the working directory with an executive summary of findings in markdown format.

Results will be stored in a timestamped subdirectory: `<clone-dir>/<YYYYMMDD-HHMMSS>/`

## Prerequisites

Before running this skill, ensure:

1. **GitHub CLI authenticated**: Run `gh auth login` if not already authenticated
2. **jq installed**: Required for JSON parsing (`brew install jq` on macOS)
3. **Write access**: You have write access to the clone directory
4. **Repository access**: You have read access to the repositories in the alerts

## JSON Format

The skill expects a JSON array where each item has:

```json
{
  "Title": "package-name Package Vulnerabilities",
  "Labels": ["fix_available", "shiftleft:vulnerability", ...],
  "CreatedAt": "2026-01-15T13:24:19+00:00",
  "Status": "open",
  "Category": "Vulnerabilities",
  "OrcaScore": 3.2,
  "Source": "./path/to/package-lock.json",
  "LastSeen": "2026-01-22T13:35:27+00:00",
  "AlertId": "orca-10390471",
  "CloudAccount": {"Name": "Org/repo (Project: Org/repo)"},
  "Inventory": {"Name": "Org/repo"}
}
```

The `AlertId` field is used to generate dashboard links: `https://eu.app.orcasecurity.io/alerts/{AlertId}`

## Process

### 1. Setup Working Environment

Initialize variables from arguments and create the working directory structure.

#### 1.1 Parse Arguments

Extract the JSON file path, clone directory, and optional flags from `$ARGUMENTS`:

```bash
# Parse arguments - expected format: <json-file> --clone-dir <path> [--comment] [--summary]

# Check for --comment flag
if [[ "$ARGUMENTS" == *"--comment"* ]]; then
  SHOULD_COMMENT=true
  ARGUMENTS="${ARGUMENTS//--comment/}"
else
  SHOULD_COMMENT=false
fi

# Check for --summary flag
if [[ "$ARGUMENTS" == *"--summary"* ]]; then
  SHOULD_SUMMARY=true
  ARGUMENTS="${ARGUMENTS//--summary/}"
else
  SHOULD_SUMMARY=false
fi

# Extract JSON file and clone dir
JSON_FILE="${ARGUMENTS%% --clone-dir*}"
CLONE_DIR="${ARGUMENTS##*--clone-dir }"

# Trim whitespace
JSON_FILE=$(echo "$JSON_FILE" | xargs)
CLONE_DIR=$(echo "$CLONE_DIR" | xargs)

# Expand paths (handle ~ and relative paths)
JSON_FILE=$(eval echo "$JSON_FILE")
CLONE_DIR=$(eval echo "$CLONE_DIR")

# Validate inputs
if [ ! -f "$JSON_FILE" ]; then
  echo "Error: JSON file not found: $JSON_FILE"
  exit 1
fi

if [ -z "$CLONE_DIR" ]; then
  echo "Error: --clone-dir is required"
  exit 1
fi

echo "Comment on PRs: $SHOULD_COMMENT"
echo "Generate summary: $SHOULD_SUMMARY"
```

#### 1.2 Create Timestamped Working Directory

Create a timestamped subdirectory for this execution:

```bash
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
WORK_DIR="${CLONE_DIR}/${TIMESTAMP}"
mkdir -p "$WORK_DIR"

echo "Working directory: $WORK_DIR"
```

### 2. Parse and Chunk the JSON File

The input file can be large (multiple MB). Check the file size and process accordingly.

#### 2.1 Check File Size

```bash
FILE_SIZE=$(stat -f%z "$JSON_FILE" 2>/dev/null || stat -c%s "$JSON_FILE" 2>/dev/null)
FILE_SIZE_MB=$((FILE_SIZE / 1024 / 1024))

echo "File size: ${FILE_SIZE_MB}MB"

# Threshold: process in chunks if larger than 2MB
CHUNK_THRESHOLD=2
```

#### 2.2 Process Based on Size

**If file is small (< 2MB):**

```bash
if [ "$FILE_SIZE_MB" -lt "$CHUNK_THRESHOLD" ]; then
  # Load entire file and parse to JSONL (one alert per line)
  cat "$JSON_FILE" | jq -c '.[]' > "$WORK_DIR/alerts.jsonl"
  echo "Parsed $(wc -l < "$WORK_DIR/alerts.jsonl") alerts"
fi
```

**If file is large (>= 2MB):**

```bash
if [ "$FILE_SIZE_MB" -ge "$CHUNK_THRESHOLD" ]; then
  # Initialize counters
  CHUNK_NUM=0
  LINES=0

  # Stream parse and chunk into 100-item batches
  cat "$JSON_FILE" | jq -c '.[]' | while IFS= read -r line; do
    echo "$line" >> "$WORK_DIR/alerts-chunk-${CHUNK_NUM}.jsonl"
    LINES=$((LINES + 1))
    if [ $LINES -ge 100 ]; then
      CHUNK_NUM=$((CHUNK_NUM + 1))
      LINES=0
    fi
  done

  echo "Created $((CHUNK_NUM + 1)) chunk files"
fi
```

This creates JSONL files (one JSON object per line, compact format) that can be processed sequentially without loading the entire file into memory.

#### 2.3 Group Alerts by Repository

Extract unique repositories from the alerts:

```bash
# For small files or after chunking is complete
if [ -f "$WORK_DIR/alerts.jsonl" ]; then
  jq -r '.Inventory.Name' < "$WORK_DIR/alerts.jsonl" | sort -u > "$WORK_DIR/repos.txt"
else
  # Combine all chunks
  cat "$WORK_DIR"/alerts-chunk-*.jsonl | jq -r '.Inventory.Name' | sort -u > "$WORK_DIR/repos.txt"
fi

echo "Found $(wc -l < "$WORK_DIR/repos.txt") unique repositories"
```

### 3. Process Each Repository

For each unique repository in the alerts:

#### 3.1 Clone the Repository

Clone repositories into the timestamped directory, preserving org structure:

```bash
while read -r REPO; do
  ORG=$(dirname "$REPO")
  REPO_NAME=$(basename "$REPO")

  mkdir -p "$WORK_DIR/$ORG"

  if gh repo clone "$REPO" "$WORK_DIR/$ORG/$REPO_NAME" -- --depth=1 2>/dev/null; then
    echo "Cloned: $REPO"
  else
    echo "Warning: Failed to clone $REPO (may lack access or repo deleted)"
  fi
done < "$WORK_DIR/repos.txt"
```

#### 3.2 List Open Renovate PRs

For each repository, fetch open Renovate PRs and cache them:

```bash
while read -r REPO; do
  PR_FILE="$WORK_DIR/renovate-prs-$(echo "$REPO" | tr '/' '-').json"

  gh pr list --repo "$REPO" --author "renovate[bot]" --state open \
    --json number,title,url > "$PR_FILE" 2>/dev/null || echo "[]" > "$PR_FILE"

  PR_COUNT=$(jq 'length' < "$PR_FILE")
  echo "$REPO: $PR_COUNT open Renovate PRs"
done < "$WORK_DIR/repos.txt"
```

### 4. Analyze Each Alert

For each alert item, perform the following:

#### 4.1 Extract Package Information

From each alert, extract the package name and alert ID:

```bash
# Example: "@remix-run/router Package Vulnerabilities" → "@remix-run/router"
PACKAGE_NAME=$(echo "$TITLE" | sed 's/ Package Vulnerabilities$//')

# Extract AlertId for dashboard link
ALERT_ID=$(echo "$ALERT" | jq -r '.AlertId')
```

#### 4.2 Assess Severity

Use the `OrcaScore` to determine severity level:

| Score Range | Severity | Priority                  |
| ----------- | -------- | ------------------------- |
| 7.0 - 10.0  | Critical | P1 - Immediate action     |
| 5.0 - 6.9   | High     | P2 - Address this sprint  |
| 3.0 - 4.9   | Medium   | P3 - Plan for next sprint |
| 0.0 - 2.9   | Low      | P4 - Backlog              |

#### 4.3 Check for Fix Availability

If `Labels` array contains `"fix_available"`:

- A newer version of the package exists that addresses the vulnerability
- Check if Renovate has created a PR for this package

#### 4.4 Cross-Reference with Renovate PRs

Search the cached Renovate PRs for the affected package:

```bash
PR_FILE="$WORK_DIR/renovate-prs-$(echo "$REPO" | tr '/' '-').json"

# Search for matching PR (case-sensitive, full package name)
MATCHING_PR=$(jq -r --arg pkg "$PACKAGE_NAME" \
  '.[] | select(.title | contains($pkg)) | @json' < "$PR_FILE" | head -1)

if [ -n "$MATCHING_PR" ]; then
  PR_NUMBER=$(echo "$MATCHING_PR" | jq -r '.number')
  PR_TITLE=$(echo "$MATCHING_PR" | jq -r '.title')
  PR_URL=$(echo "$MATCHING_PR" | jq -r '.url')
  echo "Found matching PR: #$PR_NUMBER - $PR_TITLE"
fi
```

### 5. Comment on Matching PRs (if `--comment` flag provided)

When a Renovate PR is found that updates a vulnerable package, optionally add a comment linking the security context and Orca dashboard.

**Only post comments if the `--comment` flag was included in the arguments.**

If `--comment` is provided:

- Build the Orca dashboard link from AlertId: `https://eu.app.orcasecurity.io/alerts/$ALERT_ID`
- Read the comment template from `resources/pr-comment-template.md`
- Fill in the variables (`$PACKAGE_NAME`, `$ORCA_SCORE`, `$SEVERITY`, `$CREATED_AT`, `$ORCA_LINK`, `$SOURCE_PATHS`, `$LABELS`)
- Post the filled template as a comment on the PR using `gh pr comment`

If `--comment` is NOT provided, skip commenting and only track the match for the summary report.

**Note:** When multiple alerts match the same PR (same package in different lock files), consolidate into a single comment listing all affected sources.

### 6. Create Tasks for PR Review

For each Renovate PR that matches a vulnerable package, create a Claude Task for follow-up review using the `/renovate-review` skill:

```json
{
  "subject": "Review and validate Renovate PR for security fix",
  "description": "Review Renovate PR updating <package-name> which addresses Orca vulnerability (Score: <score>)\n\nRepository: <org>/<repo>\nPR: #<pr-number> - <pr-title>\nURL: <pr-url>\n\nVulnerability Details:\n- Package: <package-name>\n- Orca Score: <score> (<severity>)\n- Affected Files: <sources>\n- Fix Available: Yes\n- Alert Created: <created-at>\n- Orca Dashboard: https://eu.app.orcasecurity.io/alerts/<alert-id>\n\nAction: Review PR, validate dependency changes, and merge if tests pass.",
  "activeForm": "Reviewing Renovate security fix PR"
}
```

These tasks are collected for the summary output and can be processed by the `/renovate-review` skill.

### 7. Generate Summary Report

After processing all alerts, output a summary to the terminal. Use the structure defined in `resources/summary-template.md` — it includes sections for executive summary, severity distribution, PR coverage, alerts without PRs, and recommended actions. Fill in all variables with the computed values.

### 8. Save Results to Output File

Save the structured results to a JSON file in the working directory:

```bash
OUTPUT_FILE="$WORK_DIR/orca-review-results.json"
```

The output file structure is defined in `resources/output-example.json`. It includes execution metadata, tasks for PR review, and summary statistics by severity.

### 9. Generate Summary File (if `--summary` flag provided)

When the `--summary` flag is provided, write the executive summary to a markdown file.

**Only generate the file if the `--summary` flag was included in the arguments.**

If `--summary` is provided, read the template from `resources/summary-template.md`, fill in all variables with computed values, and write to `$WORK_DIR/summary.md`.

If `--summary` is NOT provided, skip file generation and only display the summary in the terminal.

## What Happens Next

After the skill completes:

1. **Review the summary** displayed in the terminal (or read `summary.md` if `--summary` was used)
2. **Check the output file** at `$WORK_DIR/orca-review-results.json` for structured data (see `resources/output-example.json`)
3. **Process the tasks** using one of these approaches:
   - Run `/renovate-review <pr-url>` manually for each PR
   - Use the task list to work through PRs systematically
4. **Monitor unmatched alerts** for future Renovate PRs

The skill does not automatically merge PRs or proceed to the next phase. You control when and how to act on the findings.

**Examples:**

```bash
# Basic run (no comments, no summary file)
/orca-review ~/Downloads/alerts.json --clone-dir ~/orca-workspace

# With PR comments
/orca-review ~/Downloads/alerts.json --clone-dir ~/orca-workspace --comment

# With summary file
/orca-review ~/Downloads/alerts.json --clone-dir ~/orca-workspace --summary

# Full run with comments and summary
/orca-review ~/Downloads/alerts.json --clone-dir ~/orca-workspace --comment --summary
```

## Directory Structure

Results are organized by execution timestamp for audit trails:

```
<clone-dir>/
├── 20260129-143022/                    # First execution
│   ├── NebulaTerra/
│   │   └── modular-store/              # Cloned repo
│   ├── OtherOrg/
│   │   └── another-repo/               # Cloned repo
│   ├── alerts.jsonl                    # Parsed alerts (small files)
│   ├── alerts-chunk-0.jsonl            # Chunked alerts (large files)
│   ├── repos.txt                       # Unique repository list
│   ├── renovate-prs-NebulaTerra-modular-store.json
│   ├── orca-review-results.json        # Final output (JSON)
│   └── summary.md                      # Executive summary (if --summary used)
├── 20260129-145030/                    # Second execution
│   └── ...
```

Each timestamped directory is independent, allowing you to:

- Compare results across multiple runs
- Track vulnerability remediation progress over time
- Reference specific execution results for audit purposes
- Run multiple analyses in parallel without conflicts

## Guidelines

### Deduplication

- Multiple alerts may exist for the same package across different lock files in the same repo
- Group these together and only create one task per PR
- In the task description and PR comment, list all affected source files
- Count duplicate issues only once in summary statistics

### PR Matching

- Match package names case-sensitively
- For scoped packages (e.g., `@remix-run/router`), search for the full scoped name
- A PR title like "Update dependency @remix-run/router to v6.22.0" matches `@remix-run/router`
- Use fuzzy matching for PR titles if exact match fails (e.g., version numbers may vary)

### Task Generation

When generating tasks for the Claude Task system:

- Each task represents ONE Renovate PR that fixes one or more Orca vulnerabilities
- Include the PR URL, repository, and all affected packages/issues
- Set severity based on the highest OrcaScore among matched issues
- Tasks are designed for the `/renovate-review` skill to handle PR review and merging
- Output the complete task list in structured JSON format for easy consumption

### Summary Statistics

Calculate coverage metrics:

```
Issues with PRs = count of unique (repo, package) pairs with matching Renovate PR
Issues without PRs = count of unique (repo, package) pairs without matching PR
Coverage % = (Issues with PRs / Total Issues) * 100
```

Segment by severity to show coverage at each level.

### Large File Handling

The JSON export can be quite large. The skill automatically handles files efficiently:

- **File size check:** Determines processing strategy based on file size
- **Small files (< 2MB):** Loaded entirely with `jq`
- **Large files (>= 2MB):** Streamed and chunked into 100-alert batches
- **JSONL format:** Intermediate files use compact newline-delimited JSON (`jq -c`)
- **Sequential processing:** Chunks are processed one at a time to avoid memory spikes
- **Temporary files:** All intermediate files are stored in `$WORK_DIR`

### Error Handling

- If a repository cannot be cloned (permissions, deleted, etc.), log the error and continue
- If `gh` CLI is not authenticated, prompt user to run `gh auth login`
- If JSON file is malformed, report the specific parsing error and exit gracefully
- Skip duplicate alerts for the same package in the same repo (log as skipped)
- If `jq` fails during chunking, report the error with the chunk number and continue with next chunk

### Rate Limiting

When processing many repositories, be mindful of GitHub API rate limits:

- The `gh` CLI handles rate limiting automatically with backoff
- For 50+ repositories: expect slower processing as rate limits are hit
- For 100+ repositories: consider splitting the JSON file and running in batches
- **Recommended batch size:** 50 repositories per execution
- Check rate limit status: `gh api rate_limit`

### Labels to Watch For

- `fix_available`: A patched version exists (prioritize creating tasks for these)
- `easy_exploitation`: Vulnerability is easily exploitable - mark as high priority
- `shiftleft:vulnerability`: Indicates a ShiftLeft/Orca detected vulnerability
- Use labels to highlight high-risk vulnerabilities in task descriptions
