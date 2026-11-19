# Pacotes para envio

- `cybersecurity-climacidadao-final.zip`: versão final do módulo de Cybersecurity, sem arquivos de roteiro. **Use esta versão.**
- `cybersecurity-climacidadao.zip`: versão anterior do módulo, também sem roteiros.
- `SHA256SUMS.txt`: hashes para conferir a integridade dos pacotes.
- O restante deve ser enviado pelo link do repositório GitHub, conforme `ENTREGA_TEAMS.md`.

O ZIP pode ser recriado no PowerShell com:

```powershell
Compress-Archive -Path .\cybersecurity\* -DestinationPath .\entregas\cybersecurity-climacidadao-final.zip -Force
```
