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

## Roteiro do vídeo (até 3 min)

Use [`ROTEIRO_VIDEO.md`](ROTEIRO_VIDEO.md) para demonstrar API, três telas, SQLite offline, acessibilidade e privacidade.

As três telas foram executadas e registradas. Falta inserir aqui o link do vídeo não listado.
