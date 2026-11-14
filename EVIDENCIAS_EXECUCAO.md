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
- Linux: Ubuntu 24.04.5 executado no WSL2; API e monitor ativos no `systemd`; usuário restrito, proteções, `api=ok`, health check e reinício automático validados.
- QA: cinco Features e dez Test Cases validados; PDF regenerado em 14/11/2026.
- QA/API: sete testes de integração aprovados, cobrindo saúde, pontos acessíveis, relato válido, rejeição de PII, leitura válida, umidade inválida e filtro por bairro.
- Cybersecurity: quatro testes aprovados e demonstração de auditoria executada.

## Ações externas pendentes

- gravar e publicar os vídeos não listados;
- inserir os links dos vídeos nos READMEs;
- confirmar a turma em `iot/integrantes.txt`;
- liberar o professor como administrador no Azure DevOps.

As evidências reais do Azure, Mobile, Swagger/API e Ubuntu estão em `docs/evidencias/`. O levantamento territorial utiliza imagens públicas da Prefeitura com a origem registrada.
