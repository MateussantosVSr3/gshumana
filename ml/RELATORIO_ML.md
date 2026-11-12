# ClimaCidadão — previsão de risco térmico na próxima hora

## 1. Problema e dados reais

A CitizenTech atende pessoas expostas ao calor na Bela Vista. A pergunta de ML é: **com as condições meteorológicas atuais, é possível prever se a próxima hora terá risco térmico operacional?** O alvo vale 1 quando, na hora seguinte, temperatura é pelo menos 32 °C e umidade pelo menos 60%; essa regra é uma hipótese do protótipo, não um diagnóstico médico.

Foram selecionados dados horários públicos do INMET, estação automática São Paulo–Mirante de Santana (A701), anos 2024 e 2025. Fonte, URLs, período, tratamento e hashes estão em `dados/README.md` e no notebook. O INMET informa que dados automáticos são brutos; `9999`, `Null` e vazios foram tratados como ausentes. Horários permanecem em UTC.

## 2. Preparação e modelo

As variáveis são temperatura, umidade, pressão, vento e codificações cíclicas de hora e mês. Duplicatas e linhas incompletas são removidas. Para evitar vazamento temporal, os primeiros 80% formam treino e os 20% finais formam teste; validação cruzada `TimeSeriesSplit` ocorre somente no treino.

Foi escolhido Random Forest porque captura relações não lineares, tolera escalas distintas e oferece interpretação por permutação. Foram testadas 10 combinações de três hiperparâmetros: número de árvores, profundidade máxima e mínimo de amostras por folha. `class_weight=balanced` reduz o efeito de desbalanceamento.

## 3. Resultados

**PREENCHER APÓS EXECUTAR O NOTEBOOK:** intervalo e número de linhas; proporção positiva; melhores parâmetros; F1 de validação; tabela de accuracy, precision, recall e F1 em treino e teste; matriz de confusão; importância das variáveis.

Compare treino e teste. Gap alto indica overfitting. Para o cidadão, falsos negativos são especialmente graves porque deixam de recomendar precaução; falsos positivos podem causar fadiga de alerta. A decisão de limiar deve priorizar recall sem tornar o serviço inútil.

## 4. Conclusão e limitações

**PREENCHER COM BASE NOS RESULTADOS, sem inventar valores.** Diga objetivamente se o modelo superou um baseline majoritário e se generalizou no período final. O protótipo usa uma única estação, não incorpora sombra urbana, idade ou esforço físico e prevê uma regra operacional, não doença. Próximos passos: validação com cidadãos, outras estações, calibração probabilística e comparação com alertas oficiais.

Para uso público, a estimativa deve aparecer com horário/fonte e nunca substituir Defesa Civil, INMET ou atendimento de saúde. O benefício esperado é antecipar orientação e facilitar uma pausa segura; o indicador de impacto precisa ser medido em teste de campo.
