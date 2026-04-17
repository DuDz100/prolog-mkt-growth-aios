# CLAUDE.md — prolog-mkt-growth-aiox

Instruções para o Claude Code neste projeto. Sempre seguir estas regras ao trabalhar aqui.

---

## 📌 Identidade do Projeto

| Campo        | Info                                                              |
|--------------|-------------------------------------------------------------------|
| Nome         | prolog-mkt-growth-aiox                                            |
| Dono         | Eduardo (Prologger)                                               |
| Propósito    | Sistema AIOS de Performance Marketing para o Prolog App           |
| Stack        | Node.js (ESM), Google Ads API, GAQL MCP, Claude Cowork            |
| Status       | Desenvolvimento ativo                                             |

---

## 🗂️ Estrutura do Projeto

```
prolog-mkt-growth-aiox/
├── src/
│   ├── index.js                  ← Entrada principal
│   ├── modules/
│   │   ├── reports.js            ← Geração de relatórios
│   │   ├── tracking.js           ← Rastreamento de campanhas
│   │   └── automation.js         ← Automações operacionais
│   └── utils/
│       └── config.js             ← Configurações e variáveis
│
├── prolog-ads-plugin/            ← Plugin Google Ads para Claude Cowork
│   ├── README.md
│   ├── SETUP_GUIDE.md
│   └── skills/
│       ├── account-conventions/  ← Estrutura e naming da conta
│       ├── ad-copy-principles/   ← Voz da marca e diretrizes de copy
│       ├── audit-ad-copy/        ← Auditoria de RSAs e Demand Gen
│       ├── budget-optimize/      ← Análise e recomendações de budget
│       ├── demand-gen-review/    ← Review de campanhas Demand Gen
│       ├── investigate-campaign/ ← Diagnóstico de campanhas com problema
│       ├── mine-search-terms/    ← Mineração de termos negativos
│       ├── performance-analysis/ ← Análise segmentada (device, geo, etc)
│       ├── search-term-methodology/ ← Framework de classificação de termos
│       └── weekly-review/        ← Review semanal completo
│
├── guia-de-copy-buyer-persona/   ← Guia de copy e buyer persona
│   └── index.html
│
├── package.json
├── .env                          ← Variáveis de ambiente (não commitar)
└── CLAUDE.md                     ← Este arquivo
```

---

## ⚙️ Scripts Disponíveis

| Comando              | O que faz                          |
|----------------------|------------------------------------|
| `npm start`          | Inicia o sistema                   |
| `npm run dev`        | Modo desenvolvimento (watch)       |
| `npm run reports`    | Executa módulo de relatórios       |
| `npm run tracking`   | Executa módulo de rastreamento     |
| `npm run automation` | Executa módulo de automações       |

---

## 🔌 Skills do Plugin (Claude Cowork)

Ativar com `/nome-da-skill` no Claude Cowork:

| Skill                    | Trigger                    | Carrega automaticamente? |
|--------------------------|----------------------------|--------------------------|
| `mine-search-terms`      | `/mine-search-terms`       | Não                      |
| `budget-optimize`        | `/budget-optimize`         | Não                      |
| `audit-ad-copy`          | `/audit-ad-copy`           | Não                      |
| `weekly-review`          | `/weekly-review`           | Não                      |
| `investigate-campaign`   | `/investigate-campaign`    | Não                      |
| `performance-analysis`   | `/performance-analysis`    | Não                      |
| `demand-gen-review`      | `/demand-gen-review`       | Não                      |
| `search-term-methodology`| —                          | Sim (automático)         |
| `account-conventions`    | —                          | Sim (automático)         |
| `ad-copy-principles`     | —                          | Sim (automático)         |

---

## 🔐 Variáveis de Ambiente

Arquivo `.env` necessário (nunca commitar):

```env
GOOGLE_ADS_DEVELOPER_TOKEN=
GOOGLE_ADS_CLIENT_ID=
GOOGLE_ADS_CLIENT_SECRET=
GOOGLE_ADS_REFRESH_TOKEN=
GOOGLE_ADS_LOGIN_CUSTOMER_ID=
GOOGLE_ADS_CUSTOMER_ID=
ANALYTICS_TOKEN=
LOG_LEVEL=info
ENVIRONMENT=development
```

---

## 📋 Regras para o Claude

- **Sempre responder em português**
- **Nunca commitar o arquivo `.env`** — contém credenciais sensíveis
- **Mutações no Google Ads requerem aprovação explícita** — nunca executar writes sem confirmação
- **Antes de modificar skills**, verificar impacto no workflow de campanhas
- **Módulos em `src/modules/` são independentes** — cada um pode rodar isolado
- **Perguntar antes de deletar** qualquer arquivo ou pasta

---

## 🏗️ Arquitetura do Plugin

```
Claude Cowork (Desktop + Dispatch)
         │
         ├── Skills (prolog-ads-plugin/skills/)
         │     └── Codificam a metodologia de paid search
         │
         ├── GAQL MCP  ← Leitura (read-only)
         │     └── Queries em campanhas, search terms, keywords
         │
         └── Google Ads API  ← Escrita (requer aprovação)
               └── Adicionar negativos, alterar budgets, atualizar bids
                         │
                         ▼
               Conta Google Ads — Prolog App
```

---

## 🚀 Próximos Passos

- [ ] Configurar variáveis no `.env`
- [ ] Personalizar `skills/account-conventions/SKILL.md` com campanhas reais
- [ ] Personalizar `skills/ad-copy-principles/SKILL.md` com benchmarks reais
- [ ] Solicitar upgrade do Developer Token para Basic Access
- [ ] Integrar módulos `src/modules/` com dados reais das campanhas

---

**Versão:** 1.0.0 | **Criado:** 2026-04-17 | **Dono:** Eduardo (Prologger)
