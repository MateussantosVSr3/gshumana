# Physical Computing — ESP32/Wokwi

O DHT22 mede temperatura/umidade. Em risco local, LED e buzzer alertam; a leitura é enviada à API a cada 10 segundos. Importe `diagram.json`, `sketch.ino` e `libraries.txt` no Wokwi.

## Execução local com Wokwi para VS Code

1. Instale PlatformIO e Wokwi Simulator no VS Code.
2. Abra esta pasta no VS Code; `platformio.ini` já aponta para `sketch.ino`.
3. Execute `pio run`; `wokwi.toml` usa o firmware gerado e encaminha a porta 5080 para a API local.
4. Inicie a simulação e altere temperatura/umidade clicando no DHT22.

Projeto público e testado no Wokwi: https://wokwi.com/projects/480451288503952385

Roteiro da demonstração integrada (Wokwi, API e Swagger): [`ROTEIRO_VIDEO.md`](ROTEIRO_VIDEO.md).

O circuito executa um autoteste de LED e buzzer ao iniciar. Depois, mantém os dois atuadores ligados quando a temperatura alcança 35 °C ou quando há pelo menos 32 °C com umidade igual ou superior a 60%.
