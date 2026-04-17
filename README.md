# 📊 MKT-GROWTH-AIOS

Sistema inteligente AIOS para Performance Marketing. Seu braço direto em relatórios, rastreamento e automações.

## 🎯 O que ele faz

✅ **Relatórios de Desempenho** — Analisa campanhas e gera insights  
✅ **Rastreamento de Campanhas** — Monitora métricas em tempo real  
✅ **Automações Operacionais** — Economiza horas de trabalho manual  

## 📦 Instalação

```bash
# Clone ou navegue até a pasta
cd mkt-growth-aios

# Instale as dependências
npm install

# Configure seu ambiente
cp .env.example .env
# Edite o .env com suas chaves de API
```

## 🚀 Como usar

```bash
# Gerar relatório de desempenho
npm run reports

# Rastrear campanhas
npm run tracking

# Executar automações
npm run automation

# Modo desenvolvimento (recarrega automaticamente)
npm run dev
```

## 📁 Estrutura do Projeto

```
mkt-growth-aios/
├── src/
│   ├── modules/
│   │   ├── reports.js      (Geração de relatórios)
│   │   ├── tracking.js     (Rastreamento de campanhas)
│   │   └── automation.js   (Automações operacionais)
│   ├── utils/
│   │   └── config.js       (Configurações)
│   └── index.js            (Entrada principal)
├── data/
│   └── campaigns/          (Dados das campanhas)
├── reports/
│   └── output/             (Relatórios gerados)
├── logs/                   (Logs do sistema)
├── .env.example            (Variáveis de ambiente)
└── README.md               (Este arquivo)
```

## 🔧 Configuração

Crie um arquivo `.env` com suas chaves:

```env
# APIs de Marketing
GOOGLE_ADS_API_KEY=sua-chave-aqui
FACEBOOK_API_KEY=sua-chave-aqui
ANALYTICS_TOKEN=seu-token-aqui

# Configurações
LOG_LEVEL=info
ENVIRONMENT=development
```

## 📝 Próximos passos

1. Configure suas APIs no `.env`
2. Adicione dados das suas campanhas em `data/campaigns/`
3. Execute os módulos e veja a magia acontecer!

---

**Versão:** 1.0.0  
**Criado por:** Eduardo  
**Data:** 2026-04-09
