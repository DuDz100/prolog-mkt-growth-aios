---
name: budget-optimize
description: >
  Analyze Google Ads budget utilization and recommend optimizations based on impression share,
  lost budget, and campaign performance. Triggers: "optimize budget", "otimizar orçamento",
  "impression share analysis", "qual campanha precisa de mais budget", "budget recommendations",
  "/budget-optimize". Works for both Search and Demand Gen campaigns.
---

# Budget Optimize

Analyze impression share and budget utilization across Prolog App campaigns and recommend specific budget changes. Requires explicit approval before any changes are applied.

## Before Starting

Load `account-conventions` to reference current budget targets and campaign tiers.

## Step-by-Step Execution

### Step 1 — Clarify Scope

If not specified by user:
- Time window for analysis? (default: last 7 days)
- Focus on Search, Demand Gen, or all campaigns?
- Any budget ceiling for total account? (useful for allocation trade-offs)

### Step 2 — Pull Impression Share & Budget Data (Search)

```sql
SELECT
  campaign.name,
  campaign.status,
  campaign_budget.amount_micros,
  metrics.search_impression_share,
  metrics.search_budget_lost_impression_share,
  metrics.search_rank_lost_impression_share,
  metrics.cost_micros,
  metrics.clicks,
  metrics.conversions,
  metrics.cost_per_conversion
FROM campaign
WHERE
  segments.date DURING LAST_7_DAYS
  AND campaign.status = 'ENABLED'
  AND campaign.advertising_channel_type = 'SEARCH'
ORDER BY metrics.cost_micros DESC
```

### Step 3 — Pull Demand Gen Data

```sql
SELECT
  campaign.name,
  campaign.status,
  campaign_budget.amount_micros,
  metrics.cost_micros,
  metrics.clicks,
  metrics.impressions,
  metrics.ctr,
  metrics.video_views
FROM campaign
WHERE
  segments.date DURING LAST_7_DAYS
  AND campaign.status = 'ENABLED'
  AND campaign.advertising_channel_type = 'DEMAND_GEN'
ORDER BY metrics.cost_micros DESC
```

### Step 4 — Analyze and Classify

For each Search campaign, classify budget constraint:

| Budget Lost IS | Classification | Recommendation |
|---------------|----------------|----------------|
| > 40% | BUDGET CONSTRAINED — critical | Increase budget or limit hours |
| 20-40% | BUDGET CONSTRAINED — moderate | Increase budget if ROI supports |
| < 20% | RANK CONSTRAINED or healthy | Focus on bid strategy / quality score |
| < 5% | HEALTHY | No action needed |

For Demand Gen: compare daily spend vs budget cap. If consistently hitting cap, flag as constrained.

### Step 5 — Generate Recommendation Table

Present a clear table:

```
BUDGET ANALYSIS — Last 7 Days
═══════════════════════════════════════════════════════════════
Campaign                    | Daily Budget | IS% | Lost (Budget) | Lost (Rank) | Status
Search - Meeting Notes      | R$ 150       | 42% | 51%           | 7%          | ⚠️ CONSTRAINED
Search - AI Productivity    | R$ 80        | 78% | 8%            | 14%         | ✅ HEALTHY
DemandGen - Retargeting     | R$ 50        | —   | hitting cap   | —           | ⚠️ CONSTRAINED
DemandGen - Awareness       | R$ 100       | —   | 20% remaining | —           | ✅ HEALTHY

RECOMMENDATIONS:
1. Search - Meeting Notes: Increase from R$ 150 → R$ 200/day (+33%)
   Reasoning: 51% budget loss = losing ~half your potential impressions to budget cap
   Expected impact: IS could reach 60-65%, ~18 more clicks/day at current CPC

2. DemandGen - Retargeting: Increase from R$ 50 → R$ 65/day (+30%)
   Reasoning: Hitting daily cap, retargeting has highest purchase intent in DG
```

### Step 6 — Offer to Apply

> "Want me to apply these budget changes? I'll update each campaign one at a time and confirm before moving to the next."

If confirmed for each:
- Show: "Updating [Campaign] from R$ X to R$ Y. Confirm?"
- Apply via Google Ads API after explicit "yes"
- Report success/failure for each

## Context Window Note

Keep campaign-level constraints explicit. If context grows large, re-load `account-conventions` to avoid forgetting campaign-specific rules (e.g., not over-investing in brand campaigns that have IS > 90%).
