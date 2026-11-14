# Roteiro do vídeo — Operating Systems (até 7 minutos)

## Preparação

Use uma VM descartável com Ubuntu 24.04. Antes da gravação, gere a publicação no Windows:

```powershell
cd D:\GS
dotnet publish backend/ClimaCidadao.Api -c Release -o infra/publish
```

Copie a pasta `infra` completa para a VM. O vídeo deve usar evidências reais da execução na VM.

## 0:00–0:40 — Contexto

> Este módulo implanta a API do Clima Cidadão como serviço Linux. O objetivo é automatizar o provisionamento, executar a aplicação com usuário restrito, monitorar recursos e demonstrar recuperação após uma falha.

Mostre os arquivos `provision.sh`, as unidades systemd e `monitor.sh`.

## 0:40–2:00 — Provisionamento

Na pasta copiada para a VM, execute:

```bash
sudo bash provision.sh
```

> O script instala as dependências, cria o usuário de serviço `climacidadao`, copia a publicação para `/opt/climacidadao`, instala as unidades systemd, configura o hostname e inicia a API e o monitor automaticamente.

Mostre o final do provisionamento sem expor senhas ou informações pessoais.

## 2:00–3:00 — Serviço e API

Execute:

```bash
systemctl --no-pager status climacidadao
systemctl show climacidadao -p User -p MainPID -p NRestarts
curl -s http://127.0.0.1:5080/health
```

> A API está sob controle do systemd, executada por um usuário sem login e exposta na porta 5080. A política `Restart=on-failure` permite recuperação automática.

## 3:00–4:10 — Monitoramento e logs

Execute:

```bash
systemctl --no-pager status climacidadao-monitor
sudo tail -n 5 /var/log/climacidadao/monitor.log
journalctl -u climacidadao-monitor -n 10 --no-pager
```

> A cada 30 segundos, o monitor registra CPU, memória, disco e disponibilidade da API. Se algum limite for ultrapassado ou a API falhar, ele envia um alerta ao journal do sistema.

Mostre uma linha com `api=ok` e os percentuais.

## 4:10–5:30 — Segurança e organização

Mostre os trechos relevantes de `climacidadao.service`:

- `User=climacidadao`;
- `NoNewPrivileges=true`;
- `ProtectSystem=strict`;
- `ReadWritePaths`;
- `Restart=on-failure`.

> A aplicação não é executada como root. O systemd restringe privilégios e permite escrita somente nos diretórios necessários. Os logs ficam separados em `/var/log/climacidadao`.

## 5:30–6:35 — Recuperação após falha

Execute:

```bash
sudo bash test-failure.sh
```

> O teste identifica o PID atual, encerra o processo de forma forçada e aguarda o systemd reiniciá-lo. Ao final, compara o contador de reinícios e consulta novamente o endpoint de saúde.

Mostre `Reinícios antes=... depois=...` e a resposta saudável da API.

## 6:35–7:00 — Encerramento

> Assim, o Clima Cidadão possui implantação reproduzível, execução com privilégios mínimos, monitoramento contínuo, logs centralizados e recuperação automática. Esses mecanismos aumentam a disponibilidade da API usada pelo aplicativo e pelo ESP32.

## Evidências obrigatórias no vídeo

- provisionamento concluído;
- API ativa no systemd;
- endpoint `/health` respondendo;
- monitor ativo e arquivo de log;
- usuário restrito e proteções da unidade;
- incremento de `NRestarts` após o teste de falha.

