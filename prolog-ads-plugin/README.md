# Prolog Ads Plugin

Google Ads management plugin for Prolog App, powered by Claude Cowork. Built on the architecture from Austin Lau's Google Ads Cowork plugin at Anthropic.

## What This Plugin Does

Connects Claude to your Google Ads account via the GAQL MCP for reads and the Google Ads API for write operations. Encodes your paid search and Demand Gen workflows into skills that you can invoke in chat with `/skill-name`.

**All mutations require your explicit approval before execution. Nothing changes without your "yes."**

## Skills

| Skill | Trigger | Description |
|-------|---------|-------------|
| `mine-search-terms` | `/mine-search-terms` | Mine search terms for negative keyword opportunities |
| `search-term-methodology` | (loads automatically) | Evaluation framework for classifying search terms |
| `account-conventions` | (loads automatically) | Prolog account structure and naming rules |
| `ad-copy-principles` | (loads automatically) | Brand voice and copy guidelines |
| `budget-optimize` | `/budget-optimize` | Analyze impression share and recommend budget changes |
| `audit-ad-copy` | `/audit-ad-copy` | Score RSAs and Demand Gen creatives against copy principles |
| `weekly-review` | `/weekly-review` | Full weekly performance review with action list |
| `investigate-campaign` | `/investigate-campaign` | Root-cause diagnosis for underperforming campaigns |
| `performance-analysis` | `/performance-analysis` | Segmented analysis by device, daypart, geo, or audience |
| `demand-gen-review` | `/demand-gen-review` | Demand Gen specific: creative health, audience analysis |

## Setup

### 1. Google Ads API Credentials

You need these environment variables set in your Claude Cowork environment:

```
GOOGLE_ADS_DEVELOPER_TOKEN=your-developer-token
GOOGLE_ADS_CLIENT_ID=your-oauth-client-id
GOOGLE_ADS_CLIENT_SECRET=your-oauth-client-secret
GOOGLE_ADS_REFRESH_TOKEN=your-refresh-token
GOOGLE_ADS_LOGIN_CUSTOMER_ID=your-mcc-customer-id (if using MCC)
GOOGLE_ADS_CUSTOMER_ID=your-account-customer-id
```

See `SETUP_GUIDE.md` for step-by-step instructions to obtain these credentials.

### 2. Install GAQL MCP

```bash
npm install -g @google-ads/gaql-mcp
```

### 3. Customize account-conventions

Edit `skills/account-conventions/SKILL.md` to add:
- Your campaign names and themes
- Current budget targets per campaign
- Account-specific negative keyword list
- Prolog App product description

### 4. Customize ad-copy-principles

Edit `skills/ad-copy-principles/SKILL.md` to add:
- Actual CTR and CPA benchmarks from your account
- Prolog's real value propositions with specific copy examples
- Competitor names for the negative keyword list

## Example Usage

**Mine search terms for negatives:**
```
/mine-search-terms audit my Search - Meeting Notes campaign over the last 14 days
```

**Weekly review:**
```
/weekly-review
```

**Budget check from mobile (Dispatch):**
```
/budget-optimize show me impression share by campaign for the last 7 days and tell me where I should increase budget
```

**Investigate a problem:**
```
/investigate-campaign Search - AI Productivity CPA spiked 40% this week
```

## Architecture

```
Claude Cowork (Desktop + Dispatch)
         │
         ├── Skills (this plugin)
         │     └── Encode your paid search methodology
         │
         ├── GAQL MCP (reads)
         │     └── Queries campaigns, search terms, keywords
         │
         └── Google Ads API (writes, requires approval)
               └── Add negatives, change budgets, update bids
                         │
                         ▼
               Google Ads Account (Prolog App)
```

## Safety Principles

1. **Read-only by default** — GAQL MCP only queries, never writes
2. **Explicit approval required** — Every mutation shows you what will change before executing
3. **Batch reviews** — Changes grouped by campaign, confirmed one batch at a time
4. **Audit trail** — Every skill produces a reasoning column explaining decisions
