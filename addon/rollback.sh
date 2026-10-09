#!/usr/bin/env bash
# Disable only alirezaserver additions. Keep user databases/certificates for recovery.
set -euo pipefail
[[ $EUID == 0 ]] || { echo 'Run as root.' >&2; exit 1; }
systemctl disable --now alireza-update.timer || true
systemctl stop alireza-update.service || true
systemctl list-unit-files 'alireza-openvpn@*.service' --no-legend | while read -r unit _; do
  if [[ "$unit" =~ ^alireza-openvpn@[a-f0-9]{12}\.service$ ]]; then systemctl disable --now "$unit" || true; fi
done
systemctl disable --now AdGuardHome.service alireza-firewall.service || true
/opt/alirezaserver/firewall.py --remove || echo 'Some add-on firewall rules could not be removed; inspect ALIREZA_* chains.' >&2
rm -f -- /etc/systemd/system/nova-agent.service.d/alirezaserver.conf
rm -f -- /etc/systemd/system/nova-agent.service.d/zz-alirezaserver.conf
rm -f -- /etc/systemd/system/nova-node-agent.service.d/alirezaserver.conf
systemctl daemon-reload
if systemctl cat nova-agent.service >/dev/null 2>&1; then systemctl restart nova-agent.service
elif systemctl cat nova-node-agent.service >/dev/null 2>&1; then systemctl restart nova-node-agent.service; fi
echo 'alirezaserver add-ons disabled; original Nova files and add-on data preserved.'
