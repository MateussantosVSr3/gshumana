# Physical Computing — ESP32/Wokwi

O DHT22 mede temperatura/umidade. Em risco local, LED e buzzer alertam; a leitura é enviada à API a cada 10 segundos. Importe `diagram.json`, `sketch.ino` e `libraries.txt` no Wokwi.

## Execução local com Wokwi para VS Code

1. Instale PlatformIO e Wokwi Simulator no VS Code.
2. Abra esta pasta no VS Code; `platformio.ini` já aponta para `sketch.ino`.
3. Execute `pio run`; `wokwi.toml` usa o firmware gerado e encaminha a porta 5080 para a API local.
4. Inicie a simulação e altere temperatura/umidade clicando no DHT22.

**PREENCHER:** link público do Wokwi e vídeo de até 4 minutos. No vídeo: ideia (30 s), circuito (45 s), alterar o DHT22 (60 s), alerta físico e chegada na API/app (60 s), impacto (30 s).
