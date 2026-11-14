# Roteiro do vídeo — Mobile Development & IoT (até 3 minutos)

## Preparação

1. Inicie a API:

   ```powershell
   cd D:\GS\backend
   dotnet run --project ClimaCidadao.Api --urls http://0.0.0.0:5080
   ```

2. No celular físico, defina `EXPO_PUBLIC_API_URL` com o IP do computador na rede, por exemplo `http://192.168.0.10:5080`. Em emulador Android, use `http://10.0.2.2:5080`.
3. Inicie o app:

   ```powershell
   cd D:\GS\mobile
   npm install
   npx expo start
   ```

4. Crie antes uma leitura de 35 °C e 70% pelo Swagger ou pelo ESP32 para que a tela inicial mostre risco alto.

## 0:00–0:25 — Problema e solução

> O Clima Cidadão ajuda pessoas expostas ao calor no Jardim Marquesa a reconhecer o risco térmico, encontrar pontos de água ou sombra e relatar problemas sem fornecer dados pessoais. O aplicativo consome a mesma API alimentada pelo ESP32.

## 0:25–1:05 — Tela de risco

Mostre a tela inicial conectada à API.

> A tela apresenta o nível por texto e cor, a sensação térmica e uma orientação simples. O nível não depende apenas da cor e os elementos possuem rótulos de acessibilidade. Esta informação veio da leitura armazenada pela API.

Toque em “Atualizar informação”. Se possível, mostre rapidamente o endpoint `/api/v1/risk/latest` no Swagger.

## 1:05–1:35 — Pontos seguros

Abra “Encontrar água e sombra”.

> A segunda jornada consulta pontos de apoio acessíveis. Cada item informa endereço, tipo, acessibilidade e se foi verificado, evitando apresentar um local não confirmado como confiável.

## 1:35–2:10 — Relato anônimo

Abra “Relatar problema no local”. Digite uma descrição anônima com pelo menos dez caracteres e envie.

> O relato não solicita nome, telefone, diagnóstico ou endereço residencial. A tela limita a descrição a 280 caracteres, e a API rejeita padrões de dados pessoais antes da persistência.

Mostre a confirmação de envio. Não use dados pessoais reais.

## 2:10–2:40 — Cache offline

Depois de carregar os dados uma vez, desligue a API ou a conexão e volte à tela inicial.

> O aplicativo usa SQLite para guardar a última leitura e a lista de pontos. Sem conexão, ele exibe claramente que o conteúdo é salvo ou demonstrativo, em vez de fingir que o dado é atual.

Mostre o aviso amarelo de modo offline.

## 2:40–3:00 — Encerramento

> Assim, o aplicativo conecta os dados ambientais à decisão do cidadão, oferece apoio próximo, preserva privacidade e mantém informação útil em condição offline. Trata-se de um protótipo preventivo, e os alertas oficiais sempre prevalecem.

## Evidências que devem aparecer

- risco carregado da API;
- pontos seguros e estado de verificação;
- envio de relato anônimo;
- aviso offline após desligar a API;
- menção ao SQLite, acessibilidade e privacidade.

