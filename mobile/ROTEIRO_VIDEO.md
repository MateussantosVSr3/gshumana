# Roteiro do vídeo — Mobile Development & IoT (até 3 minutos)

**Limite:** no máximo 3 minutos. **Duração recomendada:** entre 2min40s e 2min55s.

Este roteiro já está escrito para ser lido durante a gravação. Os textos entre aspas são as falas; as instruções fora das aspas indicam o que deve aparecer na tela.

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
   $env:EXPO_PUBLIC_API_URL="http://IP_DO_COMPUTADOR:5080"
   npx expo start --lan --clear
   ```

   Escaneie o QR Code com o Expo Go. O celular e o computador precisam estar na mesma rede Wi-Fi.

4. Crie antes uma leitura de 35 °C e 70% pelo Swagger ou pelo ESP32 para que a tela inicial mostre risco alto.

## Sequência exata das telas na gravação

1. **Tela inicial — “Como está o calor agora?”**
   - mostre `Jardim Marquesa`, o selo `AO VIVO`, o risco `Alto`, a sensação térmica e a orientação;
   - toque em `Atualizar informação`;
   - destaque que a leitura veio da API alimentada pelo ESP32.
2. **Tela “Pontos seguros”**
   - toque em `Encontrar água e sombra`;
   - mostre nome, endereço, acessibilidade e estado de validação do ponto;
   - volte para a tela inicial.
3. **Tela “Novo relato”**
   - toque em `Relatar problema no local`;
   - digite `Ponto sem sombra no período da tarde`;
   - mostre o contador, o aviso de privacidade e envie o relato;
   - mostre a confirmação de envio e volte para a tela inicial.
4. **Tela inicial em modo offline**
   - somente depois das três jornadas, desligue a API no computador;
   - toque em `Atualizar informação`;
   - mostre o aviso de conexão instável e explique o cache SQLite;
   - religue a API após a demonstração.

Não é necessário abrir código durante o vídeo. Se o tempo permitir, mostre o Swagger por poucos segundos apenas para comprovar a mesma leitura consumida pelo aplicativo.

## 0:00–0:25 — Problema e solução

Deixe a tela inicial aberta, mostrando `Jardim Marquesa` e o selo `AO VIVO`.

> “Este é o Clima Cidadão, uma solução criada para apoiar moradores do Jardim Marquesa em períodos de calor intenso. Pelo aplicativo, a pessoa consegue consultar o risco térmico, encontrar pontos de água ou sombra e relatar problemas no bairro. Nesta versão piloto, o território é previamente configurado e nenhuma localização precisa do usuário é coletada.”

## 0:25–1:05 — Tela de risco

Mostre a tela inicial conectada à API.

> “Na tela inicial, o aplicativo apresenta o risco por texto e por cor, a sensação térmica calculada e uma orientação preventiva. Aqui temos o nível alto, com sensação térmica de aproximadamente cinquenta graus. Como o nível também aparece escrito, a informação não depende somente da percepção das cores. Os principais elementos ainda possuem rótulos de acessibilidade.”

Toque em `Atualizar informação`. Em seguida, abra o Swagger, expanda `GET /api/v1/risk/latest`, clique em `Try it out` e depois em `Execute`. Mostre `level: High` e `heatIndexC: 50.3` por poucos segundos.

> “Ao atualizar, o aplicativo consulta o endpoint de risco mais recente. No Swagger podemos confirmar a mesma resposta recebida pelo app. Essa leitura foi armazenada pela API e pode ser alimentada pelo circuito com ESP32.”

## 1:05–1:35 — Pontos seguros

Abra “Encontrar água e sombra”.

> “Na segunda jornada, o usuário encontra pontos de apoio próximos. Cada item informa nome, endereço, tipo de apoio, acessibilidade e estado de verificação. O ponto da Rua Candelária ainda aguarda validação da comunidade, e isso é mostrado claramente para não apresentar uma informação não confirmada como totalmente confiável.”

## 1:35–2:10 — Relato anônimo

Abra “Relatar problema no local”. Digite uma descrição anônima com pelo menos dez caracteres e envie.

> “O morador também pode colaborar enviando um relato anônimo. Vou informar que existe um ponto sem sombra no período da tarde. A tela não solicita nome, telefone, condição médica ou endereço residencial, limita o texto a duzentos e oitenta caracteres e orienta o usuário a não inserir dados pessoais. A API também valida o conteúdo antes de armazená-lo.”

Mostre a confirmação de envio. Não use dados pessoais reais.

## 2:10–2:40 — Cache offline

Depois de carregar os dados uma vez, desligue a API ou a conexão e volte à tela inicial.

> “Para situações de conexão instável, o aplicativo utiliza SQLite para guardar a última leitura e a lista de pontos consultados. Quando a API fica indisponível, a tela informa que está exibindo conteúdo salvo ou demonstrativo, em vez de tratar um dado antigo como se fosse atual.”

Mostre o aviso amarelo de modo offline.

## 2:40–3:00 — Encerramento

Volte à tela inicial para encerrar.

> “Assim, o Clima Cidadão integra o circuito com ESP32, a API e o aplicativo mobile para transformar dados ambientais em orientações úteis. A solução oferece apoio próximo, preserva a privacidade e mantém informações disponíveis mesmo com conexão instável. Este é um protótipo preventivo, e os alertas oficiais sempre prevalecem.”

## Evidências que devem aparecer

- risco carregado da API;
- pontos seguros e estado de verificação;
- envio de relato anônimo;
- aviso offline após desligar a API;
- menção ao SQLite, acessibilidade e privacidade.

