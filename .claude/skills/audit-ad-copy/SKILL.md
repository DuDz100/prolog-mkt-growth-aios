---
name: audit-ad-copy
description: >
  Run a structured audit of Google Ads RSA and Demand Gen ad copy. Identifies underperforming ads,
  missing copy coverage, and improvement opportunities. Triggers: "audit my ads", "review ad copy",
  "which ads are underperforming", "audit copy", "analisa meus anúncios", "/audit-ad-copy".
---

# Audit Ad Copy

Pull all active RSAs and Demand Gen creatives, score them against `ad-copy-principles`, and produce a prioritized improvement list.

## Before Starting

Load:
- `ad-copy-principles` — voice, benchmarks, and copy rules
- `account-conventions` — campaign structure and themes

## Step-by-Step Execution

### Step 1 — Pull RSA Performance (Search)

```sql
SELECT
  campaign.name,
  ad_group.name,
  ad_group_ad.ad.responsive_search_ad.headlines,
  ad_group_ad.ad.responsive_search_ad.descriptions,
  ad_group_ad.ad_strength,
  metrics.impressions,
  metrics.clicks,
  metrics.ctr,
  metrics.conversions,
  metrics.cost_micros
FROM ad_group_ad
WHERE
  segments.date DURING LAST_30_DAYS
  AND ad_group_ad.status = 'ENABLED'
  AND campaign.advertising_channel_type = 'SEARCH'
ORDER BY metrics.impressions DESC
```

### Step 2 — Pull Demand Gen Creative Performance

```sql
SELECT
  campaign.name,
  ad_group.name,
  ad_group_ad.ad.demand_gen_multi_asset_ad.headlines,
  ad_group_ad.ad.demand_gen_multi_asset_ad.descriptions,
  ad_group_ad.ad_strength,
  metrics.impressions,
  metrics.clicks,
  metrics.ctr,
  metrics.video_views
FROM ad_group_ad
WHERE
  segments.date DURING LAST_30_DAYS
  AND ad_group_ad.status = 'ENABLED'
  AND campaign.advertising_channel_type = 'DEMAND_GEN'
ORDER BY metrics.impressions DESC
```

### Step 3 — Score Each Ad

For each ad, evaluate against `ad-copy-principles` checklist:

| Check | Pass | Fail | Note |
|-------|------|------|------|
| Headline variety (3+ unique angles) | ✅ | ❌ | |
| Keyword present in headlines | ✅ | ❌ | |
| CTA in at least 1 headline | ✅ | ❌ | |
| Benefit-led (not feature-led) | ✅ | ❌ | |
| All 4 descriptions used | ✅ | ❌ | |
| Ad strength ≥ Good | ✅ | ❌ | |
| CTR above 3% | ✅ | ❌ | |
| No policy risks | ✅ | ❌ | |

### Step 4 — Prioritize Issues

Rank issues by impact:
1. **HIGH** — Ad strength "Poor" + high spend (fix immediately)
2. **MEDIUM** — Low CTR, missing coverage, description gaps
3. **LOW** — Style improvements, headline variety

### Step 5 — Output Report

```
AD COPY AUDIT — Prolog App — Last 30 Days
═══════════════════════════════════════════
Total ads audited: XX (Search: X | Demand Gen: X)
Ads needing immediate action: X
Ads needing minor improvements: X
Healthy ads: X

CRITICAL ISSUES:
1. [Campaign / Ad Group] — Ad Strength: POOR — R$ XXX spend
   Issues: Missing keyword in headlines, only 2 descriptions used
   Suggested fix: [specific headline/description suggestions]

2. [Campaign / Ad Group] — CTR: 1.2% (below 3% benchmark) — XX impressions
   Issues: Headlines too generic, no benefit-led angle
   Suggested fix: [specific copy suggestion]

MEDIUM PRIORITY:
...

DEMAND GEN SPECIFIC:
...
```

### Step 6 — Offer to Draft New Copy

After the report, ask: "Want me to draft improved headlines and descriptions for the critical issues? I'll follow the ad-copy-principles and show you drafts before anything goes live."

If yes — draft new copy and present for review. Never modify live ads without explicit confirmation.
