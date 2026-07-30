---
name: ticket-context-page
description: Research a Jira ticket and create a Confluence context page with current understanding, dev action items, related tickets, domain docs, and people to consult. Use when asked to "create a context page for", "research this ticket", "gather context for", "create a knowledge brief for", "collect information about this Jira issue", "create a Confluence page for ticket", or "what do I need to know to solve this ticket".
disable-model-invocation: false
argument-hint: '<TICKET-KEY-or-URL> [--space <confluence-space-key>]'
allowed-tools: Read, Agent
scope:
  - jira
  - knowledge
---

# ticket-context-page

Given a Jira ticket key, this skill researches the problem space and creates a
Confluence page that gives anyone picking up the ticket an instant head start.
It pulls together: the ticket itself, related Jira issues, Confluence domain
docs, and the people who know this area best.

Required MCP servers: `atlassian` (see `.mcp.example.json`).

## Arguments

- `TICKET-KEY-or-URL` (required): Jira ticket key (e.g. `PROJ-1234`) or full Jira URL.
- `--space` (optional): Confluence space key where the page will be created (e.g. `~your.name`, `ENG`). If omitted, ask the user before proceeding.

## Process

### Step 1 — Parse inputs and fetch the ticket

Extract the ticket key from the argument (accept `PROJ-1234` or a full Jira URL).

If `--space` was not provided, ask the user for their Confluence space key before continuing.

Use `mcp__claude_ai_Atlassian__getJiraIssue` to fetch the ticket:

- summary, description, status, priority
- reporter, assignee
- labels, components
- linked issues (inward + outward)
- **all comments**, in chronological order (oldest first)

Note the Jira base URL (e.g. `https://your-org.atlassian.net`). You will need it to
construct direct links throughout the page:

- Ticket: `<base>/browse/<KEY>`
- Specific comment: `<base>/browse/<KEY>?focusedCommentId=<commentId>`

### Step 2 — Synthesize current understanding

Read the ticket description and every comment from oldest to newest. Produce a
**Current understanding** block that a new reader can trust immediately. Structure it as:

**What the customer reported**
One short paragraph: the customer's original problem statement in plain language.
Do not quote verbatim — paraphrase to remove noise. Flag if the framing was
later found to be incorrect by later comments. Link to the ticket description as
the source: `([ticket description](<base>/browse/<KEY>))`.

**What we know now**
Bullet points covering what support and domain experts have established through
the comment thread. Each bullet should represent a confirmed or strongly
supported finding — not a hypothesis. If a later comment corrects or invalidates
an earlier one, state only the current accepted understanding (do not list the
superseded version). Include:

- Root cause (if identified)
- Conditions under which the problem occurs
- Any confirmed non-causes (things ruled out)

**Every bullet must end with a source link** to the comment (or description) it
came from: `([Name, comment](<base>/browse/<KEY>?focusedCommentId=<id>))`.

**How to reproduce / relevant examples**
This is the most important section for the team picking up the ticket. Extract
and quote verbatim any concrete artifacts that are still valid and would help
reproduce or investigate the issue:

- Resource IDs, keys, and UUIDs mentioned in the ticket or comments (e.g. discount ID, product ID, order ID, project key)
- API requests or predicates that trigger the problem, quoted exactly
- Error messages or status codes, quoted exactly
- Config values, flag names, or field values that are relevant to the behaviour
- Minimal reproduction steps, if described anywhere in the thread

**Each artifact must include a source link** — either the ticket description or
the specific comment it was extracted from.

Only include artifacts that are still valid given the current understanding —
discard examples that were part of a superseded framing. If no concrete examples
exist, omit this sub-section entirely rather than leaving it empty.

**Resolution** (only if the ticket is Done / Closed)
One or two sentences: what was done to fix it, and whether it is confirmed
working by the customer or closed unilaterally. Link to the comment that
confirmed the resolution.

**Still unclear** (only if the ticket is open or partially resolved)
A short bullet list of open questions or things that still need investigation.
Link each item to the comment that raised it.

