# Skill: Derive Implied SLO From Static Alert (Availability & Latency)

## Purpose

Given a static Prometheus-style alert threshold, derive:

- The implied SLO
- The implied error budget
- The equivalent burn rate
- The percent of budget consumed

Supports:

- Availability SLOs (error-rate based)
- Latency SLOs (good-event ratio based)

Default methodology follows Google SRE burn-rate alerting.

---

# SECTION 1 — Definitions

Let:

- `R` = observed bad event rate (errors / total)
- `G` = observed good event rate (good / total)
- `Threshold` = alert threshold value
- `W` = alert evaluation window (minutes)
- `T` = SLO window duration (minutes)
- `B` = burn rate threshold
- `SLO` = reliability target
- `EB` = error budget = (1 - SLO)

---

# SECTION 2 — Default Assumptions

Unless specified:

- SLO window = 30 days
- T = 30 × 24 × 60 = 43200 minutes
- Fast-burn paging threshold = B = 14.4
  (≈ 2% budget consumed in 1 hour)

---

# SECTION 3 — AVAILABILITY SLO MODE

## 3.1 Alert Form

Typical alert:

    error_rate_over_W > R_threshold

Where:

    R_threshold = bad_events / total_events

## 3.2 Core Relationship

Burn rate:

    B = R / (1 - SLO)

Solve for SLO:

    SLO = 1 - (R / B)

---

## 3.3 Procedure

1. Extract R from alert threshold.
2. Use burn rate B (default 14.4).
3. Compute:

   SLO = 1 - (R / B)

4. Compute:

   Error Budget = 1 - SLO

5. Convert to percentage.

---

## 3.4 Example

Alert:

    error_rate_5m > 0.05

Given:
R = 0.05
B = 14.4

Compute:

    SLO = 1 - (0.05 / 14.4)
    SLO = 0.996528

Result:

    SLO ≈ 99.65%
    Error Budget ≈ 0.35%

---

# SECTION 4 — LATENCY SLO MODE

Latency SLOs are defined as:

    good_requests / total_requests ≥ SLO

Alerts often look like:

    good_ratio_over_W < G_threshold

or equivalently:

    slow_request_ratio > R_threshold

Where:

    R_threshold = 1 - G_threshold

---

## 4.1 Convert Latency to Error Form

If alert is:

    good_ratio < G_threshold

Convert to error form:

    R = 1 - G_threshold

If alert is:

    slow_ratio > R_threshold

Then:

    R = R_threshold

Once converted, use same formula:

    SLO = 1 - (R / B)

---

## 4.2 Example (Latency)

Alert:

    good_ratio_5m < 0.95

Convert:

    R = 1 - 0.95
    R = 0.05

Compute:

    SLO = 1 - (0.05 / 14.4)
    SLO ≈ 99.65%

Interpretation:

This latency alert corresponds to a ~99.65% latency SLO.

---

# SECTION 5 — Compute Budget Consumption

Percent of total error budget consumed in window W:

    BudgetPercent = (R × W) / (1 - SLO) × 100

Where:

- W = alert window (minutes)
- T = SLO window (minutes)

If SLO unknown, compute SLO first.

---

# SECTION 6 — Compute Burn Rate If SLO Known

If SLO provided:

    B = R / (1 - SLO)

Interpretation:

- B = 1 → normal consumption
- B = 14.4 → fast-burn page level
- B > 50 → severe outage level

---

# SECTION 7 — Output Format

Always return:

- Mode (Availability or Latency)
- Implied SLO (%)
- Error Budget (%)
- Burn Rate (if SLO provided)
- Budget % consumed in W
- Interpretation sentence

Example:

    Mode: Latency
    Implied SLO: 99.65%
    Error Budget: 0.35%
    Budget Burn in 5m: 0.58%
    Interpretation: This alert behaves like a fast-burn (14.4×) SLO page alert over 30 days.

---

# SECTION 8 — Important Notes

- Latency SLOs must use good-event ratios.
- Histogram quantiles are NOT SLOs.
- Static thresholds (e.g. 5%) are not SLO-aware unless derived via burn rate.
- Multi-window alerting is not handled here.
- For non-30-day SLO windows:
  T = days × 24 × 60
  Replace in calculations accordingly.

---

# END OF SKILL
