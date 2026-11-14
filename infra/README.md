# Operating Systems

1. Na raiz: `dotnet publish backend/ClimaCidadao.Api -c Release -o infra/publish`.
2. Copie `infra/` para Ubuntu 24.04 e execute `sudo bash provision.sh` dentro da pasta.
3. Verifique `journalctl -u climacidadao -u climacidadao-monitor` e `/var/log/climacidadao/monitor.log`.
4. Execute `bash test-failure.sh` para provar reinício automático.

O provisionamento configura dependências, usuário restrito, hostname, serviço, monitor e auditoria. A execução foi validada no Ubuntu 24.04.5 sobre WSL2, com API e monitor ativos, `api=ok`, proteções do systemd e recuperação automática após falha. As evidências estão em `docs/evidencias/linux-execucao.txt` e `docs/evidencias/linux-execucao.png`. Falta inserir o link do vídeo de até 7 minutos.

Use [`ROTEIRO_VIDEO.md`](ROTEIRO_VIDEO.md) para a demonstração completa de provisionamento, monitoramento, segurança e recuperação após falha.

Para repetir a validação completa:

```bash
sudo bash collect-evidence.sh
```
