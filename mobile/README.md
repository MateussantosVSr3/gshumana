# Mobile Development & IoT

App Expo Router/TypeScript com jornada principal, API/mock identificado, banco SQLite local para cache offline e acessibilidade (contraste, texto legível, rótulos e áreas de toque).

## Ficha da CitizenTech

| Campo | Definição |
|---|---|
| Nome | **Clima Cidadão** |
| Cidade e bairro | São Paulo/SP — Jardim Marquesa, Zona Sul |
| Cidadão beneficiado | Idosos, entregadores, ambulantes e demais pessoas expostas ao calor durante deslocamentos e trabalho na rua |
| Problema | Pessoas vulneráveis ao calor não recebem orientação local e simples, no momento certo, sobre risco térmico, hidratação e locais seguros próximos. |
| Como funciona | Sensores e dados meteorológicos alimentam uma API; o aplicativo apresenta o risco térmico, orientações preventivas e pontos de água ou sombra, além de permitir relatos anônimos. |
| Função do Mobile | Oferecer ao cidadão uma interface acessível para consultar o risco, encontrar apoio próximo e registrar ocorrências sem dados pessoais. |
| Indicador de impacto | Percentual de usuários que encontram um ponto seguro em até 10 minutos e quantidade de alertas preventivos entregues por semana |
| ODS conectados | ODS 3, ODS 10, ODS 11 e ODS 13 |

## Como executar

Requisitos: Node.js 20 ou superior e Expo Go no celular ou um emulador Android.

```powershell
cd D:\GS\mobile
npm install
$env:EXPO_PUBLIC_API_URL="http://IP_DO_COMPUTADOR:5080"
npm start
```

No emulador Android, use `http://10.0.2.2:5080`. Em um celular físico, use o IP do computador na mesma rede Wi-Fi. Sem uma API disponível, o aplicativo apresenta dados demonstrativos identificados como tais.

Principais jornadas:

- consultar o risco térmico atual e atualizar a leitura;
- encontrar pontos de água ou sombra;
- enviar um relato anônimo;
- utilizar a última leitura salva quando a conexão estiver indisponível.

## Validação local

```powershell
npm install
npm run typecheck
npx expo-doctor
npx expo export --platform android
```

O projeto foi validado com TypeScript, 18 verificações do Expo Doctor e geração do bundle Android. O SDK 53 mantém avisos de auditoria em dependências transitivas do toolchain; não use `npm audit fix --force`, pois ele tenta migrar partes do projeto para o Expo 58.

## Evidências visuais

- [Risco térmico consumido da API](../docs/evidencias/mobile-risco.png)
- [Ponto de apoio do Jardim Marquesa](../docs/evidencias/mobile-pontos.png)
- [Formulário de relato anônimo](../docs/evidencias/mobile-relatar.png)

## Vídeo de demonstração

Vídeo publicado como não listado: [demonstração do aplicativo Mobile](https://youtu.be/07oWBHGRnBg).
