# Roteiro do vídeo — Machine Learning (até 5 minutos)

## Preparação

Abra `clima_cidadao.ipynb` já executado e `RELATORIO_ML.md`. Deixe visíveis a fonte dos dados, a distribuição do alvo, a busca de hiperparâmetros, a tabela de métricas, a matriz de confusão e a importância das variáveis.

## 0:00–0:35 — Problema

> O módulo de Machine Learning do Clima Cidadão tenta prever se a próxima hora terá calor elevado na região do Jardim Marquesa. Essa previsão pode antecipar recomendações de pausa, água e redução de exposição. É uma regra operacional experimental, não um diagnóstico médico.

## 0:35–1:15 — Dados reais

> Utilizamos dados horários públicos do INMET da estação automática São Paulo–Mirante de Santana, código A701, nos anos de 2024 e 2025. Os dois CSVs foram baixados diretamente dos arquivos históricos oficiais e tiveram seus hashes registrados para garantir rastreabilidade.

Mostre os dois arquivos, o período e os hashes no notebook.

> Após remover duplicatas, valores ausentes e registros inválidos, permaneceram 17.477 observações entre janeiro de 2024 e dezembro de 2025.

## 1:15–2:00 — Alvo e preparação

> O alvo vale um quando a temperatura da próxima hora alcança pelo menos 30 graus Celsius. A regra inicial combinava 32 graus e 60 por cento de umidade, mas a análise mostrou que ela não produzia casos positivos nesse período. Por isso, adotamos um limiar de calor elevado que permite avaliação estatística sem criar dados artificiais.

> As variáveis são temperatura, umidade, pressão, vento e codificações cíclicas de hora e mês. Os primeiros 80 por cento dos dados formam o treino e os 20 por cento finais formam o teste, preservando a ordem temporal e evitando vazamento do futuro.

Mostre que a classe positiva representa 4,55% das observações.

## 2:00–2:50 — Modelo e busca

> Escolhemos Random Forest por capturar relações não lineares e permitir interpretação. Foram testadas dez combinações de três hiperparâmetros: número de árvores, profundidade máxima e mínimo de amostras por folha. A validação usa três blocos expansivos de TimeSeriesSplit somente dentro do treino.

> A melhor configuração utilizou 100 árvores, profundidade máxima 12 e mínimo de duas amostras por folha. O F1 médio de validação temporal foi 0,699.

Mostre a tabela das dez combinações.

## 2:50–4:05 — Resultados

> No treino, o modelo obteve accuracy de 0,986, precision de 0,759, recall de 1 e F1 de 0,863. No teste final, obteve accuracy de 0,978, precision de 0,705, recall de 0,914 e F1 de 0,796.

Mostre a tabela e a matriz de confusão.

> Entre 162 casos positivos no teste, 148 foram reconhecidos e 14 foram perdidos. Também ocorreram 62 falsos positivos. O recall alto é importante porque um alerta perdido pode deixar de orientar uma pessoa exposta ao calor.

> O gap de F1 entre treino e teste foi 0,067, sem sinal de overfitting grave. Temperatura e umidade foram as variáveis mais importantes na análise por permutação.

## 4:05–4:45 — Baseline e limitações

> Prever sempre a classe normal teria aproximadamente 95,4 por cento de accuracy, mas F1 zero para calor elevado. O modelo superou esse baseline porque reconhece a classe de interesse. Mesmo assim, ele usa apenas uma estação e não considera sombra urbana, idade, esforço físico ou outras condições individuais.

> Os próximos passos são validar com cidadãos, incluir outras estações e comparar o resultado com alertas oficiais.

## 4:45–5:00 — Encerramento

> O modelo mostra que dados meteorológicos reais podem apoiar uma orientação antecipada, mas sua estimativa deve sempre apresentar fonte e horário e nunca substituir o INMET, a Defesa Civil ou atendimento de saúde.
