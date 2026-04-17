# Setup Guide — Google Ads API + GAQL MCP

Guia passo a passo para configurar o acesso à API do Google Ads e conectar ao plugin Prolog Ads no Claude Cowork.

**Tempo estimado:** 30-45 minutos  
**Pré-requisitos:** Conta Google Ads ativa, acesso de administrador à conta

---

## Passo 1 — Criar um Projeto no Google Cloud

1. Acesse https://console.cloud.google.com
2. Clique em **"Select a project"** → **"New Project"**
3. Nome sugerido: `prolog-google-ads-api`
4. Clique em **Create**

---

## Passo 2 — Ativar a Google Ads API

1. No Google Cloud Console, vá em **APIs & Services** → **Library**
2. Procure por **"Google Ads API"**
3. Clique em **Enable**

---

## Passo 3 — Criar Credenciais OAuth2

1. Vá em **APIs & Services** → **Credentials**
2. Clique em **+ Create Credentials** → **OAuth client ID**
3. Se solicitado, configure o **OAuth Consent Screen** primeiro:
   - User Type: **Internal** (se for conta Google Workspace) ou External
   - App name: `Prolog Ads Plugin`
   - Support email: seu email
   - Salve e continue
4. Volte para criar OAuth client ID:
   - Application type: **Desktop app**
   - Name: `prolog-ads-desktop`
   - Clique em **Create**
5. **Anote o Client ID e Client Secret** — você vai precisar deles

---

## Passo 4 — Obter o Developer Token do Google Ads

O Developer Token é necessário para usar a Google Ads API.

1. Acesse https://ads.google.com
2. Vá em **Ferramentas** → **API Center** (ou acesse https://ads.google.com/aw/apicenter)
3. Se não tiver um Developer Token:
   - Preencha as informações de contato
   - O token inicial é **Test Account** — suficiente para começar
   - Para acesso total em produção, você precisará solicitar acesso básico (leva poucos dias)
4. **Anote seu Developer Token**

> **Nota:** Com o token em modo Test, você pode testar com dados reais de leitura mas não aplicar mudanças em produção. Solicite o upgrade para "Basic Access" quando estiver pronto.

---

## Passo 5 — Gerar o Refresh Token

Execute este script Python para gerar seu Refresh Token:

```python
# Instale: pip install google-auth-oauthlib
from google_auth_oauthlib.flow import InstalledAppFlow

CLIENT_ID = "seu-client-id-aqui"
CLIENT_SECRET = "seu-client-secret-aqui"

flow = InstalledAppFlow.from_client_config(
    {
        "installed": {
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob"],
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
        }
    },
    scopes=["https://www.googleapis.com/auth/adwords"]
)

credentials = flow.run_local_server(port=0)
print("Refresh Token:", credentials.refresh_token)
```

1. Salve como `get_token.py`
2. Execute: `python get_token.py`
3. Um browser vai abrir — faça login com a conta Google que tem acesso ao Google Ads
4. Autorize o acesso
5. **Anote o Refresh Token** exibido no terminal

---

## Passo 6 — Encontrar seu Customer ID

1. Acesse https://ads.google.com
2. O Customer ID aparece no canto superior direito no formato: `XXX-XXX-XXXX`
3. Remova os hífens: `XXXXXXXXXX`

Se você usa um Manager Account (MCC):
- **Login Customer ID** = ID da conta MCC
- **Customer ID** = ID da conta específica da Prolog App

---

## Passo 7 — Instalar o GAQL MCP

```bash
npm install -g @google-ads/gaql-mcp
```

Verifique a instalação:
```bash
npx @google-ads/gaql-mcp --version
```

---

## Passo 8 — Configurar as Variáveis de Ambiente no Cowork

No Claude Cowork, as variáveis de ambiente são configuradas nas Settings do plugin.

Você vai precisar adicionar:

```
GOOGLE_ADS_DEVELOPER_TOKEN = [seu developer token]
GOOGLE_ADS_CLIENT_ID       = [seu OAuth client ID]
GOOGLE_ADS_CLIENT_SECRET   = [seu OAuth client secret]
GOOGLE_ADS_REFRESH_TOKEN   = [seu refresh token]
GOOGLE_ADS_CUSTOMER_ID     = [ID da conta Prolog App, sem hífens]
GOOGLE_ADS_LOGIN_CUSTOMER_ID = [ID do MCC se usar — senão deixe vazio]
```

---

## Passo 9 — Testar a Conexão

No chat do Cowork, após instalar o plugin, teste com:

```
Faça uma query GAQL simples: liste os nomes das minhas campanhas ativas
```

Se o MCP estiver funcionando, Claude vai executar a query e retornar seus nomes de campanha.

---

## Passo 10 — Configurar Acesso de Escrita (Mutations)

Para que Claude possa aplicar negativos e mudar budgets, é necessário que a Google Ads API tenha permissão de escrita. Com o Developer Token em modo **Basic Access**, isso já está habilitado.

No plugin, o arquivo `.mcp.json` já está configurado para usar as mesmas credenciais para leitura (GAQL) e escrita (API direta).

---

## Troubleshooting

**"Developer token not approved":**
- Use o token em modo Test para começar
- Solicite Basic Access em https://ads.google.com/aw/apicenter

**"Invalid refresh token":**
- Refaça o Passo 5 — o token pode ter expirado ou sido revogado

**"Customer ID not found":**
- Confirme que o Customer ID está sem hífens
- Se usa MCC, certifique que tanto LOGIN_CUSTOMER_ID quanto CUSTOMER_ID estão corretos

**"GAQL query failed":**
- Verifique se o Developer Token tem acesso à conta especificada
- Teste com uma query simples primeiro antes de skills complexas

---

## Recursos Úteis

- [Google Ads API Docs](https://developers.google.com/google-ads/api/docs/start)
- [GAQL Reference](https://developers.google.com/google-ads/api/docs/query/overview)
- [GAQL MCP GitHub](https://github.com/google-ads/google-ads-gaql-mcp)
- [OAuth 2.0 Playground](https://developers.google.com/oauthplayground)
