# Pacotes para envio

- `cybersecurity-climacidadao.zip`: módulo solicitado em Cybersecurity.
- `gshumana-sem-videos.zip`: cópia completa das entregas locais, sem o PDF do enunciado, ambientes virtuais ou vídeos.
- `SHA256SUMS.txt`: hashes para conferir a integridade dos pacotes.
- O restante deve ser enviado pelo link do repositório GitHub, conforme `ENTREGA_TEAMS.md`.

O ZIP pode ser recriado no PowerShell com:

```powershell
Compress-Archive -Path .\cybersecurity\* -DestinationPath .\entregas\cybersecurity-climacidadao.zip -Force
```
