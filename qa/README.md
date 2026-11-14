# Testing, Compliance & QA

As cinco Features (IDs 13–17) e os dez Test Cases (IDs 18–27) estão cadastrados e relacionados no projeto [gstemperatura](https://dev.azure.com/RM558436/gstemperatura). `features.md` e `test_cases.csv` mantêm as versões detalhadas. Os testes cobrem caixa-preta, positivos e negativos, objetivo, preparo, entrada, passos e saída. Ainda é necessário adicionar o professor como Admin e inserir os prints reais no relatório final.

Depois, substitua os marcadores de prints em `RELATORIO_QA_FINAL.html` pelas evidências reais e gere o PDF com `generate-pdf.ps1`.

## Validação local da API

Com a API executando em `http://127.0.0.1:5080`:

```powershell
powershell -ExecutionPolicy Bypass -File .\qa\run-api-tests.ps1
```

O script valida saúde, pontos acessíveis, relato válido, rejeição de PII, leitura válida, umidade inválida e filtro por bairro. Ele complementa, mas não substitui, o cadastro e as evidências reais no Azure Boards.
