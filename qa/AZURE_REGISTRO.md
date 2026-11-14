# Registro do Azure Boards

- Organização: `RM558436`
- Projeto: `gstemperatura`
- URL: https://dev.azure.com/RM558436/gstemperatura
- Visibilidade: privada
- Cadastro validado em: 14/11/2026

## Features

| ID | Feature | Test Cases relacionados |
|---:|---|---|
| 13 | Consultar risco térmico | 18–19 |
| 14 | Encontrar ponto seguro | 20 |
| 15 | Relatar problema anonimamente | 21–23 |
| 16 | Ingerir leitura do sensor | 24–26 |
| 17 | Manter serviço disponível | 27 |

## Test Cases

| ID | Caso |
|---:|---|
| 18 | TC01 — Exibir risco vigente |
| 19 | TC02 — API indisponível |
| 20 | TC03 — Listar pontos acessíveis |
| 21 | TC04 — Enviar relato válido |
| 22 | TC05 — Rejeitar descrição curta |
| 23 | TC06 — Rejeitar PII |
| 24 | TC07 — Criar leitura válida |
| 25 | TC08 — Rejeitar umidade inválida |
| 26 | TC09 — Filtrar por bairro |
| 27 | TC10 — Recuperar processo |

Todos os Test Cases possuem passos, entrada e resultado esperado no campo nativo `Microsoft.VSTS.TCM.Steps` e estão vinculados à Feature correspondente pela relação `Tested By`.

## Acesso do professor

O convite para `profandre.leite@fiap.com.br` foi tentado, mas o Azure bloqueou usuários externos ao diretório da organização. É necessário habilitar `External guest access` em **Organization settings → Policies** e garantir que o tenant Microsoft Entra permita convites externos antes de repetir o convite.

