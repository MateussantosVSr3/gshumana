# ClimaCidadão — CitizenTech para calor extremo em São Paulo

> Protótipo acadêmico integrado para a Global Solution FIAP 2026.2 — 3º ano de Engenharia de Software.

## Ficha da CitizenTech

| Campo | Definição |
|---|---|
| Nome | **ClimaCidadão** |
| Cidade e bairro | São Paulo/SP — Bela Vista e entorno da Av. Paulista |
| Cidadão beneficiado | Idosos, entregadores, ambulantes e demais pessoas expostas ao calor durante deslocamentos e trabalho na rua |
| Problema, em uma frase | Pessoas vulneráveis ao calor não recebem orientação local e simples, no momento certo, sobre risco térmico, hidratação e locais seguros próximos. |
| Como funciona | Dados meteorológicos públicos e sensores comunitários alimentam uma API; um modelo estima o risco térmico; o app apresenta alertas acessíveis e pontos de hidratação/sombra, e permite registrar ocorrências sem dados pessoais. |
| O que cada parte faz | API .NET persiste leituras, locais e alertas; ML classifica risco; app Expo atende o cidadão; ESP32 mede temperatura/umidade; Linux provisiona e monitora a API; segurança reduz exposição de PII; QA documenta requisitos e testes. |
| Repositório | https://github.com/MateussantosVSr3/gshumana |
| Indicador de impacto | Percentual de usuários que encontram um ponto seguro em até 10 minutos e quantidade de alertas preventivos entregues por semana |
| ODS conectados | ODS 3 (saúde e bem-estar), ODS 10 (redução das desigualdades), ODS 11 (cidades sustentáveis) e ODS 13 (ação climática) |

## Hipótese e recorte do MVP

Se pessoas expostas ao calor receberem um nível de risco compreensível e acharem rapidamente água/sombra perto de sua rota, então poderão reduzir a exposição evitável. O MVP não diagnostica doenças nem substitui a Defesa Civil ou orientação médica. Ele entrega apenas: risco atual, recomendações preventivas, mapa/lista de pontos seguros e registro anônimo de ocorrência.

## Arquitetura

```text
INMET (dados públicos) ──> ML/notebook ──> classificação de risco
ESP32/DHT22 ─────────────> API .NET ─────> SQLite
                                             │
                                             ├──> App Expo/React Native
                                             └──> painel/monitoramento Linux
```

## Estrutura das entregas

- `backend/`: entrega conjunta de SOA/Web Services e C# — API REST, EF Core/SQLite, LINQ, async, Swagger, migração e testes.
- `ml/`: notebook, documentação dos dados reais, relatório e roteiro do vídeo.
- `mobile/`: app Expo Router/TypeScript, consumo da API, persistência local e acessibilidade.
- `iot/`: circuito ESP32 no Wokwi e código para sensor DHT22, LED e buzzer.
- `infra/`: provisionamento Linux, serviço `systemd`, monitoramento, logs e teste de falha.
- `cybersecurity/`: regras de PII, análise de fluxo contaminado (*taint*) e cálculo do indicador Risco Cidadão.
- `qa/`: Features e Test Cases prontos para cadastrar/importar no Azure Boards, além do documento de contingência.
- `docs/`: pesquisa, privacidade, roteiros e checklist final.

## Execução rápida

### API (requer .NET 8 SDK)

```bash
cd backend/ClimaCidadao.Api
dotnet restore
dotnet ef database update
dotnet run
```

Swagger: `http://localhost:5080/swagger`. Para testes: `dotnet test backend/ClimaCidadao.sln`.

### App (requer Node 20+)

```bash
cd mobile
npm install
npx expo start
```

Defina `EXPO_PUBLIC_API_URL=http://SEU_IP:5080` para usar a API; sem ela, o app apresenta dados de demonstração identificados como tais.

### ML

Baixe os CSVs anuais oficiais conforme `ml/dados/README.md`, instale `ml/requirements.txt` e execute todas as células de `ml/clima_cidadao.ipynb`. Dados simulados não são usados no treinamento.

## Integrantes

- Mateus Santos da Silva — RM 558436
- Nickolas Moreno Cardoso — RM 557132
- André Giovane de Maria — RM 556384

## Limites éticos e de segurança

- Não coletar nome, CPF, e-mail, telefone ou localização precisa persistente.
- Localização usada pelo app fica no aparelho; a API recebe apenas bairro ou coordenadas arredondadas.
- Recomendações são preventivas, não médicas.
- Dados automáticos do INMET podem conter lacunas; o pipeline remove `9999`, `Null` e vazios e registra o período utilizado.
- Alertas oficiais sempre prevalecem sobre a estimativa experimental do protótipo.

## Fontes principais

- INMET — Dados Históricos Anuais: https://portal.inmet.gov.br/dadoshistoricos
- INMET — orientações e limitações dos dados: https://portal.inmet.gov.br/noticias/saiba-como-acessar-os-dados-meteorol%C3%B3gicos-dispon%C3%ADveis-no-site-do-inmet
- ONU — Objetivos de Desenvolvimento Sustentável: https://brasil.un.org/pt-br/sdgs

## O que ainda exige ação da equipe

Consulte `CHECKLIST_ENTREGA.md`. Os marcadores **PREENCHER** não são falhas técnicas: são informações/evidências pessoais que precisam ser produzidas pela própria equipe.
