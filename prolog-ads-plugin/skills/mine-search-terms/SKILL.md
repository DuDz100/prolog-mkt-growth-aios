---
name: mine-search-terms
description: >
  Mine Google Ads search terms for negative keyword opportunities and new keyword candidates.
  Triggers: "mine search terms", "find negative keywords", "search term report", "audit search terms",
  "quais termos devo negativar", "analisa os search terms", "/mine-search-terms".
  Requires GAQL MCP connection to Google Ads.
---

# Mine Search Terms

Pull search term data from Google Ads, evaluate every term using the search-term-methodology skill, and produce a classification report with a bulk-upload-ready negative keyword CSV.

## Before Starting

Load these skills as context:
- `search-term-methodology` — evaluation framework and classification rules
- `account-conventions` — campaign themes and naming for relevance assessment

## Step-by-Step Execution

### Step 1 — Clarify Scope

If the user didn't specify, ask:
- Which campaign(s)? (or "all Search campaigns"?)
- Time window? (default: last 14 days)
- Minimum spend threshold for terms to review? (default: R$ 2+)

### Step 2 — Pull Search Terms via GAQL

Use the GAQL MCP to run this query (adjust campaign names/IDs as needed):

```sql
SELECT
  campaign.name,
  ad_group.name,
  segments.search_term_match_type,
  search_term_view.search_term,
  search_term_view.status,
  metrics.cost_micros,
  metrics.clicks,
  metrics.impressions,
  metrics.conversions,
  metrics.ctr,
  metrics.average_cpc
FROM search_term_view
WHERE
  segments.date DURING LAST_14_DAYS
  AND search_term_view.status = 'NONE'
  AND campaign.advertising_channel_type = 'SEARCH'
ORDER BY metrics.cost_micros DESC
LIMIT 500
```

**Key filter:** `status = 'NONE'` means the term is NOT yet added as a keyword or negative. This is the only universe we care about.

### Step 3 — Evaluate Every Term

For each term in the results:
1. Note the campaign theme from `account-conventions`
2. Cross-reference: search term + matched keyword + campaign/ad group theme
3. Apply the classification logic from `search-term-methodology`
4. Assign: NEGATE / KEEP / ADD + write reasoning

### Step 4 — Generate Summary

Present a summary table before the CSV:

```
SEARCH TERM ANALYSIS — [Campaign Name] — Last 14 Days
────────────────────────────────────────────────────
Total terms reviewed: XX
Total spend on reviewed terms: R$ XXX

Classification breakdown:
  NEGATE: XX terms — R$ XXX at risk
  KEEP:   XX terms — R$ XXX (correctly matched)
  ADD:    XX terms — R$ XX (keyword candidates)

Top 5 spend-wasters flagged for negation:
  1. [term] — R$ XX — [reason]
  2. [term] — R$ XX — [reason]
  3. [term] — R$ XX — [reason]
  4. [term] — R$ XX — [reason]
  5. [term] — R$ XX — [reason]
```

### Step 5 — Generate CSV

Create a CSV file named `negatives-[campaign]-[date].csv` with this format:

```
Campaign,Ad Group,Keyword,Match Type,Reason
Search - Meeting Notes,Meeting Notes AI,meeting notes jobs,Broad Match Negative,Wrong intent: job seeker not user
Search - Meeting Notes,*,prolog free download,Broad Match Negative,Wrong intent: piracy signal
```

**Level decision:**
- If the bad term appears in multiple ad groups → apply at **CAMPAIGN level** (use `*` for Ad Group)
- If it's unique to one ad group context → apply at **AD GROUP level**

This format is compatible with Google Ads Editor bulk upload.

### Step 6 — Offer to Apply via API

After presenting the summary and CSV, ask:

> "Want me to add these [N] negative keywords directly to your account? I'll group them by campaign and show you each batch before executing anything. Nothing changes without your explicit 'yes'."

If the user confirms:
1. Group negatives by campaign
2. Present each batch: "Campaign X — adding Y negatives: [list top 5]… and N more. Confirm?"
3. Wait for explicit "yes" before making the API call
4. Apply at campaign level when appropriate
5. Confirm success and print a summary of what was added

## Error Handling

- If GAQL returns no results: check date range, campaign type filter, and verify MCP connection
- If a term is ambiguous (can't determine intent): mark as KEEP with note "ambiguous — review manually"
- If API write fails: report exact error, suggest manual CSV upload as fallback
