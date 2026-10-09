#!/usr/bin/env bash
set -euo pipefail
systemctl is-active --quiet nova-agent.service
systemctl is-active --quiet AdGuardHome.service
systemctl is-active --quiet alireza-firewall.service
curl -fsS --max-time 8 http://127.0.0.1:18085/control/status | python3 -c 'import json,sys;s=json.load(sys.stdin);print("AdGuard configured DNS port:",s.get("dns_port"),"running:",s.get("running"))'
node /opt/alirezaserver/verify-install.mjs
printf 'Local service checks passed. External reachability and VPN client traffic require a client test.\n'
