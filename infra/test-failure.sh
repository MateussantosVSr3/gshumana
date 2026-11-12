#!/usr/bin/env bash
set -Eeuo pipefail
before=$(systemctl show climacidadao -p NRestarts --value)
pid=$(systemctl show climacidadao -p MainPID --value)
[[ $pid =~ ^[1-9][0-9]*$ ]] || { echo "PID inválido"; exit 1; }
sudo kill -9 "$pid"
sleep 8
after=$(systemctl show climacidadao -p NRestarts --value)
curl -fsS http://127.0.0.1:5080/health
echo "Reinícios antes=$before depois=$after"
(( after > before )) || { echo "Serviço não reiniciou"; exit 1; }
