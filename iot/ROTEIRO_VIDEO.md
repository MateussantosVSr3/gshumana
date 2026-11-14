# Roteiro do vídeo — Physical Computing (até 4 minutos)

## Preparação antes de gravar

1. Inicie a API na porta usada pelo ESP32:

   ```powershell
   cd D:\GS\backend
   dotnet run --project ClimaCidadao.Api --urls http://localhost:5080
   ```

2. Confirme que o Swagger abre em `http://localhost:5080/swagger`.
3. No VS Code, abra `D:\GS\iot`, execute `pio run` e inicie o Wokwi Simulator. O arquivo `wokwi.toml` encaminha a porta 5080 para a API local.
4. Deixe preparados para a gravação:
   - circuito no Wokwi;
   - monitor serial;
   - Swagger na operação `GET /api/v1/readings`;
   - DHT22 com valores que possam ser alterados durante a simulação.

> O projeto público comprova o circuito no Wokwi, mas a demonstração integrada com a API local deve ser executada pelo Wokwi Simulator no VS Code.

## 0:00–0:35 — Apresentação da solução

**Fala sugerida:**

> Olá, somos o grupo responsável pelo Clima Cidadão. Nossa solução ajuda a identificar condições de calor e umidade que possam representar risco para os moradores do bairro. O projeto reúne um aplicativo, uma API e um circuito físico com ESP32.

Mostre rapidamente o nome do projeto e a visão geral do circuito.

## 0:35–1:10 — Como o ESP32 faz parte do projeto

**Fala sugerida:**

> O circuito é a camada de coleta e alerta local da solução. O sensor DHT22 mede a temperatura e a umidade, e o ESP32 envia essas leituras para a API do Clima Cidadão a cada dez segundos. A API armazena os dados, calcula o risco mais recente e disponibiliza as informações para o restante do sistema. Em uma situação de risco, o próprio circuito também aciona o LED e o buzzer, sem depender da disponibilidade da API.

Mostre este fluxo:

```text
DHT22 → ESP32 → POST /api/v1/readings → API/SQLite → aplicativo
          └──→ LED e buzzer para alerta local
```

## 1:10–1:50 — Componentes e código

**Fala sugerida:**

> No Wokwi temos um ESP32, o DHT22 no pino 15, o LED no pino 18 e o buzzer no pino 19. O sistema considera risco alto quando a temperatura atinge 35 graus ou quando há pelo menos 32 graus com umidade igual ou superior a 60 por cento.

Mostre brevemente no `sketch.ino`:

- a leitura do DHT22;
- a condição `danger`;
- a URL `/api/v1/readings`;
- a criação do JSON e o `http.POST(json)`.

**Fala sugerida:**

> A leitura é enviada em JSON com temperatura, umidade, identificação do sensor e bairro. Quando a API aceita o registro, ela retorna HTTP 201, indicando que a leitura foi criada.

## 1:50–3:20 — Demonstração integrada

1. Inicie a simulação e mostre o autoteste do LED e do buzzer.
2. No monitor serial, mostre temperatura, umidade e o estado de risco.
3. Aguarde aparecer `API HTTP: 201`.
4. No Swagger, execute `GET /api/v1/readings`, usando `Bela Vista` como bairro e um limite pequeno.
5. Mostre que o registro contém `source: wokwi-esp32-01` e os mesmos valores exibidos no Wokwi.

**Fala sugerida:**

> Aqui o monitor serial mostra a leitura do sensor. A mensagem HTTP 201 confirma que o ESP32 enviou o dado para a API. Agora, no Swagger, consultamos as leituras armazenadas e encontramos o registro com a origem `wokwi-esp32-01`, comprovando a comunicação entre o circuito e o projeto.

6. No DHT22, coloque primeiro uma condição normal, por exemplo 28 °C e 50%.
7. Depois altere para 35 °C e 70% e mostre o LED e o buzzer ativados.

**Fala sugerida:**

> Em uma condição normal, os atuadores permanecem desligados. Ao aumentar a temperatura e a umidade, o ESP32 identifica risco alto, acende o LED e ativa o buzzer. A nova leitura também é enviada para a API.

## 3:20–3:55 — Encerramento

**Fala sugerida:**

> Assim, o circuito não funciona de forma isolada: ele coleta dados reais, envia as leituras para a API e gera um alerta físico imediato. A API registra as informações e permite que o aplicativo consulte o risco do bairro. Esse protótipo pode futuramente ser instalado em diferentes pontos da comunidade para ampliar o monitoramento climático.

Finalize mostrando o circuito funcionando e o registro correspondente no Swagger.

## Evidências que precisam aparecer

- circuito completo no Wokwi;
- leitura do DHT22 no monitor serial;
- LED e buzzer reagindo à condição de risco;
- retorno `API HTTP: 201`;
- registro do sensor no `GET /api/v1/readings` do Swagger;
- explicação de que a API conecta o ESP32 ao restante da solução.

