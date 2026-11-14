# Pacotes para envio

- `cybersecurity-climacidadao-v2.zip`: versão atual do módulo solicitado em Cybersecurity. Use esta versão.
- `gshumana-sem-videos-v3.zip`: pacote completo atualizado com as validações finais e integrações. Use esta versão.
- `cybersecurity-climacidadao.zip`: versão anterior do módulo de Cybersecurity.
- `gshumana-sem-videos-v2.zip`: versão anterior do pacote completo.
- `gshumana-sem-videos.zip`: versão anterior, mantida apenas porque o ambiente não permitiu sobrescrevê-la.
- `SHA256SUMS.txt`: hashes para conferir a integridade dos pacotes.
- O restante deve ser enviado pelo link do repositório GitHub, conforme `ENTREGA_TEAMS.md`.

O ZIP pode ser recriado no PowerShell com:

```powershell
Compress-Archive -Path .\cybersecurity\* -DestinationPath .\entregas\cybersecurity-climacidadao.zip -Force
```
