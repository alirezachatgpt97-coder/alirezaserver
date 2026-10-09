#!/usr/bin/python3
# SPDX-License-Identifier: GPL-3.0-or-later
"""Own chains only. Never flush a system/UFW/Nova chain or change its policy."""
import fcntl, ipaddress, json, os, re, subprocess, sys
ROOT='/var/lib/alirezaserver'
def cmd(args,ok=True):
    p=subprocess.run(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True,timeout=20)
    if ok and p.returncode: raise RuntimeError(' '.join(args[:4])+': '+p.stderr[:500])
    return p
def ipt(table,*args,ok=True): return cmd(['iptables','-w','10','-t',table,*args],ok)
def hook(table,parent,chain):
    ipt(table,'-N',chain,ok=False)
    if ipt(table,'-C',parent,'-j',chain,ok=False).returncode: ipt(table,'-I',parent,'1','-j',chain)
    ipt(table,'-F',chain)
def main():
    os.makedirs('/run/alirezaserver',exist_ok=True)
    with open('/run/alirezaserver/firewall.lock','w') as lock:
        fcntl.flock(lock,fcntl.LOCK_EX)
        chains=[('filter','INPUT','ALIREZA_IN'),('filter','FORWARD','ALIREZA_FWD'),('nat','POSTROUTING','ALIREZA_NAT'),('nat','PREROUTING','ALIREZA_DNS')]
        if '--remove' in sys.argv:
            for table,parent,chain in chains:
                while not ipt(table,'-C',parent,'-j',chain,ok=False).returncode: ipt(table,'-D',parent,'-j',chain)
                ipt(table,'-F',chain,ok=False);ipt(table,'-X',chain,ok=False)
            return
        settings=json.load(open(ROOT+'/install.json'))
        servers=json.load(open(ROOT+'/firewall.json'))
        default=json.loads(cmd(['ip','-j','-4','route','get','1.1.1.1']).stdout)
        if not default or not re.fullmatch(r'[A-Za-z0-9_.:-]{1,15}',default[0].get('dev','')): raise RuntimeError('No usable IPv4 default interface')
        wan=default[0]['dev']
        for table,parent,chain in chains:hook(table,parent,chain)
        for proto in ['udp','tcp']:ipt('filter','-A','ALIREZA_IN','-p',proto,'--dport','53','-j','ACCEPT')
        # The AdGuard HTTP service stays loopback-only and is never opened here.
        for s in servers:
            if not s['enabled']:continue
            if not re.fullmatch(r'[a-f0-9]{12}',s['id']):raise RuntimeError('Invalid server ID')
            network=ipaddress.ip_network(s['subnet'],strict=True)
            if network.version!=4 or network.prefixlen!=24 or not network.is_private:raise RuntimeError('Invalid subnet')
            proto=s['proto'];port=int(s['port'])
            if proto not in ['udp','tcp'] or not 1024<=port<=65535:raise RuntimeError('Invalid OpenVPN port')
            dev='az'+s['id'][:8];net=str(network)
            ipt('filter','-A','ALIREZA_IN','-p',proto,'--dport',str(port),'-j','ACCEPT')
            for p in ['udp','tcp']:
                ipt('filter','-A','ALIREZA_IN','-i',dev,'-s',net,'-p',p,'--dport','53','-j','ACCEPT')
                gateway=str(network.network_address+1)
                if s['dns']==gateway:
                    ipt('nat','-A','ALIREZA_DNS','-i',dev,'-d',gateway,'-p',p,'--dport','53','-j','DNAT','--to-destination',settings['dns_address']+':53')
            ipt('filter','-A','ALIREZA_IN','-i',dev,'-j','DROP')
            ipt('filter','-A','ALIREZA_FWD','-i',dev,'-s',net,'-o',wan,'-j','ACCEPT')
            ipt('filter','-A','ALIREZA_FWD','-i',wan,'-o',dev,'-d',net,'-m','conntrack','--ctstate','ESTABLISHED,RELATED','-j','ACCEPT')
            ipt('filter','-A','ALIREZA_FWD','-i',dev,'-j','DROP')
            ipt('nat','-A','ALIREZA_NAT','-s',net,'-o',wan,'-j','MASQUERADE')
        if any(s['enabled'] for s in servers):cmd(['sysctl','-w','net.ipv4.ip_forward=1'])
if __name__=='__main__':
    try:main()
    except Exception as e:print(str(e),file=sys.stderr);sys.exit(1)
