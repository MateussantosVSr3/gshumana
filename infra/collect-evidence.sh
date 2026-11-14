#!/usr/bin/env bash
set -Eeuo pipefail

source /etc/os-release
echo "=== SISTEMA ==="
echo "$PRETTY_NAME"
uname -r
echo

echo "=== SERVIÇO DA API ==="
systemctl is-active climacidadao
systemctl show climacidadao -p User -p MainPID -p NRestarts -p ActiveState
curl -fsS http://127.0.0.1:5080/health
echo
echo

echo "=== MONITORAMENTO ==="
systemctl is-active climacidadao-monitor
latest=""
for _ in {1..12}; do
  latest=$(tail -n 1 /var/log/climacidadao/monitor.log)
  [[ $latest == *"api=ok"* ]] && break
  sleep 5
done
echo "$latest"
[[ $latest == *"api=ok"* ]] || { echo "Monitor não confirmou api=ok" >&2; exit 1; }
echo

echo "=== PROTEÇÕES SYSTEMD ==="
systemctl show climacidadao -p NoNewPrivileges -p ProtectSystem -p ReadWritePaths
echo

echo "=== RECUPERAÇÃO APÓS FALHA ==="
bash "$(dirname "$0")/test-failure.sh"
