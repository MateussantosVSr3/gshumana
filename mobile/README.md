# Mobile Development & IoT

App Expo Router/TypeScript com jornada principal, API/mock identificado, banco SQLite local para cache offline e acessibilidade (contraste, texto legível, rótulos e áreas de toque). Consulte o README da raiz para executar.

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
