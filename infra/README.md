# Operating Systems

1. Na raiz: `dotnet publish backend/ClimaCidadao.Api -c Release -o infra/publish`.
2. Copie `infra/` para Ubuntu 24.04 e execute `sudo bash provision.sh` dentro da pasta.
3. Verifique `journalctl -u climacidadao -u climacidadao-monitor` e `/var/log/climacidadao/monitor.log`.
4. Execute `bash test-failure.sh` para provar reinício automático.

O provisionamento configura dependências, usuário restrito, hostname, serviço, monitor e auditoria. Grave uma VM descartável; revise o script antes de usar. **PREENCHER:** prints e link do vídeo de até 7 minutos.

Use [`ROTEIRO_VIDEO.md`](ROTEIRO_VIDEO.md) para a demonstração completa de provisionamento, monitoramento, segurança e recuperação após falha.
