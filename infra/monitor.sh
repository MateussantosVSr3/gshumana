#!/usr/bin/env bash
set -Eeuo pipefail
LOG=/var/log/climacidadao/monitor.log
CPU_LIMIT=${CPU_LIMIT:-85}; MEM_LIMIT=${MEM_LIMIT:-85}; DISK_LIMIT=${DISK_LIMIT:-85}
while true; do
  cpu=$(top -bn1 | awk '/Cpu\(s\)/ {print int(100-$8)}')
  mem=$(free | awk '/Mem:/ {print int($3/$2*100)}')
  disk=$(df -P / | awk 'NR==2 {gsub("%",""); print $5}')
  status=$(curl -fsS --max-time 3 http://127.0.0.1:5080/health >/dev/null && echo ok || echo fail)
  line="$(date -Is) cpu=${cpu}% mem=${mem}% disk=${disk}% api=${status}"
  echo "$line" | tee -a "$LOG" | logger -t climacidadao-monitor
  if ((cpu>CPU_LIMIT || mem>MEM_LIMIT || disk>DISK_LIMIT)) || [[ $status == fail ]]; then logger -p user.warning -t climacidadao-alert "ALERTA $line"; fi
  sleep 30
done
