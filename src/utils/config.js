// ⚙️ Configurações do MKT-GROWTH-AIOS

export const config = {
  // Ambiente
  environment: process.env.ENVIRONMENT || 'development',
  logLevel: process.env.LOG_LEVEL || 'info',
  port: parseInt(process.env.PORT || '3000'),

  // APIs de Marketing
  apis: {
    googleAds: {
      apiKey: process.env.GOOGLE_ADS_API_KEY || '',
      enabled: !!process.env.GOOGLE_ADS_API_KEY,
    },
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID || '',
      enabled: !!process.env.GOOGLE_ANALYTICS_ID,
    },
    facebook: {
      apiKey: process.env.FACEBOOK_API_KEY || '',
      pixelId: process.env.FACEBOOK_PIXEL_ID || '',
      enabled: !!process.env.FACEBOOK_API_KEY,
    },
  },

  // Banco de dados
  database: {
    url: process.env.DATABASE_URL || 'sqlite://./data/mkt-growth.db',
  },

  // Notificações
  notifications: {
    slack: {
      webhookUrl: process.env.SLACK_WEBHOOK_URL || '',
      enabled: !!process.env.SLACK_WEBHOOK_URL,
    },
    email: {
      notifier: process.env.EMAIL_NOTIFIER || '',
      enabled: !!process.env.EMAIL_NOTIFIER,
    },
  },

  // Caminhos
  paths: {
    campaigns: './data/campaigns',
    reports: './reports/output',
    logs: './logs',
  },
};

export default config;
