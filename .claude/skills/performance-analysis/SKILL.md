---
name: performance-analysis
description: >
  Analyze Google Ads performance across any dimension — by device, audience, dayparting, geography,
  or keyword theme. Produces insights and recommendations beyond the standard weekly review.
  Triggers: "performance analysis", "analyze by device", "which audience converts best",
  "performance por dispositivo", "segmented analysis", "/performance-analysis".
---

# Performance Analysis

Run a segmented performance analysis across one or more dimensions to surface non-obvious opportunities and inefficiencies.

## Before Starting

Load `account-conventions` for benchmark context.

## Step 1 — Choose Analysis Dimension

If not specified, ask which dimension matters most right now:

- **Device** — Desktop vs mobile vs tablet performance
- **Dayparting** — Which hours/days drive the best CPA
- **Geography** — City/state breakdown (Brazil focus)
- **Audience** — Which audience segments convert best (Demand Gen)
- **Keyword Theme** — Which ad groups are carrying vs dragging performance
- **Match Type** — Broad vs exact performance comparison

## Queries by Dimension

### Device Segmentation
```sql
SELECT
  campaign.name,
  segments.device,
  metrics.cost_micros,
  metrics.clicks,
  metrics.conversions,
  metrics.cost_per_conversion,
  metrics.ctr
FROM campaign
WHERE
  segments.date DURING LAST_30_DAYS
  AND campaign.status = 'ENABLED'
ORDER BY campaign.name, segments.device
```

### Hourly Performance (Dayparting)
```sql
SELECT
  campaign.name,
  segments.hour,
  metrics.cost_micros,
  metrics.clicks,
  metrics.conversions,
  metrics.cost_per_conversion
FROM campaign
WHERE
  segments.date DURING LAST_30_DAYS
  AND campaign.status = 'ENABLED'
ORDER BY campaign.name, segments.hour
```

### Geographic (State-level, Brazil)
```sql
SELECT
  campaign.name,
  geographic_view.location_type,
  metrics.cost_micros,
  metrics.clicks,
  metrics.conversions,
  metrics.cost_per_conversion
FROM geographic_view
WHERE
  segments.date DURING LAST_30_DAYS
  AND campaign.status = 'ENABLED'
ORDER BY metrics.cost_micros DESC
LIMIT 50
```

## Step 2 — Analyze and Present

For each segment, compare CPA vs account average. Identify:

- **Overperformers** (CPA < account average by 20%+) — candidate for bid increase
- **Underperformers** (CPA > account average by 20%+) — candidate for bid reduction or exclusion
- **High volume, no conversion** — waste signals

## Step 3 — Output Format

```
PERFORMANCE ANALYSIS: [Dimension]
Period: Last 30 days | Account: Prolog App
═══════════════════════════════════════

SUMMARY TABLE
[Segment | Spend | Clicks | Convs | CPA | vs Average]

TOP PERFORMERS (Bid Up / Allocate More):
1. [Segment] — CPA: R$ XX (-XX% vs avg)
2. [Segment] — CPA: R$ XX (-XX% vs avg)

UNDERPERFORMERS (Bid Down / Exclude):
1. [Segment] — CPA: R$ XX (+XX% vs avg) — R$ XX in waste
2. [Segment] — CPA: R$ XX (+XX% vs avg)

RECOMMENDATIONS:
1. [Specific bid adjustment or exclusion recommendation]
2. [Daypart schedule change if relevant]
3. [Geographic bid modifier suggestion]
```

## Step 4 — Apply Adjustments

Offer to apply bid modifiers or daypart schedules. Always present exact values (e.g., "+20% bid modifier for mobile") and wait for confirmation before applying.