Prioritise accuracy over completeness — if something is ambiguous, omit it or
flag it explicitly as unconfirmed.

### Step 2b — Draft dev team action items

Immediately after the current understanding, generate a **"What we need from dev"** block.
Derive it entirely from the ticket content — do not invent steps that aren't grounded in the
ticket or its comments.

**What's being requested**
One or two direct sentences stating the explicit ask: fix the bug, answer a feasibility
question, approve a limit increase, make a configuration change, etc. Match the framing
to the ticket type — do not hedge or over-qualify. Link to the ticket or comment where
this ask is most clearly stated.

**Suggested next steps**
An ordered list of specific, actionable items for the dev picking this up. Each item
must start with a verb and name a concrete thing to do. Derive them from:

- Open questions identified in Step 2
- Investigation steps mentioned by support or the customer in comments
- Standard approaches for this ticket type (bug vs. config request vs. limit increase
  vs. feature request)

Where a step is grounded in a specific comment, link to it inline.

Keep the list short (3–6 items). Omit obvious boilerplate like "read the ticket" or
"assign to yourself".

**Decision required** (only if the ticket requires a policy, capacity, or architectural decision)
State the decision to be made and who has authority to make it (e.g. "product owner
approval needed to raise the variant limit above the standard max").

If no decision is needed, omit this sub-section entirely.

### Step 3 — Find and score related Jira tickets

Run these JQL queries via `mcp__claude_ai_Atlassian__searchJiraIssuesUsingJql` (limit 10 each):

- **By component** (if the ticket has components):
  `component = "<component>" AND key != "<key>" ORDER BY updated DESC`
- **By label** (if the ticket has labels):
  `labels in ("<label1>","<label2>") AND key != "<key>" ORDER BY updated DESC`
- **Keyword fallback** (if no component or label):
  Extract 2–3 meaningful words from the summary and search:
  `summary ~ "<keyword>" AND key != "<key>" ORDER BY updated DESC`

Deduplicate across queries. Then **score each ticket** for relevance to the current issue
using the following scale:

| Score       | Meaning                                                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| ⭐⭐⭐ High | Directly related — same root cause, same feature area, or explicitly linked. A dev working this ticket should almost certainly look at it. |
| ⭐⭐ Medium | Probably useful — touches the same component or pattern but may not directly apply. Worth a quick look.                                    |
| ⭐ Low      | Tangentially related — same component or label but different problem. Include only if there are fewer than 5 high/medium tickets.          |

**Drop any ticket scoring Low if there are already 5 or more High/Medium tickets.**
Keep the final list to at most 8 tickets. Prefer quality over quantity.

For each kept ticket, note a one-line reason for its score (e.g. "same root cause", "directly linked", "same component, different symptom").

Collect assignees and reporters of kept tickets for Step 5.

### Step 4 — Find Confluence domain context

Use `mcp__claude_ai_Atlassian__searchConfluenceUsingCql` for two queries:

1. By component / label name:
   `text ~ "<component_or_label>" AND type = "page" ORDER BY lastModified DESC`
   (top 5 results)
2. By ticket key — catches any pages already created for this issue:
   `text ~ "<TICKET-KEY>" AND type = "page"`
   (top 3 results)

For each result, extract: page title, space, last-modified date, and URL.
Write a one-line summary of each page based on its excerpt.

### Step 5 — Identify people to consult

The goal is to surface engineers who have hands-on knowledge of the problem domain — not to list everyone who touched the support pipeline. Prioritise in this order:

1. **Engineers from related dev tickets** (Step 3) — assignees and reporters of dev-side tickets. These are the people most likely to understand the root cause and codebase.
2. **Engineers or SMEs who commented with technical insight** on the original ticket (e.g. identified root cause, confirmed a fix, provided logs analysis).
3. **The support assignee** on the original ticket — useful as a contact point, but lower priority.

Exclude people whose only involvement was routine support pipeline work (customer communication, status updates, handovers) with no technical contribution.

Deduplicate by name. For each person, record:

- **Company role / job title** — from their Jira profile if available (e.g. "Staff Engineer, Subscriptions")
- **Specific involvement** — what they actually did, with ticket links inline (e.g. "Implemented fix in [FS-263](url)", "Identified root cause in comments on [SUPPORT-1234](url)")

### Step 6 — Create the Confluence page

Call `mcp__claude_ai_Atlassian__createConfluencePage` with:

- **Space key**: the value from `--space` (or what the user provided when asked)
- **Title**: `Context: <TICKET-KEY> — <ticket summary>`
- **Content format**: `markdown`
- **Body**: structured as below

### Step 7 — Return the page URL to the user

After creation, share the Confluence page URL so the user can open it directly.

---

## Output Format

```
# Context: <TICKET-KEY> — <summary>

> Auto-generated by Claude on <date>. Source ticket: [<TICKET-KEY>](<jira-url>).

---

## About this ticket

| Field | Value |
|---|---|
| Status | <status> |
| Priority | <priority> |
| Reporter | <reporter> |
| Assignee | <assignee> |
| Components | <components> |
| Labels | <labels> |

**Linked issues:**
<list of inward/outward linked issues with key and summary>

---

## Current understanding

**What the customer reported**
<One paragraph: the customer's original problem, paraphrased. Flag if it was
later found to be incorrect or misleading.> ([ticket description](<jira-url>))

**What we know now**
- <Confirmed finding> ([Name, comment](<jira-url>?focusedCommentId=<id>))
- <Root cause, if identified> ([Name, comment](<jira-url>?focusedCommentId=<id>))
- <Confirmed non-causes — things ruled out> ([Name, comment](<jira-url>?focusedCommentId=<id>))

**How to reproduce / relevant examples**
- IDs / keys: `<resource-id>` ([source](<jira-url>?focusedCommentId=<id>))
- Predicate / request that triggers the issue ([source](<jira-url>?focusedCommentId=<id>)):
```

<exact predicate, payload, or API call>

```
- Error message: `<exact error text or status code>` ([source](<jira-url>?focusedCommentId=<id>))
- Reproduction steps: <numbered if described in the thread>

**Resolution** _(if Done / Closed)_
<What was done and whether the customer confirmed it worked.> ([Name, comment](<jira-url>?focusedCommentId=<id>))

**Still unclear** _(if open)_
- <Open question> ([Name, comment](<jira-url>?focusedCommentId=<id>))

---

## What we need from dev

**What's being requested**
<Direct statement of the ask — one or two sentences.> ([source](<jira-url>))

**Suggested next steps**
1. <Specific, actionable step> ([source](<jira-url>?focusedCommentId=<id>))
2. <Specific, actionable step>
3. <...>

**Decision required** _(if applicable)_
<What decision needs to be made and who has authority to make it.>

---

## Related Jira tickets

| Key | Summary | Status | Assignee | Relevance |
|---|---|---|---|---|
| [PROJ-X](<url>) | <summary> | <status> | <assignee> | ⭐⭐⭐ High — <reason, e.g. "same root cause"> |
...

---

## Domain context (Confluence)

- [<Page title>](<url>) — <one-line summary> _(last updated: <date>)_
...

---

## People to consult

| Name | Company role | Involvement |
|---|---|---|
| <name> | <job title or team> | <specific contribution, including linked ticket(s) inline, e.g. "Assignee on [PROJ-X](<url>); led internal investigation"> |
...
```

---

## Examples

```bash
# With space key as argument
/ticket-context-page PLAT-4892 --space ENG

# Paste a full Jira URL
/ticket-context-page https://your-org.atlassian.net/browse/PLAT-4892 --space ~your.name

# Omit --space to be prompted
/ticket-context-page PLAT-4892
```

## Tips

- Run this as soon as you pick up an unfamiliar ticket — before you start investigating.
- The "People to consult" list often surfaces SMEs faster than org charts do.
- The page is a starting point, not a final answer — add your own notes as you go.
