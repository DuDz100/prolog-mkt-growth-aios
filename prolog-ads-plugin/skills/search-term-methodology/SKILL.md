---
name: search-term-methodology
description: >
  Evaluation framework for classifying Google Ads search terms as Negate, Keep, or Add as Keyword.
  Load this skill whenever evaluating search term reports — it defines the relevance criteria,
  classification logic, and reasoning format used by mine-search-terms.
---

# Search Term Evaluation Methodology

This skill defines the judgment framework for evaluating search terms in the Prolog App account. Load this before running any search term analysis.

## Core Principle

Relevance to campaign theme matters more than conversion count alone. A term with zero conversions but high thematic relevance should be KEPT. A term with clicks but wrong intent should be NEGATED.

## Three-Way Cross-Reference

For every search term, evaluate against three things simultaneously:

1. **The search term itself** — what did the user actually type?
2. **The matched keyword** — what keyword triggered the ad?
3. **The campaign + ad group theme** — what is this ad group trying to capture?

The question is always: *Does this search term fit the campaign theme?*

## Classification System

### NEGATE — Add as negative keyword
Apply when the term shows ANY of these signals:

| Signal | Examples |
|--------|---------|
| Wrong intent (jobs/HR) | "prolog developer jobs", "meeting notes template free download" |
| Competitor brand | Any competitor app name |
| Research/academic | "meeting notes dissertation", "academic note taking methodology" |
| Too generic, no purchase intent | "what is a meeting", "como fazer anotações" (too broad) |
| Wrong language match (if lang-targeted) | English term in PT-BR campaign |
| Product mismatch | Unrelated software, hardware, services |

### KEEP — Relevant, leave as is
Apply when:
- Term is on-theme for the campaign, even with zero conversions
- Term shows clear purchase/trial intent aligned with Prolog's use case
- Term is a valid variant of an existing keyword being tested

### ADD — Promote to keyword
Apply when:
- Term has 3+ conversions and is not already a keyword
- Term reveals a high-intent variant worth bidding explicitly
- Term consistently shows up with good CTR and engagement

## Sorting Priority

Always process in this order:
1. **Sort by spend descending** — highest cost terms first (stop the bleeding)
2. **Then by clicks descending** — volume second
3. Focus energy on terms with cost > R$ 5 or clicks > 10

## Reasoning Format

Every classification must include a reasoning field explaining WHY:

**Template:** `[NEGATE/KEEP/ADD] — [1-line reason tied to campaign theme]`

Examples:
- `NEGATE — Off-theme: user searching for free templates, not Prolog subscription`
- `NEGATE — Wrong intent: "meeting notes jobs" signals hiring, not product use`
- `KEEP — On-theme: "resumo reunião IA" aligns with AI Meeting Notes campaign`
- `ADD — High conversion keyword: 4 conversions, exact match not yet in account`

## Output Format

The search-term-methodology produces inputs for mine-search-terms. Output is always:

- A classified list with: Campaign | Ad Group | Keyword | Search Term | Match Type | Cost | Clicks | Conversions | Classification | Reasoning
- A summary table: count of NEGATE / KEEP / ADD, total spend at risk
- A bulk-upload-ready CSV for Google Ads Editor (for NEGATE terms)
