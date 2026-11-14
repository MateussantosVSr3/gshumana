# Evidências de execução disponíveis

## Cybersecurity

Executado novamente em 14/11/2026:

- `node --test cybersecurity/test/*.test.js`: 4 testes aprovados, 0 falhas.
- `node cybersecurity/src/audit-demo.js`: fluxo contaminado bloqueado; fluxo sanitizado entregue; indicador 75/crítico no cenário de auditoria.
- Painel: `docs/evidencias/cyber-dashboard.png` e `docs/evidencias/cyber-dashboard-risco-critico.png`.

## Validações estruturais

- Backend .NET 8: compilação aprovada; quatro testes xUnit aprovados; migração SQLite aplicada; `POST /api/v1/readings`, consulta, risco e Swagger validados. O contrato retorna o nível de risco como texto compatível com o aplicativo.
- Mobile: `npm run typecheck` aprovado; Expo Doctor 18/18; bundle Android gerado com 949 módulos.
- Machine Learning: dois CSVs oficiais do INMET baixados; notebook executado com 17.477 linhas válidas; F1 de teste 0,796; relatório preenchido com métricas reais.
- Physical Computing: firmware compilado no PlatformIO; 14,3% de RAM e 70,4% de flash.
- Linux: publicação Release da API gerada; sintaxe Bash válida para provisionamento, monitor e teste de falha.
- QA: cinco Features e dez Test Cases validados; PDF regenerado em 14/11/2026.
- QA/API: sete testes de integração aprovados, cobrindo saúde, pontos acessíveis, relato válido, rejeição de PII, leitura válida, umidade inválida e filtro por bairro.
- Cybersecurity: quatro testes aprovados e demonstração de auditoria executada.

## Execuções externas pendentes

A VM Ubuntu ainda precisa ser executada para evidenciar `systemd`, monitoramento e reinício. O Azure Boards exige a conta da equipe para importação e prints. O aplicativo e o Wokwi precisam ser abertos durante a gravação para capturas reais. A entrevista e as fotos do território devem ser produzidas pela equipe. Não foram criadas capturas falsas para esses itens.
