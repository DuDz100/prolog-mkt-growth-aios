// 📍 Módulo de Rastreamento - Monitora campanhas em tempo real

import { config } from '../utils/config.js';
import fs from 'fs';
import path from 'path';

console.log('\n📍 RASTREAMENTO DE CAMPANHAS\n');

// Simula dados de rastreamento em tempo real
const dadosRastreamento = {
  timestamp: new Date().toISOString(),
  campanhas: [
    {
      id: 'camp_001',
      nome: 'Google Ads - Verão 2026',
      ultimoUpdate: new Date(Date.now() - 5 * 60000).toISOString(), // 5 min atrás
      statusSaude: 'saudavel',
      metricas: {
        impressoesHoje: 8500,
        cliquesHoje: 420,
        gastosHoje: 950,
        conversoesHoje: 28,
      },
    },
    {
      id: 'camp_002',
      nome: 'Facebook - Alcance Local',
      ultimoUpdate: new Date(Date.now() - 10 * 60000).toISOString(), // 10 min atrás
      statusSaude: 'aviso',
      metricas: {
        impressoesHoje: 3200,
        cliquesHoje: 95,
        gastosHoje: 280,
        conversoesHoje: 5,
      },
      alerta: 'CTR caiu 15% nos últimos 3 dias',
    },
  ],
};

// Exibe status das campanhas
function exibirStatusCampanhas(dados) {
  console.log('🔍 STATUS EM TEMPO REAL:\n');

  dados.campanhas.forEach((camp) => {
    const icone =
      camp.statusSaude === 'saudavel' ? '✅' : camp.statusSaude === 'aviso' ? '⚠️' : '❌';

    console.log(`${icone} ${camp.nome}`);
    console.log(`   ID: ${camp.id}`);
    console.log(`   Última atualização: ${camp.ultimoUpdate}`);
    console.log(`   Status: ${camp.statusSaude.toUpperCase()}`);

    if (camp.alerta) {
      console.log(`   🚨 ALERTA: ${camp.alerta}`);
    }

    console.log(`   \n   📊 Métricas de hoje:`);
    console.log(
      `   • Impressões: ${camp.metricas.impressoesHoje.toLocaleString('pt-BR')}`
    );
    console.log(`   • Cliques: ${camp.metricas.cliquesHoje}`);
    console.log(`   • Gastos: R$ ${camp.metricas.gastosHoje.toFixed(2)}`);
    console.log(`   • Conversões: ${camp.metricas.conversoesHoje}\n`);
  });
}

// Salva log de rastreamento
function salvarLogRastreamento(dados) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const nomeArquivo = `tracking_${timestamp}.json`;
  const caminho = path.join(config.paths.logs, nomeArquivo);

  fs.mkdirSync(config.paths.logs, { recursive: true });
  fs.writeFileSync(caminho, JSON.stringify(dados, null, 2), 'utf-8');

  return { nomeArquivo, caminho };
}

// Detecta anomalias
function detectarAnomalias(dados) {
  console.log('\n🔍 DETECÇÃO DE ANOMALIAS:\n');

  const anomalias = dados.campanhas.filter((camp) => camp.statusSaude !== 'saudavel');

  if (anomalias.length === 0) {
    console.log('✅ Nenhuma anomalia detectada. Tudo operacional!\n');
  } else {
    anomalias.forEach((anom) => {
      console.log(`⚠️  ${anom.nome}`);
      console.log(`   ${anom.alerta || 'Status comprometido'}\n`);
    });
  }
}

// Executa o rastreamento
exibirStatusCampanhas(dadosRastreamento);
detectarAnomalias(dadosRastreamento);

const { nomeArquivo, caminho } = salvarLogRastreamento(dadosRastreamento);
console.log(`📝 Log salvo em: ${caminho}\n`);
