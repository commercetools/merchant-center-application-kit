---
name: label-cloud-resources
description: Add default labels to cloud providers using default_tags/default_labels blocks. Use when reviewing Terraform PRs that need consistent provider-level labeling.
disable-model-invocation: false
argument-hint: '<label_name:label_value> [--dry-run] [--comment]'
allowed-tools: Bash, Grep, Glob, Read, Edit
scope:
  - terraform
---

# Cloud Resource Default Labeling

Add standardized labels to cloud providers using default_tags (AWS) or default_labels (GCP) in a PR. This approach automatically applies labels to all resources managed by the provider without needing to modify individual resources.

## Arguments

- `label_name:label_value` (required): The label to add in the format `name:value` (e.g., `ct_owner:team-platform`, `environment:production`)
- `--dry-run` (optional): Preview the changes without applying them
- `--comment` (optional): Post a summary comment on the PR with the labeling results

## Process

### 1. Validate Arguments

Parse the label argument and ensure it follows the `label_name:label_value` format.

```bash
# Extract label name and value
LABEL_INPUT="$ARGUMENTS"
LABEL_NAME=$(echo "$LABEL_INPUT" | cut -d':' -f1)
LABEL_VALUE=$(echo "$LABEL_INPUT" | cut -d':' -f2)
```

### 2. Identify Changed Provider Files

Find Terraform files that were changed in the current PR and contain provider blocks:

```bash
# Get files changed in current PR, filter for .tf files
CHANGED_TF_FILES=$(gh pr view --json files | jq -r '.files[].path' | grep '\.tf$')

# Check which of these files contain provider blocks
PROVIDER_FILES=""
for file in $CHANGED_TF_FILES; do
  if grep -q "provider \"" "$file"; then
    PROVIDER_FILES="$PROVIDER_FILES $file"
  fi
done
```

Only process provider blocks in files that are part of the current PR changes.

### 3. Locate Provider Blocks in Affected Directories

For each provider file found in directories with changes, locate provider configurations for:

- AWS: `provider "aws"` blocks
- GCP: `provider "google"` blocks

```bash
# Example: Check for AWS providers in directories with changes
for file in $PROVIDER_FILES; do
  if grep -q 'provider "aws"' "$file"; then
    echo "Found AWS provider in $file (directory: $(dirname $file))"
  fi
done
```

### 4. Apply Default Labels to Provider Files in Modified Directories

Add or update the default labeling configuration for each provider found in directories that contain PR changes:

#### AWS Provider:

```hcl
provider "aws" {
  # existing configuration...

  default_tags {
    tags = {
      # existing tags...
      "${LABEL_NAME}" = "${LABEL_VALUE}"
    }
  }
}
```

#### GCP Provider:

```hcl
provider "google" {
  # existing configuration...

  default_labels = {
    # existing labels...
    "${LABEL_NAME}" = "${LABEL_VALUE}"
  }
}
```

### 5. Handle Edge Cases

- **Missing default_tags/default_labels block**: Create the block if it doesn't exist in provider files within modified directories
- **Existing label**: Update the value if the label already exists
- **Multiple provider instances**: Apply to all instances of the same provider in directories with changes
- **Provider aliases**: Handle aliased providers appropriately
- **No provider files in modified directories**: Skip labeling if no provider blocks are found in directories with changes
- **Multiple directories**: Apply labeling to provider files in all directories that contain any file changes

## Output Format

```markdown
## Terraform Provider Labeling Results

**Label Applied**: `${LABEL_NAME}:${LABEL_VALUE}`

### Modified Files (from PR changes):

- `providers.tf` (AWS provider updated)
- `modules/networking/main.tf` (GCP provider updated)

### Providers Updated:

- `aws` (default_tags block in providers.tf)
- `google` (default_labels block in modules/networking/main.tf)

### Impact:

- **AWS resources** managed by providers.tf will inherit the `${LABEL_NAME}:${LABEL_VALUE}` tag
- **GCP resources** managed by modules/networking/main.tf will inherit the `${LABEL_NAME}:${LABEL_VALUE}` label

### Summary:

- **Files analyzed**: Only files changed in this PR
- **Provider files modified**: 2
- **Providers affected**: AWS, GCP
- **Scope**: Only resources managed by providers in changed files
```

## Guidelines

### Supported Providers

Focus on major cloud providers and their default labeling conventions:

- **AWS**: `default_tags { tags = {} }` - applies to all AWS resources automatically
- **GCP**: `default_labels = {}` - applies to all GCP resources automatically

### Provider Detection

Look for provider blocks only in files changed by the current PR:

- First get PR file changes: `gh pr view --json files`
- Filter for `.tf` files in the change set
- Search for `provider "..."` blocks only in those files
- Focus on commonly changed files: `providers.tf`, `main.tf`, `versions.tf`

### Label Validation

- Ensure label names follow provider naming conventions
- Convert label names to lowercase with underscores for GCP
- Validate label values don't exceed provider limits
- Escape special characters appropriately

### Best Practices

- Use provider-level labeling over individual resource labeling
- Preserve existing default_tags/default_labels
- Use consistent formatting within provider blocks
- Add labels in alphabetical order for consistency
- Consider label inheritance and conflicts with resource-specific tags

### Error Handling

- Handle providers without existing default labeling blocks in changed files
- Warn about provider-specific limitations
- Handle malformed Terraform syntax gracefully in changed files
- Provide clear error messages for invalid label formats
- Skip unsupported provider types
- **No provider changes**: Inform user if no provider blocks found in PR changes

## Examples

### Basic Usage

```bash
/label-cloud-resources ct_owner:team-platform
```

### With Dry Run

```bash
/label-cloud-resources environment:staging --dry-run
```

### With PR Comment

```bash
/label-cloud-resources cost-center:engineering --comment
```

### Multiple Labels (run separately)

```bash
/label-cloud-resources ct_owner:team-backend
/label-cloud-resources environment:production
/label-cloud-resources project:api-gateway
```
