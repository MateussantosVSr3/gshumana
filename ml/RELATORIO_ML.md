# ClimaCidadão — previsão de risco térmico na próxima hora

## 1. Problema e dados reais

A CitizenTech atende pessoas expostas ao calor no Jardim Marquesa. A pergunta de ML é: **com as condições meteorológicas atuais, é possível prever se a próxima hora terá calor elevado?** O alvo vale 1 quando, na hora seguinte, a temperatura alcança pelo menos 30 °C. Esse limiar operacional foi adotado após a análise dos dados: a regra inicial de 32 °C com 60% de umidade não produziu nenhum caso positivo em 2024–2025, o que impediria uma avaliação válida. A previsão não é um diagnóstico médico nem substitui alertas oficiais.

Foram selecionados dados horários públicos do INMET, estação automática São Paulo–Mirante de Santana (A701), anos 2024 e 2025. Fonte, URLs, período, tratamento e hashes estão em `dados/README.md` e no notebook. O INMET informa que dados automáticos são brutos; `9999`, `Null` e vazios foram tratados como ausentes. Horários permanecem em UTC.

## 2. Preparação e modelo

As variáveis são temperatura, umidade, pressão, vento e codificações cíclicas de hora e mês. Duplicatas e linhas incompletas são removidas. Para evitar vazamento temporal, os primeiros 80% formam treino e os 20% finais formam teste; validação cruzada `TimeSeriesSplit` ocorre somente no treino.

Foi escolhido Random Forest porque captura relações não lineares, tolera escalas distintas e oferece interpretação por permutação. Foram testadas 10 combinações de três hiperparâmetros: número de árvores, profundidade máxima e mínimo de amostras por folha. `class_weight=balanced` reduz o efeito de desbalanceamento. A validação usa três blocos expansivos de `TimeSeriesSplit`, preservando a ordem temporal e mantendo casos positivos nos blocos de validação.

## 3. Resultados

O processamento resultou em **17.477 observações horárias válidas**, de 01/01/2024 00:00 UTC a 31/12/2025 22:00 UTC. A classe positiva representa **4,55%** das observações. Os primeiros 13.981 registros foram usados no treino e os 3.496 finais no teste.

Foram avaliadas 10 combinações. A melhor configuração foi `n_estimators=100`, `max_depth=12` e `min_samples_leaf=2`, com **F1 médio de validação temporal de 0,699**.

| Conjunto | Accuracy | Precision | Recall | F1 |
|---|---:|---:|---:|---:|
| Treino | 0,986 | 0,759 | 1,000 | 0,863 |
| Teste | 0,978 | 0,705 | 0,914 | 0,796 |

No teste havia 162 casos positivos. O modelo reconheceu 148 e perdeu 14, com 62 falsos positivos e 3.272 verdadeiros negativos. A matriz de confusão está gravada no notebook executado. Na importância por permutação, temperatura (queda média de F1 de 0,701) e umidade (0,502) foram as variáveis mais relevantes, seguidas pelas codificações cíclicas da hora.

O gap de F1 entre treino e teste foi **0,067**, indicando perda moderada e sem sinal de overfitting grave. Para o cidadão, falsos negativos são especialmente graves porque deixam de recomendar precaução; falsos positivos podem causar fadiga de alerta. O recall de 0,914 é coerente com a prioridade de evitar alertas perdidos, embora a precisão de 0,705 mostre que ainda existe espaço para reduzir alarmes desnecessários.

## 4. Conclusão e limitações

O modelo superou o baseline majoritário: no teste, prever sempre a classe normal teria aproximadamente 95,4% de accuracy, mas F1 igual a zero para calor elevado; o Random Forest alcançou 97,8% de accuracy e F1 de 0,796. A diferença moderada entre treino e teste sugere generalização aceitável para o período final, mas não garante desempenho em outros anos ou bairros.

O protótipo usa uma única estação, não incorpora sombra urbana, idade ou esforço físico e prevê uma regra operacional, não doença. Próximos passos: validação com cidadãos, outras estações, calibração probabilística e comparação com alertas oficiais.

Para uso público, a estimativa deve aparecer com horário/fonte e nunca substituir Defesa Civil, INMET ou atendimento de saúde. O benefício esperado é antecipar orientação e facilitar uma pausa segura; o indicador de impacto precisa ser medido em teste de campo.
