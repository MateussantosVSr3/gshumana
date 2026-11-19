# Operating Systems — infraestrutura Linux do ClimaCidadão

Este módulo prepara uma máquina Ubuntu 24.04 para executar a API .NET do ClimaCidadão. O provisionamento automatiza dependências, identidade de rede, usuário restrito, publicação da aplicação, serviços `systemd`, monitoramento, alertas, logs e recuperação após falha.

## Arquitetura

```text
App/ESP32 ── HTTP :5080 ──> climacidadao.service ──> API .NET + SQLite
                                  │
                                  └── climacidadao-monitor.service
                                        ├── CPU, memória e disco
                                        ├── health check da API
                                        └── arquivo de log + journal
```

## Arquivos e responsabilidades

| Arquivo | Função |
|---|---|
| `provision.sh` | Instala dependências, cria usuário e diretórios, configura hostname/resolução local, copia a aplicação e habilita os serviços. |
| `climacidadao.service` | Executa a API como usuário restrito, aplica proteções e reinicia após falha. |
| `climacidadao-monitor.service` | Mantém o monitor em execução e reinicia o próprio monitor se necessário. |
| `monitor.sh` | Registra CPU, memória, disco e disponibilidade da API a cada 30 segundos; gera alertas. |
| `test-failure.sh` | Encerra controladamente o processo da API e comprova a recuperação automática. |
| `collect-evidence.sh` | Reúne sistema, rede/DNS/IP, estado dos serviços, logs, proteções e teste de falha. |
| `publish/` | Publicação pronta da API .NET 8 usada pelo serviço. |

## Como executar

Na raiz do repositório, gere a publicação:

```powershell
dotnet publish backend/ClimaCidadao.Api -c Release -o infra/publish
```

Copie a pasta `infra/` completa para uma VM Ubuntu 24.04. Dentro dela, execute:

```bash
sudo bash provision.sh
```

O script é idempotente e registra sua execução em `/var/log/climacidadao-provision.log`. O IP continua sendo fornecido pela rede da VM ou pelo WSL; o script configura o hostname `climacidadao`, a resolução local em `/etc/hosts` e evidencia IP, rota padrão e DNS. A API escuta em `0.0.0.0:5080`.

## Verificações

```bash
hostname
hostname -I
ip route show default
getent hosts climacidadao
systemctl --no-pager status climacidadao
systemctl --no-pager status climacidadao-monitor
curl -s http://127.0.0.1:5080/health
sudo tail -n 5 /var/log/climacidadao/monitor.log
journalctl -t climacidadao-alert -n 10 --no-pager
```

Para reunir todas as evidências e testar a recuperação:

```bash
sudo bash collect-evidence.sh
```

O teste de falha também pode ser executado separadamente:

```bash
sudo bash test-failure.sh
```

## Relação com os critérios de avaliação

| Critério | Evidência no projeto |
|---|---|
| Infraestrutura — rede, DNS e IP | Hostname, `/etc/hosts`, IP dinâmico, rota e DNS evidenciados por `provision.sh` e `collect-evidence.sh`. |
| Provisionamento da aplicação | Dependências, runtime .NET, usuário, diretórios, publicação, permissões e orquestração automatizados. |
| Monitoramento e alertas | CPU, memória, disco e health check registrados; limites geram alerta no journal. |
| Serviço tolerante a falhas | API com `Restart=on-failure`; monitor com `Restart=always`. |
| Logs de auditoria | Log de provisionamento, `monitor.log` e journal do `systemd`. |
| Funcionamento completo | API saudável em `/health` e reinício comprovado pelo aumento de `NRestarts`. |

## Segurança e limites

- A API e o monitor executam como usuário de sistema `climacidadao`, sem shell interativo.
- `NoNewPrivileges=true` impede aquisição de novos privilégios.
- `ProtectSystem=strict` torna o sistema de arquivos somente leitura, com escrita liberada apenas nos diretórios necessários.
- O teste de falha encerra exclusivamente o PID informado pelo `systemd` para a API.
- O projeto acadêmico usa HTTP na rede local. Uma implantação pública exigiria proxy reverso, TLS, firewall e gestão segura de segredos.

## Evidências e vídeo

A execução foi validada no Ubuntu 24.04.5 sobre WSL2, com API e monitor ativos, `api=ok`, proteções do `systemd` e recuperação automática. As evidências existentes estão em `docs/evidencias/linux-execucao.txt` e `docs/evidencias/linux-execucao.png`.

Vídeo publicado como não listado: [infraestrutura Linux do Clima Cidadão](https://youtu.be/1jhRH4Tc_6c).
