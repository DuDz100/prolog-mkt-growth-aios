---
name: demand-gen-review
description: >
  Review and optimize Demand Gen campaigns for Prolog App. Covers audience performance,
  creative health, placement analysis, and budget pacing. Triggers: "review demand gen",
  "demand gen performance", "otimizar demand gen", "creative performance", "/demand-gen-review".
---

# Demand Gen Review

Demand Gen campaigns require a different lens than Search — no keyword control, driven by audience signals and creative quality. This skill covers the specific levers available in Demand Gen.

## Before Starting

Load:
- `account-conventions` — campaign budget targets and audience strategy
- `ad-copy-principles` — Demand Gen creative principles

## Key Difference vs Search

| Lever | Search | Demand Gen |
|-------|--------|------------|
| Keyword control | Yes | No |
| Audience targeting | Optional | Primary |
| Creative variety | RSA text | Image/Video/Carousel |
| Bidding | CPC, Target CPA | Target CPA, Max Conv |
| Negative keywords | Yes | Limited (audience exclusions only) |

## Step 1 — Pull Campaign Performance

```sql
SELECT
  campaign.name,
  campaign.status,
  campaign_budget.amount_micros,
  metrics.cost_micros,
  metrics.clicks,
  metrics.impressions,
  metrics.ctr,
  metrics.conversions,
  metrics.cost_per_conversion,
  metrics.video_views,
  metrics.video_view_rate
FROM campaign
WHERE
  segments.date DURING LAST_30_DAYS
  AND campaign.advertising_channel_type = 'DEMAND_GEN'
ORDER BY metrics.cost_micros DESC
```

## Step 2 — Pull Creative Performance

```sql
SELECT
  campaign.name,
  ad_group.name,
  ad_group_ad.ad.name,
  ad_group_ad.ad_strength,
  metrics.impressions,
  metrics.clicks,
  metrics.ctr,
  metrics.conversions,
  metrics.cost_micros
FROM ad_group_ad
WHERE
  segments.date DURING LAST_30_DAYS
  AND campaign.advertising_channel_type = 'DEMAND_GEN'
  AND ad_group_ad.status = 'ENABLED'
ORDER BY metrics.impressions DESC
```

## Step 3 — Audience Analysis

```sql
SELECT
  campaign.name,
  ad_group.name,
  ad_group_criterion.display_name,
  metrics.cost_micros,
  metrics.clicks,
  metrics.conversions,
  metrics.cost_per_conversion
FROM ad_group_audience_view
WHERE
  segments.date DURING LAST_30_DAYS
  AND campaign.advertising_channel_type = 'DEMAND_GEN'
ORDER BY metrics.cost_micros DESC
```

## Step 4 — Evaluate Health

**Creative health checks:**
- [ ] Ad strength ≥ Good on all active creatives
- [ ] At least 3 headline variants
- [ ] At least 2 image variants (different formats: square, landscape)
- [ ] Video asset present (if campaign supports)
- [ ] CTR > 0.5% (Demand Gen benchmark is lower than Search)

**Budget pacing:**
- Is spend hitting daily cap? → Budget constrained → increase or widen schedule
- Is spend underdelivering? → Creative quality, audience too narrow, or bid too low

**Audience health:**
- Top converting audience vs spend share — is budget aligned with what converts?
- Are retargeting audiences performing better than prospecting? (Expected: yes)
- Any audience with significant spend and 0 conversions?

## Step 5 — Output Report

```
DEMAND GEN REVIEW — Prolog App — Last 30 Days
═══════════════════════════════════════════════

CAMPAIGN PERFORMANCE
[Table: Campaign | Budget | Spend | Clicks | Conv | CPA | Video Views | CTR]

CREATIVE HEALTH
[Table: Creative | Ad Strength | Impressions | CTR | Conv | Status]
⚠️ Issues: [List any Poor strength ads or low CTR creatives]

AUDIENCE INSIGHTS
Best converting: [Audience] — CPA: R$ XX
Most wasteful: [Audience] — R$ XX spend, 0 conversions → Recommend exclusion

RECOMMENDATIONS:
1. [Creative refresh suggestion with specific copy/asset ideas]
2. [Audience exclusion or bid adjustment]
3. [Budget reallocation between prospecting and retargeting]
```

## Step 6 — Creative Suggestions

If creative refresh is needed, draft new headline/description variants following `ad-copy-principles`. Present for review before any live changes.
