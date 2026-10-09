#!/usr/bin/python3
# SPDX-License-Identifier: GPL-3.0-or-later
"""Migrate only the known 0.2 defaults through AdGuard's own API.
Preserve filters, rewrites, custom access lists and custom upstream servers.
"""
import json, os, pathlib, urllib.request
LEGACY_CLIENTS=['127.0.0.0/8','10.0.0.0/8','172.16.0.0/12','192.168.0.0/16','::1','fc00::/7']
LEGACY_UPSTREAMS=['https://dns.cloudflare.com/dns-query','https://dns.quad9.net/dns-query']
ROOT=pathlib.Path(os.environ.get('ALIREZA_ROOT','/var/lib/alirezaserver'))
BASE=os.environ.get('ALIREZA_ADGUARD_API','http://127.0.0.1:18085/control/')
def api(route,data=None):
    payload=None if data is None else json.dumps(data).encode()
    req=urllib.request.Request(BASE+route,data=payload,headers={'Content-Type':'application/json'})
    with urllib.request.urlopen(req,timeout=15) as response:
        raw=response.read();return json.loads(raw) if raw.strip() else None
def planned_changes(access,dns):
    new_access=None;new_dns={}
    if set(access.get('allowed_clients') or [])==set(LEGACY_CLIENTS):
        new_access={key:access.get(key) or [] for key in ['allowed_clients','disallowed_clients','blocked_hosts']}
        new_access['allowed_clients']=[]
    if dns.get('upstream_dns')==LEGACY_UPSTREAMS and not dns.get('upstream_dns_file'):
        new_dns['upstream_dns']=['1.1.1.1','9.9.9.9']
    return new_access,new_dns
def main():
    status=api('status')
    if status.get('dns_port')!=53 and not os.environ.get('ALIREZA_DNS_TEST'):
        raise RuntimeError('AdGuard must listen on DNS port 53; its stored configuration uses another port.')
    access=api('access/list');dns=api('dns_info')
    new_access,new_dns=planned_changes(access,dns)
    ROOT.mkdir(parents=True,exist_ok=True)
    before=ROOT/'dns-settings-before-0.3.json'
    if (new_access is not None or new_dns) and not before.exists():
        with open(before,'x',encoding='utf-8') as f:json.dump({'access':access,'dns':dns},f,indent=2)
        os.chmod(before,0o600)
    changed_access=False
    try:
        if new_access is not None:api('access/set',new_access);changed_access=True
        if new_dns:api('dns_config',new_dns)
    except Exception:
        if changed_access:
            try:api('access/set',{k:access.get(k) or [] for k in ['allowed_clients','disallowed_clients','blocked_hosts']})
            except Exception:pass
        raise
    if new_access is not None:print('DNS access: migrated old private-only default to public clients; rate limiting and block lists retained.')
    if new_dns:print('DNS upstreams: replaced the old default DoH-only pair with standard resolvers; custom settings retained.')
    print('AdGuard DNS configuration checked; custom filters, rewrites and accounts preserved.')
if __name__=='__main__':main()
