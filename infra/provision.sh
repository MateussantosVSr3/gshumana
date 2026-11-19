#!/usr/bin/env bash
set -Eeuo pipefail

# Provisionamento idempotente da infraestrutura e da aplicação ClimaCidadão.
# O script deve ser executado dentro da pasta infra em Ubuntu 24.04.
APP_DIR=/opt/climacidadao
LOG_DIR=/var/log/climacidadao
SERVICE_USER=climacidadao
[[ $EUID -eq 0 ]] || { echo "Execute como root" >&2; exit 1; }

# Registra toda a execução para auditoria e também mantém a saída no terminal.
exec > >(tee -a /var/log/climacidadao-provision.log) 2>&1
apt-get update
apt-get install -y curl ca-certificates sqlite3 rsyslog iproute2

# Usuário de sistema sem shell interativo: a API não precisa executar como root.
id "$SERVICE_USER" &>/dev/null || useradd --system --home "$APP_DIR" --shell /usr/sbin/nologin "$SERVICE_USER"
install -d -o "$SERVICE_USER" -g "$SERVICE_USER" -m 0750 "$APP_DIR" "$LOG_DIR"

# Instala somente o runtime necessário quando o .NET ainda não está disponível.
if ! command -v dotnet >/dev/null; then
  curl -fsSL https://packages.microsoft.com/config/ubuntu/24.04/packages-microsoft-prod.deb -o /tmp/packages-microsoft-prod.deb
  dpkg -i /tmp/packages-microsoft-prod.deb; apt-get update; apt-get install -y aspnetcore-runtime-8.0
fi

# Publicação, permissões, monitor e unidades do systemd.
cp -a ./publish/. "$APP_DIR/"
chown -R "$SERVICE_USER:$SERVICE_USER" "$APP_DIR"
install -m 0755 ./monitor.sh /usr/local/bin/climacidadao-monitor
install -m 0644 ./climacidadao.service /etc/systemd/system/climacidadao.service
install -m 0644 ./climacidadao-monitor.service /etc/systemd/system/climacidadao-monitor.service
systemctl daemon-reload
systemctl enable --now climacidadao climacidadao-monitor

# Identidade e resolução local da VM. O IP permanece dinâmico para não quebrar
# DHCP, WSL ou a rede da VM; a aplicação escuta em 0.0.0.0:5080.
hostnamectl set-hostname climacidadao
grep -qE '^127\.0\.1\.1[[:space:]]+climacidadao$' /etc/hosts || echo "127.0.1.1 climacidadao" >> /etc/hosts

# Evidências de hostname, IP, rota padrão e DNS disponíveis no ambiente.
echo "=== REDE, DNS E IP ==="
echo "hostname=$(hostname)"
echo "ip=$(hostname -I | awk '{print $1}')"
ip route show default | head -n 1
awk '/^nameserver/ {print "dns=" $2}' /etc/resolv.conf
getent hosts climacidadao

systemctl --no-pager status climacidadao
