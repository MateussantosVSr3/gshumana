# Dados reais — INMET

Fonte primária: Instituto Nacional de Meteorologia, Dados Históricos Anuais.

- Página oficial: https://portal.inmet.gov.br/dadoshistoricos
- 2024: https://portal.inmet.gov.br/uploads/dadoshistoricos/2024.zip
- 2025: https://portal.inmet.gov.br/uploads/dadoshistoricos/2025.zip
- Estação usada: **São Paulo — Mirante de Santana (A701)**.
- Período proposto: 01/01/2024 a 31/12/2025 (confirmar após carga).
- Granularidade: horária; horários do INMET estão em UTC.

## Preparação

1. Execute `python ../baixar_dados.py` nesta pasta, ou use `ml/executar.ps1` para automatizar todo o processo.
2. O script baixa os dois ZIPs oficiais e extrai somente os CSVs da estação A701 para esta pasta.
3. Não edite os CSVs brutos. O notebook localiza A701, normaliza vírgula decimal e trata `9999`, `Null` e vazios como ausentes.
4. Execute o notebook do início ao fim e confirme quantidade, intervalo e hashes exibidos.

Os dados das estações automáticas são brutos e podem conter falhas; segundo o INMET, seu uso é responsabilidade do usuário. Registre a data de download: **PREENCHER**.
