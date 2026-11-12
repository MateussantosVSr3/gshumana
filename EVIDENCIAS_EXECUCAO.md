# Evidências de execução disponíveis

## Cybersecurity

Executado localmente em 11/11/2026:

- `node --test cybersecurity/test/*.test.js`: 4 testes aprovados, 0 falhas.
- `node cybersecurity/src/audit-demo.js`: fluxo contaminado bloqueado; fluxo sanitizado entregue; indicador 75/crítico no cenário de auditoria.
- Painel: `docs/evidencias/cyber-dashboard.png` e `docs/evidencias/cyber-dashboard-risco-critico.png`.

## Validações estruturais

- JSON válido: configuração mobile, Wokwi e notebook.
- Sintaxe Bash válida: provisionamento, monitor e teste de falha.
- Sintaxe Python válida: download oficial do INMET.
- PDF de QA válido e pacote ZIP de Cybersecurity íntegro.

## Execuções externas pendentes

API .NET, Expo, notebook completo, VM Linux e Wokwi precisam ser executados em máquinas com seus SDKs/dependências. Não foram criadas capturas falsas para esses itens.
