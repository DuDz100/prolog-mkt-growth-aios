---
name: account-conventions
description: >
  Reference guide for the Prolog App Google Ads account structure, naming conventions,
  and campaign organization. Load this skill when analyzing campaigns, writing new ads,
  or making structural changes to understand account-specific rules.
---

# Prolog App — Account Conventions

This skill defines the structural rules and naming conventions for the Prolog App Google Ads account. Always load this before any skill that touches campaign structure, keywords, or ad copy.

## Account Overview

**Product:** Prolog App — [descreva o produto aqui, ex: ferramenta de anotações para reuniões com IA]
**Primary Markets:** Brasil (principal), English-speaking markets (secundário)
**Campaign Types:** Search + Demand Gen

## Campaign Naming Convention

Use the format: `[Type] - [Theme] - [Match Type] - [Language]`

Examples:
- `Search - Meeting Notes - BMM - PT-BR`
- `Search - Productivity - Exact - EN`
- `DemandGen - Retargeting - PT-BR`
- `DemandGen - Awareness - EN`

## Ad Group Naming Convention

Use the format: `[Core Theme] | [Variant]`

Examples:
- `Meeting Notes | AI`
- `Productivity | Teams`
- `Collaboration | Remote`

## Match Type Strategy

- **Broad Match:** Only in campaigns with tight negative keyword control. Monitor weekly.
- **Exact/Phrase:** Preferred for high-intent keywords.
- **Demand Gen:** No keyword-level control — manage via audience and creative signals.

## Campaign Themes (Search)

List your core Search campaign themes here so the search-term-methodology skill can evaluate relevance accurately:

| Theme | Keywords Signal | Intent |
|-------|----------------|--------|
| Meeting Notes | meeting notes, note taking, meeting minutes, resumo reunião | High — product-specific |
| AI Productivity | AI assistant, productivity tool, work assistant | Mid — broad but relevant |
| Collaboration | team notes, shared docs, equipe | Mid — relevant if work-context |
| Brand | prolog, prolog app | High — protect brand |

## Negative Keywords (Global List — Applied at Account Level)

Always apply at campaign level or higher. Never remove without explicit review.

**Jobs / HR:**
- jobs, careers, salary, hiring, recrutamento, vagas

**Free / Piracy:**
- free download, crack, torrent, pirata, grátis (unless specific free-tier campaign)

**Research / Academic:**
- essay, thesis, tese, dissertação, academic paper

**Competitor Brand:**
- [list competitor names here]

## Budget Tiers

| Campaign | Daily Budget | Target CPA | Notes |
|----------|-------------|-----------|-------|
| Search - Core | R$ X | R$ Y | Main driver |
| DemandGen - Retargeting | R$ X | — | CPM/CPV model |
| DemandGen - Awareness | R$ X | — | Top of funnel |

> **Update this table** whenever budgets change. Claude will reference it for budget-optimize skill.

## Approval Rules

- **Negative keywords:** Require explicit "yes" before adding. Review by ad group and campaign batch.
- **Budget changes:** Show current vs proposed, impression share impact, confirm before applying.
- **Ad copy changes:** Always preview existing RSA performance before suggesting replacements.
