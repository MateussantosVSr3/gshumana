# Backend — SOA/Web Services e C#

A mesma API atende às duas disciplinas: domínio explícito, DI, EF Core/SQLite, consultas LINQ, operações assíncronas, REST, Swagger, migração e testes xUnit.

## Integrantes

- Turma: 3ESR
- Mateus dos Santos da Silva — RM 558436
- Nickolas Moreno Cardoso — RM 557132
- André Giovane de Maria — RM 556384

## Descrição da solução

O backend do Clima Cidadão recebe leituras ambientais do ESP32, persiste os dados em SQLite, calcula o risco térmico mais recente, disponibiliza pontos de água ou sombra e recebe relatos anônimos protegidos contra dados pessoais. A API integra o circuito IoT e o aplicativo Mobile da CitizenTech.

## Endpoints

| Método | Rota | Uso |
|---|---|---|
| GET | `/health` | saúde do serviço |
| POST/GET | `/api/v1/readings` | inserir/listar leituras |
| GET | `/api/v1/risk/latest` | calcular risco da leitura mais recente |
| GET | `/api/v1/safe-points` | listar pontos de apoio |
| POST | `/api/v1/reports` | relato anônimo |

Use Swagger como documentação automática e evidência. Relatos com padrões de CPF, e-mail, telefone ou CEP são rejeitados antes da persistência. Não há autenticação no protótipo local; em produção, escrita de sensores exigiria chave rotacionável e painel administrativo usaria OIDC.

`ClimaCidadao.Api/ClimaCidadao.Api.http` contém chamadas reproduzíveis para todos os fluxos principais e um teste negativo de PII. `openapi.yaml` permite visualizar o contrato sem iniciar o projeto; em execução, o Swagger é gerado automaticamente pelo código.

## Execução e validação

```powershell
cd D:\GS\backend
dotnet restore ClimaCidadao.sln
dotnet test ClimaCidadao.sln
dotnet run --project ClimaCidadao.Api --urls http://localhost:5080
```

O banco SQLite é criado e migrado automaticamente na inicialização. Em 14/11/2026, a solução compilou, os quatro testes xUnit passaram e foram validados: migração, criação/listagem de leitura, cálculo de risco, pontos seguros e Swagger. O enum de risco é serializado como `Low`, `Moderate`, `High` ou `Extreme`, conforme o contrato do aplicativo.

## Evidências visuais

- [Swagger com todos os endpoints](../docs/evidencias/api-swagger.png)
- [Health check da API](../docs/evidencias/api-health.png)
- [Leituras filtradas pelo Jardim Marquesa](../docs/evidencias/api-readings.png)

## Relação com os critérios de SOA

| Critério | Implementação |
|---|---|
| Estruturação do domínio | Entidades `SensorReading`, `SafePoint` e `AnonymousReport`, serviços e contratos organizados por responsabilidade. |
| Conexão com banco de dados | Entity Framework Core com SQLite por meio de `AppDbContext`. |
| Migrações | Migração `InitialCreate` versionada e aplicada automaticamente na inicialização. |
| Documentação automática | Swagger/OpenAPI gerado pela aplicação e contrato adicional em `openapi.yaml`. |
| Testes automatizados | Projeto xUnit com quatro testes aprovados e nenhuma falha. |
