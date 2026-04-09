// 📊 MKT-GROWTH-AIOS - Sistema Inteligente de Performance Marketing
// Arquivo principal da aplicação

import dotenv from 'dotenv';
import { config } from './utils/config.js';

// Carrega variáveis de ambiente
dotenv.config();

console.log('╔════════════════════════════════════════╗');
console.log('║     MKT-GROWTH-AIOS v1.0.0            ║');
console.log('║  Seu braço direto em Performance       ║');
console.log('╚════════════════════════════════════════╝\n');

console.log('✅ Configurações carregadas');
console.log(`📁 Ambiente: ${config.environment}`);
console.log(`📊 Nível de log: ${config.logLevel}\n`);

// Menu principal
console.log('🎯 Escolha uma opção:\n');
console.log('  npm run reports     → Gerar relatórios de desempenho');
console.log('  npm run tracking    → Rastrear campanhas');
console.log('  npm run automation  → Executar automações\n');

console.log('💡 Para mais informações, veja o README.md');
