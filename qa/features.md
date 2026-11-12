# Features e critérios de aceite

## F01 — Consultar risco térmico

Como pessoa exposta ao calor, quero ver o risco atual em linguagem simples para decidir se devo reduzir minha exposição.

- Dado que exista leitura válida, quando abrir o início, então vejo nível, sensação térmica, horário e orientação.
- Se a API falhar, o app identifica claramente dado salvo ou demonstração; nunca apresenta como atual.
- Nível não depende somente de cor e é legível por leitor de tela.

## F02 — Encontrar ponto seguro

Como cidadão, quero consultar água/sombra acessível para fazer uma pausa perto de mim.

- Lista mostra nome, endereço, tipo, acessibilidade e estado de verificação.
- Um ponto não verificado é explicitamente rotulado.
- A consulta funciona com a última lista salva quando offline (incremento futuro documentado).

## F03 — Relatar problema anonimamente

Como usuário, quero avisar que um ponto está fechado ou sem estrutura sem criar conta.

- Aceita categoria, bairro e descrição de 10 a 280 caracteres.
- Não solicita nome, contato, diagnóstico ou localização residencial.
- Bloqueia/mascara padrões de PII antes de persistência de auditoria.

## F04 — Ingerir leitura do sensor

Como operador, quero receber temperatura/umidade do ESP32 para atualizar o risco local.

- API aceita temperatura de -10 a 60 °C e umidade de 0 a 100%.
- Dados fora do intervalo retornam HTTP 400 e não são persistidos.
- Leitura válida retorna HTTP 201 e pode ser consultada por bairro.

## F05 — Manter o serviço disponível

Como equipe, quero monitorar e reiniciar a API após falha para manter a informação acessível.

- Serviço inicia no boot e reinicia após processo encerrar inesperadamente.
- CPU, memória, disco e saúde da API são registrados a cada 30 s.
- Limite excedido ou API indisponível gera alerta no journal.
