# Dados reais — INMET

Fonte primária: Instituto Nacional de Meteorologia, Dados Históricos Anuais.

- Página oficial: https://portal.inmet.gov.br/dadoshistoricos
- 2024: https://portal.inmet.gov.br/uploads/dadoshistoricos/2024.zip
- 2025: https://portal.inmet.gov.br/uploads/dadoshistoricos/2025.zip
- Estação usada: **São Paulo — Mirante de Santana (A701)**.
- Período carregado: 01/01/2024 a 31/12/2025.
- Granularidade: horária; horários do INMET estão em UTC.

## Preparação

1. Execute `python ../baixar_dados.py` nesta pasta, ou use `ml/executar.ps1` para automatizar todo o processo.
2. O script baixa os dois ZIPs oficiais e extrai somente os CSVs da estação A701 para esta pasta.
3. Não edite os CSVs brutos. O notebook localiza A701, normaliza vírgula decimal e trata `9999`, `Null` e vazios como ausentes.
4. Execute o notebook do início ao fim e confirme quantidade, intervalo e hashes exibidos.

Os dados das estações automáticas são brutos e podem conter falhas; segundo o INMET, seu uso é responsabilidade do usuário. Download realizado em **14/11/2026**.

## Integridade dos arquivos extraídos

| Ano | SHA-256 do CSV A701 |
|---|---|
| 2024 | `C5F365C069258734BA108F4E85E71DDB00A8A9D4C936B4A7EC76AFD9C00FD276` |
| 2025 | `1EAC048271DD0339613149E4638B293F5B627C847980A2B0853C725217E0A314` |

Os hashes dos ZIPs oficiais registrados no download foram `0a7f89de57427f79b6f82943b2f7f2e932202d9253e34bf25629ed088d108ae7` (2024) e `14988d0b736ba969b48881589f602f3a6d7e97b95bd1de934456851fdac2cb89` (2025).
