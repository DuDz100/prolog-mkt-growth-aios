---
name: investigate-campaign
description: >
  Deep-dive investigation into a specific campaign that's underperforming, behaving unexpectedly,
  or needs a root-cause diagnosis. Triggers: "why is campaign X underperforming", "investigate",
  "investigate campaign", "o que está errado com essa campanha", "why did CPA spike",
  "diagnose my campaign", "/investigate-campaign".
---

# Investigate Campaign

Perform a root-cause diagnosis of a specific campaign issue. Pulls all relevant data layers and surfaces the most likely cause.

## Before Starting

Load `account-conventions` for context on expected performance.

## Step 1 — Clarify the Issue

Ask if not specified:
- Which campaign?
- What symptom? (CPA spike, CTR drop, spend drop, conversion drop, impression drop)
- When did it start? (approximate date)
- Any recent changes made? (budget, bids, ad copy, landing page, audience)

## Step 2 — Pull Campaign Segmented Data

```sql
SELECT
  campaign.name,
  ad_group.name,
  segments.date,
  metrics.cost_micros,
  metrics.clicks,
  metrics.impressions,
  metrics.ctr,
  metrics.conversions,
  metrics.cost_per_conversion,
  metrics.search_impression_share,
  metrics.search_budget_lost_impression_share,
  metrics.search_rank_lost_impression_share
FROM ad_group
WHERE
  campaign.name = '[CAMPAIGN_NAME]'
  AND segments.date DURING LAST_30_DAYS
ORDER BY segments.date ASC
```

Plot the trend mentally — when did the metric break?

## Step 3 — Layer-by-Layer Diagnosis

Check each layer in sequence:

### Layer 1: Auction Level
- Budget lost IS > 40%? → Budget, not performance
- Rank lost IS > 30%? → Bid or quality issue
- Impression share collapsed? → Eligibility issue (policy, billing, approval)

### Layer 2: Ad Group Level
- Which ad group is driving the issue?
- Any ad groups with 0 impressions? → Keyword approval or budget allocation

### Layer 3: Keyword Level
```sql
SELECT
  ad_group_criterion.keyword.text,
  ad_group_criterion.keyword.match_type,
  ad_group_criterion.approval_status,
  metrics.search_impression_share,
  metrics.cost_micros,
  metrics.conversions
FROM ad_group_criterion
WHERE
  campaign.name = '[CAMPAIGN_NAME]'
  AND segments.date DURING LAST_14_DAYS
  AND ad_group_criterion.type = 'KEYWORD'
ORDER BY metrics.cost_micros DESC
```

Look for: paused keywords, low search volume, disapproved keywords, quality score collapse.

### Layer 4: Ad Level
- Ad disapprovals? → Pull ad_group_ad approval_status
- Ad strength dropped?
- New ad variants introduced that diluted performance?

### Layer 5: External Factors
- Is landing page converting? (check conversion lag, not just ad-level)
- Did Quality Score change? (historical QS isn't in GAQL, but relative metrics show it)
- Any Google algorithm/policy update in that timeframe?

## Step 4 — Present Diagnosis

```
CAMPAIGN INVESTIGATION: [Campaign Name]
Issue: [Symptom description]
Onset: [Approximate date]
═══════════════════════════════════════

ROOT CAUSE: [Most likely cause — be direct, not hedged]

EVIDENCE:
- [Data point 1 supporting the root cause]
- [Data point 2]
- [Data point 3]

SECONDARY FACTORS (if any):
- [Factor 2]

RECOMMENDED FIX:
1. [Specific action 1] — Expected: [what this fixes]
2. [Specific action 2]
3. [Monitor: what to check after fix, by when]
```

## Step 5 — Execute Fix

Offer to execute the recommended fix with approval. Follow the same batch approval pattern as other skills.
