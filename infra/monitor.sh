#!/usr/bin/env bash
set -Eeuo pipefail

# Monitor contínuo de infraestrutura e disponibilidade da API.
# Os limites podem ser sobrescritos por variáveis de ambiente no systemd.
LOG=/var/log/climacidadao/monitor.log
CPU_LIMIT=${CPU_LIMIT:-85}; MEM_LIMIT=${MEM_LIMIT:-85}; DISK_LIMIT=${DISK_LIMIT:-85}

# Calcula uso da CPU pela diferença de contadores do kernel em um segundo.
# Isso evita depender da posição das colunas do `top`, que varia entre ambientes.
cpu_usage() {
  local _ user nice system idle iowait irq softirq steal guest guest_nice
  local total_before idle_before total_after idle_after delta_total delta_idle
  read -r _ user nice system idle iowait irq softirq steal guest guest_nice < /proc/stat
  idle_before=$((idle + iowait))
  total_before=$((user + nice + system + idle + iowait + irq + softirq + steal))
  sleep 1
  read -r _ user nice system idle iowait irq softirq steal guest guest_nice < /proc/stat
  idle_after=$((idle + iowait))
  total_after=$((user + nice + system + idle + iowait + irq + softirq + steal))
  delta_total=$((total_after - total_before))
  delta_idle=$((idle_after - idle_before))
  ((delta_total > 0)) && echo $(((100 * (delta_total - delta_idle)) / delta_total)) || echo 0
}

while true; do
  # Coleta CPU, memória e ocupação do filesystem raiz em porcentagem.
  cpu=$(cpu_usage)
  mem=$(free | awk '/Mem:/ {print int($3/$2*100)}')
  disk=$(df -P / | awk 'NR==2 {gsub("%",""); print $5}')
  status=$(curl -fsS --max-time 3 http://127.0.0.1:5080/health >/dev/null && echo ok || echo fail)
  line="$(date -Is) cpu=${cpu}% mem=${mem}% disk=${disk}% api=${status}"
  # Persiste em arquivo e no journal para auditoria centralizada.
  echo "$line" | tee -a "$LOG" | logger -t climacidadao-monitor
  # Gera alerta quando um recurso excede o limite ou a API não responde.
  if ((cpu>CPU_LIMIT || mem>MEM_LIMIT || disk>DISK_LIMIT)) || [[ $status == fail ]]; then logger -p user.warning -t climacidadao-alert "ALERTA $line"; fi
  sleep 30
done
