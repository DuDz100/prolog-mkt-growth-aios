---
name: weekly-review
description: >
  Run the weekly Google Ads performance review for Prolog App. Covers all campaigns (Search + Demand Gen),
  flags anomalies, surfaces top opportunities, and produces a summary ready to share.
  Triggers: "weekly review", "review semanal", "como estão as campanhas essa semana",
  "performance report", "/weekly-review".
---

# Weekly Review

Run a structured weekly review of all Prolog App Google Ads campaigns. Produces a prioritized action list and a shareable performance summary.

## Before Starting

Load:
- `account-conventions` — benchmarks and campaign structure
- `ad-copy-principles` — for copy health checks

## Step-by-Step Execution

### Step 1 — Pull Week-over-Week Performance

```sql
SELECT
  campaign.name,
  campaign.status,
  metrics.cost_micros,
  metrics.clicks,
  metrics.impressions,
  metrics.ctr,
  metrics.conversions,
  metrics.cost_per_conversion,
  metrics.search_impression_share,
  metrics.search_budget_lost_impression_share
FROM campaign
WHERE
  segments.date DURING LAST_14_DAYS
  AND campaign.status = 'ENABLED'
ORDER BY metrics.cost_micros DESC
```

Run the same query with `DURING LAST_7_DAYS` and compare. Calculate WoW delta for each metric.

### Step 2 — Anomaly Detection

Flag these automatically:

| Anomaly | Threshold |
|---------|-----------|
| Cost spike | +30% WoW |
| CTR drop | -20% WoW |
| Conversion rate drop | -25% WoW |
| Budget constrained | Lost IS (Budget) > 40% |
| CPA spike | +30% WoW |
| Zero conversions | Campaign with clicks but 0 conversions in 7 days |

### Step 3 — Pull Top Search Terms (New This Week)

Use the mine-search-terms workflow logic but only for new terms (not yet classified):

```sql
SELECT
  search_term_view.search_term,
  campaign.name,
  metrics.cost_micros,
  metrics.clicks,
  metrics.conversions
FROM search_term_view
WHERE
  segments.date DURING LAST_7_DAYS
  AND search_term_view.status = 'NONE'
  AND metrics.cost_micros > 5000000
ORDER BY metrics.cost_micros DESC
LIMIT 20
```

Quick-flag any obvious negatives to address immediately.

### Step 4 — Produce Weekly Report

Format as a structured summary:

```
PROLOG APP — WEEKLY GOOGLE ADS REVIEW
Week ending [date]
═══════════════════════════════════════

OVERVIEW
────────
Total Spend:     R$ XXX  (WoW: +X% / -X%)
Total Clicks:    X,XXX   (WoW: +X% / -X%)
Total Convs:     XX      (WoW: +X% / -X%)
Avg CPA:         R$ XXX  (WoW: +X% / -X%)

CAMPAIGN BREAKDOWN
────────────────────
[Table with each campaign: Spend | Clicks | Convs | CPA | IS% | WoW]

🚨 ANOMALIES THIS WEEK
───────────────────────
1. [Anomaly description and magnitude]
2. [Anomaly description and magnitude]

🔍 NEW SEARCH TERMS TO REVIEW
──────────────────────────────
X new terms found with spend > R$ 5. Top 5:
1. [term] — R$ XX — [quick assessment: KEEP / NEGATE?]

⚡ TOP OPPORTUNITIES
────────────────────
1. [Specific actionable recommendation]
2. [Specific actionable recommendation]

✅ THIS WEEK'S WINS
────────────────────
1. [Positive callout]
2. [Positive callout]

📋 RECOMMENDED ACTIONS (Priority Order)
─────────────────────────────────────────
1. [Action] — [Expected impact] — [Time to do]
2. [Action] — [Expected impact] — [Time to do]
3. [Action] — [Expected impact] — [Time to do]
```

### Step 5 — Ask Which Actions to Execute

> "Weekly review done. Would you like me to execute any of these actions now? I can run the full mine-search-terms workflow, apply budget changes, or draft new copy — all with your approval before anything goes live."
