# Evidências técnicas locais

Em 11/11/2026, `node --test` executou quatro testes: detecção/remoção de PII, bloqueio de fluxo contaminado, liberação após sanitização e aumento do indicador com exposição. Resultado: **4 aprovados, 0 falhas**.

Para a entrega, execute novamente e capture a tela do próprio computador; depois demonstre `npm run audit` e `dashboard.html`. Isso garante que a evidência corresponda ao ZIP enviado.

Capturas geradas localmente:

- `docs/evidencias/cyber-dashboard.png` — risco baixo.
- `docs/evidencias/cyber-dashboard-risco-critico.png` — risco crítico 100/100 com registro de auditoria.
