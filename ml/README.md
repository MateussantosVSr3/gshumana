# Inteligência Artificial & Machine Learning

Esta pasta contém o notebook executado `clima_cidadao.ipynb`, o relatório `RELATORIO_ML.md`, a documentação dos dados reais do INMET, as dependências e o script de reprodução do treinamento.

O modelo Random Forest foi avaliado com divisão temporal entre treino e teste, dez combinações de três hiperparâmetros e validação cruzada somente no conjunto de treino. O F1 final no teste foi 0,796.

## Entregáveis

- notebook executado: [`clima_cidadao.ipynb`](clima_cidadao.ipynb);
- relatório: [`RELATORIO_ML.md`](RELATORIO_ML.md);
- dados e rastreabilidade: [`dados/README.md`](dados/README.md);
- dependências: [`requirements.txt`](requirements.txt);
- vídeo não listado: [demonstração de Machine Learning](https://youtu.be/3gwv8aBBhXk).

## Reprodução

Na raiz do repositório, execute:

```powershell
powershell -ExecutionPolicy Bypass -File ml\executar.ps1
```

O treinamento utiliza dados oficiais do INMET de 2024 e 2025; dados simulados não são usados.
