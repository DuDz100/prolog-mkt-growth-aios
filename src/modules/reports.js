// 📈 Módulo de Relatórios - Gera insights de desempenho das campanhas

import { config } from '../utils/config.js';
import fs from 'fs';
import path from 'path';

console.log('\n📊 GERADOR DE RELATÓRIOS DE DESEMPENHO\n');

// Simula dados de campanhas (você vai integrar com APIs reais)
const campanhasExemplo = [
  {
    id: 'camp_001',
    nome: 'Google Ads - Verão 2026',
    plataforma: 'Google Ads',
    status: 'ativa',
    gastos: 5000,
    impressoes: 45000,
    cliques: 2300,
    conversoes: 150,
    dataInicio: '2026-03-01',
    dataFim: null,
  },
  {
    id: 'camp_002',
    nome: 'Facebook - Alcance Local',
    plataforma: 'Facebook',
    status: 'ativa',
    gastos: 2000,
    impressoes: 25000,
    cliques: 800,
    conversoes: 45,
    dataInicio: '2026-03-15',
    dataFim: null,
  },
  {
    id: 'camp_003',
    nome: 'Google Ads - Teste ABC',
    plataforma: 'Google Ads',
    status: 'pausada',
    gastos: 1500,
    impressoes: 12000,
    cliques: 350,
    conversoes: 20,
    dataInicio: '2026-02-01',
    dataFim: '2026-03-20',
  },
];

// Calcula métricas
function calcularMetricas(campanha) {
  const ctr = (campanha.cliques / campanha.impressoes * 100).toFixed(2);
  const cpc = (campanha.gastos / campanha.cliques).toFixed(2);
  const cpa = (campanha.gastos / campanha.conversoes).toFixed(2);
  const roi = ((campanha.conversoes * 100 - campanha.gastos) / campanha.gastos * 100).toFixed(2);

  return { ctr, cpc, cpa, roi };
}

// Gera relatório em texto
function gerarRelatorioTexto(campanhas) {
  let relatorio = '═══════════════════════════════════════════════════════════\n';
  relatorio += '         📊 RELATÓRIO DE DESEMPENHO DE CAMPANHAS\n';
  relatorio += `         Data: ${new Date().toLocaleDateString('pt-BR')}\n`;
  relatorio += '═══════════════════════════════════════════════════════════\n\n';

  let gastoTotal = 0;
  let conversoesTotal = 0;

  campanhas.forEach((camp) => {
    const metricas = calcularMetricas(camp);
    gastoTotal += camp.gastos;
    conversoesTotal += camp.conversoes;

    relatorio += `📌 ${camp.nome}\n`;
    relatorio += `   Plataforma: ${camp.plataforma} | Status: ${camp.status}\n`;
    relatorio += `   ─────────────────────────────────\n`;
    relatorio += `   💰 Gastos: R$ ${camp.gastos.toLocaleString('pt-BR')}\n`;
    relatorio += `   👁️  Impressões: ${camp.impressoes.toLocaleString('pt-BR')}\n`;
    relatorio += `   🖱️  Cliques: ${camp.cliques}\n`;
    relatorio += `   ✅ Conversões: ${camp.conversoes}\n`;
    relatorio += `   \n   📊 KPIs:\n`;
    relatorio += `   • CTR: ${metricas.ctr}%\n`;
    relatorio += `   • CPC: R$ ${metricas.cpc}\n`;
    relatorio += `   • CPA: R$ ${metricas.cpa}\n`;
    relatorio += `   • ROI: ${metricas.roi}%\n\n`;
  });

  relatorio += '═══════════════════════════════════════════════════════════\n';
  relatorio += '                    📌 RESUMO GERAL\n';
  relatorio += '═══════════════════════════════════════════════════════════\n';
  relatorio += `💰 Gasto Total: R$ ${gastoTotal.toLocaleString('pt-BR')}\n`;
  relatorio += `✅ Conversões Totais: ${conversoesTotal}\n`;
  relatorio += `📈 Retorno Médio: R$ ${(gastoTotal / conversoesTotal).toFixed(2)} por conversão\n`;

  return relatorio;
}

// Salva relatório em arquivo
function salvarRelatorio(conteudo) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const nomeArquivo = `relatorio_${timestamp}.txt`;
  const caminho = path.join(config.paths.reports, nomeArquivo);

  fs.mkdirSync(config.paths.reports, { recursive: true });
  fs.writeFileSync(caminho, conteudo, 'utf-8');

  return { nomeArquivo, caminho };
}

// Executa o gerador de relatórios
console.log('⏳ Gerando relatório...\n');
const relatorio = gerarRelatorioTexto(campanhasExemplo);
console.log(relatorio);

const { nomeArquivo, caminho } = salvarRelatorio(relatorio);
console.log(`✅ Relatório salvo em: ${caminho}\n`);
