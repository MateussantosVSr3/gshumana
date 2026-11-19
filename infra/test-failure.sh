#!/usr/bin/env bash
set -Eeuo pipefail

# Teste controlado de tolerância a falhas: captura o estado, encerra somente o
# processo da API e confirma que o systemd criou outro processo saudável.
before=$(systemctl show climacidadao -p NRestarts --value)
pid=$(systemctl show climacidadao -p MainPID --value)
[[ $pid =~ ^[1-9][0-9]*$ ]] || { echo "PID inválido"; exit 1; }
sudo kill -9 "$pid"
# RestartSec=5; oito segundos dão tempo para reinício e health check.
sleep 8
after=$(systemctl show climacidadao -p NRestarts --value)
curl -fsS http://127.0.0.1:5080/health
echo "Reinícios antes=$before depois=$after"
(( after > before )) || { echo "Serviço não reiniciou"; exit 1; }
