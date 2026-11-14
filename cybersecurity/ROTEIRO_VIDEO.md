# Roteiro do vídeo — Cybersecurity

## Preparação

Execute:

```powershell
cd D:\GS\cybersecurity
npm test
npm run audit
```

Deixe também aberto `dashboard.html` nos estados de risco baixo e crítico. Use somente dados fictícios.

## 0:00–0:30 — Contexto

> O módulo de Cybersecurity protege os relatos anônimos do Clima Cidadão. O objetivo é impedir que dados pessoais sejam persistidos ou enviados a destinos sensíveis e apresentar um indicador de risco de zero a cem.

## 0:30–1:20 — Detecção de PII

Mostre `src/pii-guard.js`.

> O guard identifica padrões de CPF, e-mail, telefone e CEP. A solução trabalha com minimização de dados: o aplicativo não solicita identificação, e o backend rejeita um relato contaminado antes da persistência.

Execute ou mostre os testes de detecção e aceitação de texto anônimo.

## 1:20–2:10 — Taint analysis

Mostre `src/taint-analysis.js` e a saída de `npm run audit`.

> A descrição recebida é tratada como uma fonte não confiável. Se chegar ao destino de auditoria sem sanitização, o fluxo é bloqueado. Depois da redação de PII, o evento pode prosseguir e registra o sanitizador utilizado.

Mostre na saída um evento bloqueado e outro aceito com `pii-redaction`.

## 2:10–2:50 — Indicador Risco Cidadão

Abra o painel.

> O indicador combina exposição, presença de PII e tentativa de alcançar um destino sensível. O painel comunica nível, pontuação e fatores encontrados. Aqui vemos os estados de baixo risco e risco crítico, sem utilizar informações reais.

## 2:50–3:15 — Validação e encerramento

> Os quatro testes automatizados foram aprovados. Dessa forma, o módulo detecta dados pessoais, bloqueia fluxo contaminado, permite somente conteúdo sanitizado e oferece uma medida transparente de risco. Em produção, também seriam necessários autenticação, gestão de chaves e monitoramento contínuo.

## Evidências

- quatro testes aprovados;
- evento contaminado bloqueado;
- evento sanitizado aceito;
- painel em risco baixo e crítico;
- explicação de fonte, sanitizador e destino.

