#!/usr/bin/env bash
set -Eeuo pipefail
APP_DIR=/opt/climacidadao
LOG_DIR=/var/log/climacidadao
SERVICE_USER=climacidadao
[[ $EUID -eq 0 ]] || { echo "Execute como root" >&2; exit 1; }
exec > >(tee -a /var/log/climacidadao-provision.log) 2>&1
apt-get update
apt-get install -y curl ca-certificates sqlite3 rsyslog
id "$SERVICE_USER" &>/dev/null || useradd --system --home "$APP_DIR" --shell /usr/sbin/nologin "$SERVICE_USER"
install -d -o "$SERVICE_USER" -g "$SERVICE_USER" -m 0750 "$APP_DIR" "$LOG_DIR"
if ! command -v dotnet >/dev/null; then
  curl -fsSL https://packages.microsoft.com/config/ubuntu/24.04/packages-microsoft-prod.deb -o /tmp/packages-microsoft-prod.deb
  dpkg -i /tmp/packages-microsoft-prod.deb; apt-get update; apt-get install -y aspnetcore-runtime-8.0
fi
cp -a ./publish/. "$APP_DIR/"
chown -R "$SERVICE_USER:$SERVICE_USER" "$APP_DIR"
install -m 0644 ./climacidadao.service /etc/systemd/system/climacidadao.service
install -m 0644 ./climacidadao-monitor.service /etc/systemd/system/climacidadao-monitor.service
systemctl daemon-reload
systemctl enable --now climacidadao climacidadao-monitor
hostnamectl set-hostname climacidadao
echo "127.0.1.1 climacidadao" >> /etc/hosts
systemctl --no-pager status climacidadao
